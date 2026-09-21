/*
 * Nimiöiden kuoren liukuva kerroin (js/pallolauta/nimet.js KOKO LIUKUU
 * JOKA KEHYKSESSÄ, erä E2): ladonnan mitta, kehyksen kerroin ja katon
 * muuttujat. Pohja × kuori on jatkuva ladonnan yli, ja katto pätee
 * kehys kerrallaan min(raaka · kerroin, katto).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  LIIKKUU_LUOKKA, NIMIOKERROIN_MUUTTUJA, asetaKuorenKatto, ladonnanMitta,
  liukuvaNimiokerroin, nimenKarttakerroin,
} from '../js/pallolauta/nimet.js';
import { PALLOLAUDAN_LEVEYS, leveysKorkeudesta } from '../js/pallolauta/kamera.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const W = 390;
const kuvasuhde = 390 / 844;
const skaalaKorkeudesta = (k) => W / leveysKorkeudesta(k, { laudanLeveys: PALLOLAUDAN_LEVEYS, kuvasuhde });

test('ladonnan mitta: korjaus on porrastamaton / porrastettu kerroin (≤ 0,25 %)', () => {
  const perus = skaalaKorkeudesta(0.2049);
  const l = ladonnanMitta(skaalaKorkeudesta(0.1234), perus, 0.1234);
  assert.ok(l);
  assert.equal(l.korkeus, 0.1234);
  assert.equal(l.kerroin, nimenKarttakerroin(skaalaKorkeudesta(0.1234), perus));
  assert.ok(Math.abs(l.korjaus - 1) <= 0.0026, `korjaus ${l.korjaus}`);
  assert.equal(ladonnanMitta(0, perus, 0.1), null, 'ilman skaalaa ei mittaa');
  assert.equal(ladonnanMitta(2, perus, 0), null, 'ilman korkeutta ei mittaa');
});

test('kuoren kerroin: pohja × kuori on porrastamaton koko ja jatkuva ladonnan yli', () => {
  const perus = skaalaKorkeudesta(0.2049);
  const raaka = (k) => skaalaKorkeudesta(k) / perus;
  // Ladonta korkeudella 0,15; kamera liikkuu 0,12:een.
  const l0 = ladonnanMitta(skaalaKorkeudesta(0.15), perus, 0.15);
  const naytetty0 = l0.kerroin * liukuvaNimiokerroin(l0, 0.12, kuvasuhde);
  assert.ok(Math.abs(naytetty0 / raaka(0.12) - 1) < 1e-9, 'kuori näyttää porrastamattoman koon');
  // Uusi ladonta 0,12:ssa: pohja vaihtuu, kuori palautuu — sama tulo.
  const l1 = ladonnanMitta(skaalaKorkeudesta(0.12), perus, 0.12);
  const naytetty1 = l1.kerroin * liukuvaNimiokerroin(l1, 0.12, kuvasuhde);
  assert.ok(Math.abs(naytetty1 - naytetty0) < 1e-9, `hyppy ladonnassa: ${naytetty0} → ${naytetty1}`);
  // Ilman ladontaa tai korkeutta kuori on 1.
  assert.equal(liukuvaNimiokerroin(null, 0.12, kuvasuhde), 1);
  assert.equal(liukuvaNimiokerroin(l1, NaN, kuvasuhde), 1);
});

const kuori = () => {
  const arvot = new Map();
  return {
    style: {
      setProperty: (k, v) => arvot.set(k, v),
      removeProperty: (k) => arvot.delete(k),
    },
    arvot,
  };
};

test('katon muuttujat: a = raaka / katettu, b = katto / katettu; ilman kattoa pois', () => {
  const katto = 16 / 11;
  const el = kuori();
  // Katon alla: a = 1, b > 1 → kuori = min(kerroin, b).
  asetaKuorenKatto(el, { mitta: 0.8, mittaRaaka: 0.8, katto });
  assert.equal(el.arvot.get('--nimio-a'), '1.0000');
  assert.equal(Number(el.arvot.get('--nimio-b')).toFixed(3), (katto / 0.8).toFixed(3));
  // Katossa: a > 1, b = 1 → kuori = min(kerroin · a, 1): ei kasva, kutistuu vasta kun raaka · kerroin < katto.
  asetaKuorenKatto(el, { mitta: katto, mittaRaaka: 2.2, katto });
  assert.equal(Number(el.arvot.get('--nimio-a')).toFixed(4), (2.2 / katto).toFixed(4));
  assert.equal(el.arvot.get('--nimio-b'), '1.0000');
  // Katto pois → muuttujat pois.
  asetaKuorenKatto(el, { mitta: 2.2, mittaRaaka: 2.2, katto: Infinity });
  assert.equal(el.arvot.has('--nimio-a'), false);
  assert.equal(el.arvot.has('--nimio-b'), false);
  // Ilman elementtiä ei kaadu.
  asetaKuorenKatto(null, { mitta: 1, katto });
});

test('css: kuori skaalautuu kotelon muuttujasta ja siirtymät ovat pois liikkeessä', () => {
  const css = lue('../css/styles.css');
  assert.match(css, /\.pallolauta-nimi > svg,\n\.pallolauta-nosto > svg,\n\.pallolauta-turisti-info > svg \{\n {2}transform-origin: 0 0;\n {2}transform: scale\(min\(calc\(var\(--nimiokerroin, 1\) \* var\(--nimio-a, 1\)\), var\(--nimio-b, 1e9\)\)\);/);
  assert.equal(NIMIOKERROIN_MUUTTUJA, '--nimiokerroin');
  assert.equal(LIIKKUU_LUOKKA, 'pallolauta-liikkuu');
  assert.match(css, /\.pallolauta-liikkuu \.pallolauta-nimi-siirto,\n\.pallolauta-liikkuu \.pallolauta-aihemerkki-siirto,\n\.pallolauta-liikkuu \.pallolauta-turisti-info-siirto \{ transition: none; \}/);
  assert.match(css, /\.pallolauta-liikkuu \.pallolauta-nosto \.pallolauta-nosto-siirto \{\n {2}transition: opacity 600ms ease-out, filter 600ms ease-out;\n\}/);
  assert.match(css, /\.pallolauta-nostot-ruutuvakio \.pallolauta-nosto > svg,\n\.pallolauta-nostot-ruutuvakio \.pallolauta-turisti-info > svg \{ transform: none; \}/);
});

test('E3: kylkivaihto häivyttää (css), kirjaston tween pois liikkeessä, pelimerkit kerran per ladonta', () => {
  const css = lue('../css/styles.css');
  assert.match(css, /\.nostosym-nimiokuva\.nostosym-nimio-vanha,\n\.nostosym-nimiokuva\.nostosym-nimio-tulee \{ opacity: 0; \}/);
  const nostot = lue('../js/pallolauta/nostot.js');
  assert.match(nostot, /export const KYLKIVAIHDON_HAIVYTYS_MS = 180;/);
  assert.match(css, /\.nostosym-nimiokuva \{ transition: opacity 180ms ease-out; \}/);
  assert.match(nostot, /vanhaNimio\.classList\.add\('nostosym-nimio-vanha'\);/);
  assert.match(nostot, /uusi\.classList\.add\('nostosym-nimio-tulee'\);/);
  const lauta = lue('../js/pallolauta/lauta.js');
  assert.match(lauta, /merkit\.kirjastonSiirtyma\(false\);/);
  assert.match(lauta, /merkit\.kirjastonSiirtyma\(true\);/);
  assert.match(lauta, /const pelinLaatikot = merkit\.laatikot\('peli'\);/);
  assert.equal((lauta.match(/merkit\.laatikot\('peli'\)/g) ?? []).length, 3, 'ladonnassa yksi luenta (+ liuskan esteet + kommentti)');
  const merkit = lue('../js/pallolauta/merkit.js');
  assert.match(merkit, /kirjastonSiirtyma: \(paalla\) => \{\n\s*pallo\.htmlTransitionDuration\?\.\(paalla \? siirtyma : 0\);/);
});
