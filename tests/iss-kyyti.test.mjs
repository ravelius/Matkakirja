/*
 * ISS:N KYYTI — YDIN (js/linssit/iss-kyyti.js). Samat luvut kuin natiivin
 * Linssit-testit/Testit/IssKyytiTestit.cs: ikkunan katsekohde 2,69°
 * edellä, etäisyys 521 km ja kallistus 37,7° 420 km:ssä, silmä ISS:ssä;
 * seuranta ISS:n takana ja yllä; tilakone napautuksin ja ✕:llä;
 * vähennetty liike; LIVE / rata-arvio -tietorivi; ilmakehän kaaren kaava.
 * Selaimen oma mittaus on tools/savukkeet/savuke-iss-kyyti.mjs.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  ikkunanKulma, seurannanKulma, kuvakulma, sekoita, kaari, suunta, kameranAsento, pisteelta,
  luoKyyti, tietorivi, kaarenKirkkaus, kaarenSavy, kaarenAurinko, TILA,
  SEURANNAN_ETAISYYS_M, IKKUNAN_KENTTA, KYYTIIN_S, IKKUNAAN_S, KAUKOON_S,
  KAAREN_VAALEA, KAAREN_SYVA, KAAREN_YO,
} from '../js/linssit/iss-kyyti.js';

const ISS = { lat: 50, lon: 10, korkeusM: 420000, suuntima: 60 };

test('ikkuna: kohde 2,69° edellä, 521 km, kallistus 37,7°, silmä ISS:ssä', () => {
  const k = ikkunanKulma(ISS);
  assert.ok(Math.abs(k.etaisyysM - 521000) < 3000, `etäisyys ${k.etaisyysM}`);
  assert.ok(Math.abs(k.kallistus - 37.7) < 0.2, `kallistus ${k.kallistus}`);
  assert.ok(Math.abs(kaari(ISS.lat, ISS.lon, k.lat, k.lon) - 2.69) < 0.05, 'kohde 2,69° edellä');
  const s = pisteelta(kameranAsento(k).silma);
  assert.ok(Math.abs(s.korkeusM - 420000) < 500, `silmän korkeus ${s.korkeusM}`);
  assert.ok(kaari(s.lat, s.lon, ISS.lat, ISS.lon) < 0.01, 'silmä ISS:n kohdalla');
  assert.ok(Math.abs(suunta(ISS.lat, ISS.lon, k.lat, k.lon) - ISS.suuntima) < 0.01, 'radan suuntaan');
});

test('seuranta: silmä ISS:n takana ja yllä', () => {
  const k = seurannanKulma(ISS);
  const s = pisteelta(kameranAsento(k).silma);
  assert.ok(s.korkeusM > 420000 + 600000, `silmä ${s.korkeusM / 1000} km`);
  const taakse = suunta(ISS.lat, ISS.lon, s.lat, s.lon);
  assert.ok(Math.abs(((((taakse - (ISS.suuntima + 180)) % 360) + 540) % 360) - 180) < 1, `takana ${taakse}`);
});

test('katse osuu maahan matalallakin kulmalla', () => {
  const k = ikkunanKulma(ISS, 5);
  assert.ok(Number.isFinite(k.etaisyysM) && k.etaisyysM > 0 && k.kallistus < 90);
});

test('kameran ylös on kohtisuorassa katsetta vastaan, kallistus 0 = pohjoinen ylhäällä', () => {
  const a = kameranAsento(ikkunanKulma(ISS));
  const katse = a.kohde.map((v, i) => v - a.silma[i]);
  const pis = katse.reduce((n, v, i) => n + v * a.ylos[i], 0);
  assert.ok(Math.abs(pis) < 1e-6 * Math.hypot(...katse));
  const kauko = kameranAsento(kuvakulma(0, 0, 1e7, 0, 0));
  assert.deepEqual(kauko.ylos.map((v) => Math.round(v * 1e9) / 1e9), [0, 1, 0]);
});

test('sekoitus lyhintä tietä ja etäisyys logaritmisesti', () => {
  const a = kuvakulma(0, 170, 10000000, 0, 350);
  const b = kuvakulma(0, -170, 1000000, 50, 10, 400000);
  const m = sekoita(a, b, 0.5);
  assert.ok(Math.abs(Math.abs(m.lon) - 180) < 0.01);
  assert.ok(m.suuntima < 0.01 || m.suuntima > 359.99);
  assert.ok(Math.abs(m.etaisyysM - Math.sqrt(1e7 * 1e6)) < 1);
  assert.equal(m.kallistus, 25);
  assert.equal(m.katseKorkeusM, 200000);
});

test('tilakone: kauko → seuranta → ikkuna → seuranta → ✕ → kauko', () => {
  const k = luoKyyti();
  const kauko = kuvakulma(50, 10, 18000000, 0, 0);
  assert.equal(k.paivita(0, ISS, 50), null, 'kaukonäkymässä kamera on pelaajan');
  k.napauta(kauko, ISS, 50, 0, false);
  assert.equal(k.tila, TILA.seuranta);
  let p = k.paivita(0, ISS, 50);
  assert.equal(p.asento.etaisyysM, kauko.etaisyysM, 'siirtymä alkaa kamerasta');
  p = k.paivita(KYYTIIN_S + 0.01, ISS, 50);
  assert.equal(p.asento.etaisyysM, SEURANNAN_ETAISYYS_M);
  assert.equal(p.kentta, 50);
  assert.equal(k.siirtyy, false);

  k.napauta(p.asento, ISS, p.kentta, 3, false);
  assert.equal(k.tila, TILA.ikkuna);
  p = k.paivita(3 + IKKUNAAN_S / 2, ISS, 50);
  assert.ok(p.kentta > 50 && p.kentta < 80, `kenttäkulma liukuu ${p.kentta}`);
  p = k.paivita(3 + IKKUNAAN_S + 0.01, ISS, 50);
  assert.equal(p.kentta, IKKUNAN_KENTTA);
  assert.ok(Math.abs(p.asento.kallistus - ikkunanKulma(ISS).kallistus) < 1e-9);

  k.napauta(p.asento, ISS, p.kentta, 5, false);
  assert.equal(k.tila, TILA.seuranta, 'ikkunasta takaisin seurantaan');

  k.poistu(18000000, 6, false);
  assert.equal(k.tila, TILA.kauko);
  assert.equal(k.kyydissa, true, 'paluu kesken on vielä kyytiä');
  assert.equal(k.paivita(6 + KAUKOON_S / 2, ISS, 50).paluuValmis, false);
  p = k.paivita(6 + KAUKOON_S + 0.01, ISS, 50);
  assert.equal(p.paluuValmis, true);
  assert.equal(p.asento.etaisyysM, 18000000);
  assert.equal(p.asento.kallistus, 0);
  assert.equal(p.kentta, 50, 'kenttäkulma palasi');
  assert.equal(k.kyydissa, false);
});

test('vähennetty liike: siirtymät heti', () => {
  const k = luoKyyti();
  k.napauta(kuvakulma(50, 10, 18000000, 0, 0), ISS, 50, 0, true);
  assert.equal(k.paivita(0, ISS, 50).asento.etaisyysM, SEURANNAN_ETAISYYS_M);
  k.napauta(k.paivita(0, ISS, 50).asento, ISS, 50, 0, true);
  assert.equal(k.paivita(0, ISS, 50).kentta, IKKUNAN_KENTTA);
  k.poistu(18000000, 0, true);
  assert.equal(k.paivita(0, ISS, 50).paluuValmis, true);
});

test('pallon toiselta puolelta pidempi lento; ✕ kaukonäkymässä ei tee mitään', () => {
  const k = luoKyyti();
  k.napauta(kuvakulma(-50, -170, 18000000, 0, 0), ISS, 50, 0, false);
  assert.ok(k.paivita(KYYTIIN_S + 0.01, ISS, 50).asento.etaisyysM > SEURANNAN_ETAISYYS_M);
  const j = luoKyyti();
  j.poistu(1e7, 0, false);
  assert.equal(j.kyydissa, false);
});

test('tietorivi: LIVE tuoreella TLE:llä, muuten rata-arvio', () => {
  const live = tietorivi(436.2, 27534, false);
  assert.equal(live.live, true);
  assert.equal(live.teksti, '· ISS · 436 km · 27 530 km/h');
  const arvio = tietorivi(420, 27600, true);
  assert.equal(arvio.live, false);
  assert.equal(arvio.teksti, 'ISS · 420 km · 27 600 km/h · rata-arvio');
});

test('ilmakehän kaari: exp(−h/22 km), sävy vaaleasta syvään, yöllä 0,06', () => {
  assert.equal(kaarenKirkkaus(0), 1);
  assert.ok(Math.abs(kaarenKirkkaus(22000) - Math.exp(-1)) < 1e-12);
  assert.ok(kaarenSavy(0).every((v, i) => Math.abs(v - KAAREN_VAALEA[i]) < 1e-12));
  assert.ok(kaarenSavy(100000).every((v, i) => Math.abs(v - KAAREN_SYVA[i]) < 1e-3));
  assert.equal(kaarenAurinko(-1), KAAREN_YO);
  assert.equal(kaarenAurinko(1), 1);
});

test('kytkentä: satelliitti-avaruus käyttää kyytiä ja todellista rataa, SHELL tuntee tiedostot', () => {
  const lahde = readFileSync(new URL('../js/linssit/satelliitti-avaruus.js', import.meta.url), 'utf8');
  assert.match(lahde, /from '\.\/iss-rata\.js'/);
  assert.match(lahde, /from '\.\/iss-kyyti-nakyma\.js'/);
  const sw = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
  for (const t of ['iss-rata.js', 'iss-kyyti.js', 'iss-kyyti-nakyma.js']) {
    assert.ok(sw.includes(`'./js/linssit/${t}'`), t);
  }
});

test('Cupola: kuvien vaihto on yksi vakio, koko ruudun muodon mukaan', async () => {
  const { cupolanOsoitteet, cupolanKoko, CUPOLA_KUVAT, CUPOLA_VERSIO } = await import('../js/linssit/iss-kyyti-nakyma.js');
  assert.ok(CUPOLA_KUVAT[CUPOLA_VERSIO], 'voimassa oleva versio on taulukossa');
  assert.equal(cupolanKoko(393, 852), 'iphone-1206x2622');
  assert.equal(cupolanKoko(834, 1194), 'ipad-1536x2732');
  const vanha = cupolanOsoitteet(393, 852, '20260926');
  assert.deepEqual(vanha.map((k) => k.laji), ['kehys', 'heijastus']);
  assert.match(vanha[0].osoite, /karttanostot\/20260926\/iss-cupola-kokonainen-iphone-1206x2622\.png$/);
  const uusi = cupolanOsoitteet(834, 1194, '20260928');
  assert.deepEqual(uusi.map((k) => k.laji), ['ulko', 'heijastus', 'kehys'], 'takaa eteen kuten natiivissa');
  assert.match(uusi[2].osoite, /karttanostot\/20260928\/iss-cupola2-kehys-ipad-1536x2732\.png$/);
});

test('ISS-malli natiivin mittasuhtein: 110 m leveä, neljä paria kullanruskeita siipiä', async () => {
  const { issMallinKolmiot, ISS_MALLIN_LEVEYS_M } = await import('../js/linssit/iss-kyyti-nakyma.js');
  const { paikat, varit } = issMallinKolmiot();
  const xs = paikat.filter((_, i) => i % 3 === 0);
  assert.equal(Math.max(...xs) - Math.min(...xs), 104, 'ristikko ja siivet ±52 m');
  assert.ok(ISS_MALLIN_LEVEYS_M >= 104);
  const kolmioita = paikat.length / 9;
  assert.ok(kolmioita <= 1500, `LOD0 ≤ 1 500 kolmiota: ${kolmioita}`);
  const kulta = [];
  for (let i = 0; i < varit.length; i += 3) if (Math.abs(varit[i] - 0xb4 / 255) < 1e-6) kulta.push(i);
  assert.equal(kulta.length / 6, 8, 'kahdeksan siipeä (neljä paria)');
});
