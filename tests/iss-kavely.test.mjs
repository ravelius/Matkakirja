/*
 * AVARUUSKÄVELY — YDIN (js/linssit/iss-kavely.js) ja kyydin Ulkona-tila (js/linssit/iss-kyyti.js). Samat luvut kuin
 * natiivin Linssit-testit/Testit/AvaruuskavelyTestit.cs: vaiheet napautuksin ja ajastettuina, auringonnousu
 * havainnollisella radalla, reunavalo, vertailukohde ja tagiton kuplateksti.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  luoKavely, VAIHE, jarjestys, repliikki, ilmanTageja, REPLIIKIT, OHJEET,
  PULU_S, TAKAISIN_S, ULOS_VAIHE_S, JALKEEN_S, NOUSU_VARA_S, ENNEN_S, NOUSU_KERROIN, KELAUS_ENINTAAN_S,
  valoisuus, aurinkoisuus, reunaValo, seuraavaNousu, kelausHetki, kelauksenHuippu, seuraavaPaivanvalo, PAIVA_RAJA,
  maanAurinko, lahinKohde, paikkaTeksti,
} from '../js/linssit/iss-kavely.js';
import { luoIssNyt } from '../js/linssit/iss-rata.js';
import {
  luoKyyti, TILA, ulkonaKulma, ikkunanKulma, kaari, suunta, pisteelta, kameranAsento,
  ULOS_S, SISAAN_S, ULKONA_KENTTA, ULKONA_KATSE_ALAS, IKKUNAN_KENTTA,
} from '../js/linssit/iss-kyyti.js';

const ISS = { lat: 50, lon: 10, korkeusM: 420000, suuntima: 60 };

test('vakiot natiivin mukaan (Avaruuskavely.cs, IssKyyti.cs)', () => {
  assert.equal(ULOS_VAIHE_S, 4);
  assert.equal(ULOS_S, 4);
  assert.equal(TAKAISIN_S, 2);
  assert.equal(SISAAN_S, 2);
  assert.equal(PULU_S, 9.5);
  assert.equal(ENNEN_S, 4);
  assert.equal(JALKEEN_S, 3);
  assert.equal(NOUSU_VARA_S, 2);
  assert.equal(NOUSU_KERROIN, 24);
  assert.equal(ULKONA_KENTTA, 70);
  assert.equal(ULKONA_KATSE_ALAS, 30);
});

test('tilakone: napautukset ja ajastetut vaiheet, lopetus', () => {
  const nahdyt = [];
  const k = luoKavely({ muuttui: (v) => nahdyt.push(v) });
  k.aloita(0);
  assert.equal(k.vaihe, VAIHE.ilmalukko);
  assert.equal(k.ohje, 'Napauta: avaa luukku');
  k.paivita(100, 0);
  assert.equal(k.vaihe, VAIHE.ilmalukko, 'ilmalukko odottaa napautusta');
  k.napauta(1);
  assert.equal(k.vaihe, VAIHE.ulos);
  k.napauta(2);
  assert.equal(k.vaihe, VAIHE.ulos, 'ulos-siirtymää ei voi ohittaa');
  k.paivita(1 + ULOS_VAIHE_S, 0);
  assert.equal(k.vaihe, VAIHE.koysi);
  k.napauta(6);
  assert.equal(k.vaihe, VAIHE.auringonnousu);
  k.paivita(6 + NOUSU_VARA_S - 0.1, 0);
  assert.equal(k.vaihe, VAIHE.auringonnousu, 'ei nousua → odotus NOUSU_VARA_S');
  k.paivita(6 + NOUSU_VARA_S, 0);
  assert.equal(k.vaihe, VAIHE.pulu);
  k.paivita(8 + PULU_S, 0);
  assert.equal(k.vaihe, VAIHE.kuva);
  k.napauta(20);
  assert.equal(k.vaihe, VAIHE.vertailu);
  k.napauta(21);
  assert.equal(k.vaihe, VAIHE.takaisin);
  k.paivita(21 + TAKAISIN_S, 0);
  assert.equal(k.vaihe, VAIHE.ei);
  assert.deepEqual(nahdyt, ['ilmalukko', 'ulos', 'koysi', 'auringonnousu', 'pulu', 'kuva', 'vertailu', 'takaisin', 'ei']);
  k.aloita(30);
  k.lopeta(31);
  assert.equal(k.vaihe, VAIHE.ei, '✕ suoraan pois');
});

test('auringonnousu-vaihe päättyy JALKEEN_S nousun jälkeen (simuloitu aika)', () => {
  const k = luoKavely();
  k.aloita(0); k.napauta(0); k.paivita(4, 0); k.napauta(4);
  k.asetaNousu(1_000_000);
  k.paivita(10, 1_000_000 + JALKEEN_S * 1000 - 1);
  assert.equal(k.vaihe, VAIHE.auringonnousu);
  k.paivita(10, 1_000_000 + JALKEEN_S * 1000);
  assert.equal(k.vaihe, VAIHE.pulu);
  assert.equal(k.nousuMs, null, 'nousu nollautuu vaiheen vaihtuessa');
});

test('repliikit ja ohjeet vaiheittain, tagit pois kuplasta', () => {
  assert.equal(repliikki(VAIHE.ulos), 'luukku');
  assert.equal(repliikki(VAIHE.koysi), 'luukku');
  assert.equal(repliikki(VAIHE.pulu), 'nousu');
  assert.equal(repliikki(VAIHE.kuva), 'kuva');
  assert.equal(repliikki(VAIHE.vertailu), null);
  assert.equal(ilmanTageja(REPLIIKIT.luukku).startsWith('Luukku on auki! Kiinnitä'), true);
  assert.ok(!ilmanTageja(REPLIIKIT.nousu).includes('['));
  assert.deepEqual(Object.keys(OHJEET), ['ilmalukko', 'koysi', 'kuva', 'vertailu']);
  assert.ok(jarjestys(VAIHE.koysi) < jarjestys(VAIHE.auringonnousu));
});

test('seuraava auringonnousu havainnollisella radalla: varjosta valoon, kelaus ennen', () => {
  const iss = luoIssNyt({ kello: () => 0 });
  const alku = Date.UTC(2026, 9, 2, 12, 0, 0);
  const nousu = seuraavaNousu(iss, alku);
  assert.ok(nousu !== null, 'nousu löytyy kahden kierroksen sisältä');
  const V = (ms) => { const p = iss.paikka(ms); return valoisuus(ms, p, p.korkeusKm); };
  assert.ok(V(nousu) > 0 && V(nousu - 1000) <= 0.001, 'puolitus 0,5 s:n tarkkuuteen');
  assert.equal(kelausHetki(nousu, alku), nousu - ENNEN_S * 1000);
  assert.equal(kelausHetki(nousu, nousu - 1000), null, 'liian lähellä → ei kelata');
  // Kelaus ≤ 3,6 s simukellon kaavalla (1,875 · ero / huippu).
  const ero = nousu - alku;
  assert.ok((1.875 * ero) / kelauksenHuippu(ero) <= KELAUS_ENINTAAN_S * 1000 + 1);
});

test('aurinkoisuus ja reunavalo: 0 varjossa, nousussa voimakas', () => {
  const iss = luoIssNyt({ kello: () => 0 });
  const alku = Date.UTC(2026, 9, 2, 12, 0, 0);
  const nousu = seuraavaNousu(iss, alku);
  assert.ok(aurinkoisuus(nousu - 60000, iss) < 0.01, 'minuutti ennen nousua varjossa');
  assert.ok(aurinkoisuus(nousu + 60000, iss) > 0.99, 'minuutti nousun jälkeen auringossa');
  const r1 = reunaValo(nousu + 10000, iss);
  const r2 = reunaValo(nousu + 20 * 60000, iss);
  assert.ok(r1 > 0.6 && r2 < 0.25, `reuna nousussa ${r1}, päivällä ${r2}`);
});

test('päivänvalo: haku löytää maan päiväpuolen ISS:n alta', () => {
  const iss = luoIssNyt({ kello: () => 0 });
  const alku = Date.UTC(2026, 9, 2, 0, 0, 0);
  const t = seuraavaPaivanvalo(iss, alku);
  assert.ok(t !== null);
  assert.ok(maanAurinko(t, iss.paikka(t)) >= PAIVA_RAJA - 1e-3);
});

test('vertailukohde: lähin, paikkateksti', () => {
  const k = lahinKohde([{ nimi: 'A', lat: 60, lon: 25 }, { nimi: 'B', lat: 0, lon: 0 }, { lat: NaN, lon: 1 }], 59, 24);
  assert.equal(k.kohde.nimi, 'A');
  assert.ok(k.km > 100 && k.km < 150);
  assert.equal(lahinKohde([], 0, 0), null);
  assert.equal(paikkaTeksti(60.17, -24.94), '60,2° N, 24,9° W');
});

test('kyyti: Ulkona-tila (katse 30° alas, kenttä 70°, ulos 4 s, sisään 2 s Cupolaan)', () => {
  const k = ulkonaKulma(ISS, 150);
  const s = pisteelta(kameranAsento(k).silma);
  assert.ok(kaari(s.lat, s.lon, ISS.lat, ISS.lon) < 0.01, 'silmä ISS:ssä');
  assert.ok(Math.abs(suunta(ISS.lat, ISS.lon, k.lat, k.lon) - 150) < 0.01, 'katse annettuun suuntaan');
  assert.ok(k.etaisyysM > ikkunanKulma(ISS).etaisyysM, '30° alas katsoo kauemmas kuin ikkuna');
  const oletus = ulkonaKulma(ISS);
  assert.ok(Math.abs(suunta(ISS.lat, ISS.lon, oletus.lat, oletus.lon) - (ISS.suuntima + 90)) < 0.01, 'oletus radan oikealle');

  const kyyti = luoKyyti({ seuranta: false, ulkonaSuunta: () => 150 });
  const kauko = { lat: 50, lon: 10, etaisyysM: 18e6, kallistus: 0, suuntima: 0, katseKorkeusM: 0 };
  kyyti.napauta(kauko, ISS, 50, 0, false);
  let r = kyyti.paivita(100, ISS, 50);
  assert.equal(kyyti.tila, TILA.ikkuna);
  kyyti.ulos(r.asento, r.kentta, 100, false);
  assert.equal(kyyti.tila, TILA.ulkona);
  kyyti.napauta(r.asento, ISS, r.kentta, 101, false);
  assert.equal(kyyti.tila, TILA.ulkona, 'napautus ei vaihda ulkona-tilaa');
  r = kyyti.paivita(100 + ULOS_S, ISS, 50);
  assert.equal(r.kentta, ULKONA_KENTTA);
  assert.equal(kyyti.siirtyy, false);
  kyyti.sisaan(r.asento, r.kentta, 200, false);
  assert.equal(kyyti.tila, TILA.ikkuna, 'sisään Cupolaan');
  r = kyyti.paivita(200 + SISAAN_S, ISS, 50);
  assert.equal(r.kentta, IKKUNAN_KENTTA);
});
