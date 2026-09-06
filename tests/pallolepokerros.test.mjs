import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  LEPOKERROS_KORKEUSRAJA, LEPOKERROS_KOROTUS, LEPOKERROS_LAATTAKATTO_MAX, LEPOKERROS_LAATTAKATTO_MIN,
  LEPOKERROS_RUUDUKKO_MAX, LEPOKERROS_RUUDUKKO_MIN, LAATU_KAUKORAJA, NAPAKANNEN_KOROTUS, PALLO_LAUTA,
  lepokerroksenAlue, lepokerroksenKerrokset, lepokerroksenLaatat, lepokerroksenLaattakatto,
  lepokerroksenSilmat, lepokerroksenSuunnitelma, lepokerroksenTaso, lepokerroksenTasoRiittaa,
  lepokerroksenUV, lepokerroksenVerkko, pallonPiste,
} from '../js/pallo.js';
import { projisoiLaudalle, laudaltaAsteiksi } from '../js/fokusmitat.js';
import { VALON_KORKEUS } from '../js/pallolauta/nostot.js';
import { REITIN_VARJON_KORKEUS } from '../js/pallolauta/reitit.js';

/*
 * LEPOKERROS (Raamattu 6.9.2026, PALLO LEVOSSA YHTA TERAVA KUIN
 * TASOKARTTA): kun kamera pysähtyy, pallo kokoaa näkyvän alueen päälle
 * kerroksen tasokartan pyramidin laatoista. Nämä testit vartioivat
 * ydinlogiikkaa ilman selainta: näkyvän alueen laatikko, tason valinta,
 * laattojen valinta aukikierretyssä pikseliavaruudessa (sauma!), UV
 * Millerin kankaalla, verkon puskurit ja versiovahti.
 */

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

/* pyramidi.json 2026-09-03a (mitatut mitat): z7 on syvin. */
const PROJEKTIO = { leveys: 12000, lon0: -175 };
const ARKKI = { x: 0, y: -1046.3149255312064, w: 12000, h: 7307.715927310571 };
const RAJAUS = { x: 0, y: -611.3149255312065, w: 12000, h: 6422.715927310571 };
const TASOT = Array.from({ length: 8 }, (_, z) => {
  const leveys = 675 * 2 ** z;
  const korkeus = Math.round(411 * 2 ** z + (z === 7 ? 8 : 0));
  return {
    z, leveys, korkeus, pikseliaPerYksikko: leveys / 12000,
    sarakkeita: Math.ceil(leveys / 512), riveja: Math.ceil(korkeus / 512), laatasto: null,
  };
});
const LAATTA = 512;
const laudanY = (lat) => projisoiLaudalle(PALLO_LAUTA, 0, lat).y;

test('pallonPiste on kirjaston koordinaatisto: (0,0) = +z, (0,90) = +x, napa = +y', () => {
  const lahella = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} ≠ ${b}`);
  const p0 = pallonPiste(0, 0);
  lahella(p0.x, 0); lahella(p0.y, 0); lahella(p0.z, 100);
  const p90 = pallonPiste(0, 90);
  lahella(p90.x, 100); lahella(p90.z, 0);
  const napa = pallonPiste(90, 0);
  lahella(napa.y, 100);
  const s = pallonPiste(45, 45, 1);
  lahella(Math.hypot(s.x, s.y, s.z), 1);
});

test('näkyvä alue: laatikko näytteistä, pituuspiirit aukikierrettyinä sauman yli', () => {
  // Ruutu Tyynenmeren päällä: näytteet ovat 179° E ja 179° W — laatikon
  // leveys on 2° + reunus, EI 358°.
  const alue = lepokerroksenAlue([{ lat: 10, lng: 179 }, { lat: -10, lng: -179 }, null], 180);
  assert.ok(alue);
  assert.ok(alue.lon1 - alue.lon0 < 4, `laatikko ${alue.lon1 - alue.lon0}° leveä — sauma ei aukikierretty`);
  assert.ok(alue.lon0 < 180 && alue.lon1 > 180);
  assert.equal(alue.naytteita, 2);
  // Leveys rajataan kartta-alaan ja napakansiin.
  const rajattu = lepokerroksenAlue([{ lat: 89, lng: 0 }, { lat: 80, lng: 0 }], 0, { latMax: 83.7 });
  assert.equal(rajattu.lat1, 83.7);
  assert.equal(lepokerroksenAlue([null, undefined], 0), null);
  assert.equal(lepokerroksenAlue([{ lat: 89, lng: 0 }], 0, { latMax: 83.7, vara: 0 }), null, 'tyhjä laatikko on null');
});

test('tason valinta: matalin taso jonka px/aste riittää, syvin kun mikään ei riitä', () => {
  // Työpöytä 2758 × 1642 dpr 2 Kreikan yllä: 251 px/aste → z7 (240) on syvin.
  assert.equal(lepokerroksenTaso(TASOT, 251).z, 7);
  assert.equal(lepokerroksenTaso(TASOT, 100).z, 6, '120 px/aste riittää sadalle');
  assert.equal(lepokerroksenTaso(TASOT, 20).z, 4, '30 px/aste riittää kahdellekymmenelle (z3 on 15)');
  assert.equal(lepokerroksenTaso(TASOT, 14).z, 3);
  assert.equal(lepokerroksenTaso(TASOT, 20, 0.5).z, 3, 'terävyys 0,5 sallii venytyksen');
  assert.equal(lepokerroksenTaso([], 20), null);
});

test('versiovahti: kerros vain kun pallon sarja on poltettu samasta pyramidista', () => {
  const pyramidi = { versio: 'A', viivataso: { versio: 'V' }, nostotaso: { versio: 'N' } };
  assert.deepEqual(lepokerroksenKerrokset({ versio: 'A', viivat: 'V', nostot: 'N' }, pyramidi),
    { pohja: true, viiva: true, nosto: true });
  // Pohjasarja ilman viivoja ja nostoja: vain pohja (nostot ovat pallolla elävinä).
  assert.deepEqual(lepokerroksenKerrokset({ versio: 'A' }, pyramidi), { pohja: true, viiva: false, nosto: false });
  assert.equal(lepokerroksenKerrokset({ versio: 'B', viivat: 'V', nostot: 'N' }, pyramidi), null, 'eri pohja');
  assert.equal(lepokerroksenKerrokset({ versio: 'A', viivat: 'V', nostot: 'N2' }, pyramidi), null, 'eri nostot');
  assert.equal(lepokerroksenKerrokset({ versio: 'A', viivat: 'V' }, { versio: 'A' }), null, 'pyramidilla ei viivatasoa');
  assert.equal(lepokerroksenKerrokset(null, pyramidi), null);
});

test('laatat: Kreikan laatikko z7:llä osuu samoihin sarakkeisiin kuin tasokartan ruudukko', () => {
  const taso = TASOT[7];
  const alue = { lat0: 35, lat1: 42, lon0: 16, lon1: 30 };
  const kartta = lepokerroksenLaatat({ taso, laatta: LAATTA, arkki: ARKKI, projektio: PROJEKTIO, alue, laudanY });
  assert.ok(kartta);
  // Tasokartan kaava: sarake = floor(x · ppu / 512), x = (lon − lon0)/360 · 12000.
  const sarake = (lon) => Math.floor((((lon + 175) / 360) * 12000 * 7.2) / LAATTA);
  const rivi = (lat) => Math.floor(((laudanY(lat) - ARKKI.y) * 7.2) / LAATTA);
  const sarakkeet = [...new Set(kartta.laatat.map((l) => l.sarake))];
  assert.equal(Math.min(...sarakkeet), sarake(16));
  assert.equal(Math.max(...sarakkeet), sarake(30));
  const rivit = [...new Set(kartta.laatat.map((l) => l.rivi))];
  assert.equal(Math.min(...rivit), rivi(42));
  assert.equal(Math.max(...rivit), rivi(35));
  // Kangas on kokonaisia laattoja ja laatat vierekkäin ilman rakoja.
  assert.equal(kartta.leveys, sarakkeet.length * LAATTA);
  assert.equal(kartta.korkeus, rivit.length * LAATTA);
  for (const l of kartta.laatat) {
    assert.equal(l.x, (l.sarake - sarakkeet[0]) * LAATTA);
    assert.equal(l.y, (l.rivi - rivit[0]) * LAATTA);
  }
  // UV: alueen kulmat kankaan sisällä, pohjoinen ylhäällä (v lähellä 1).
  const yv = lepokerroksenUV(kartta, 16, 42);
  const oa = lepokerroksenUV(kartta, 30, 35);
  assert.ok(yv.u >= 0 && yv.u < oa.u && oa.u <= 1, `u ${yv.u}…${oa.u}`);
  assert.ok(oa.v >= 0 && oa.v < yv.v && yv.v <= 1, `v ${oa.v}…${yv.v}`);
  // Piste laatan keskellä: u vastaa täsmälleen laatan omaa pikseliä.
  const l0 = kartta.laatat[0];
  const lonKeski = ((l0.sarake + 0.5) * LAATTA) / 7.2 / 12000 * 360 - 175;
  const u = lepokerroksenUV(kartta, lonKeski, 40).u * kartta.leveys;
  assert.ok(Math.abs(u - (l0.x + LAATTA / 2)) < 1e-6, `u-pikseli ${u} ≠ ${l0.x + LAATTA / 2}`);
});

test('laatat sauman yli: vajaa viimeinen sarake ja seuraavan kierroksen sarake 0 vierekkäin', () => {
  const taso = TASOT[7]; // 86 400 px = 168 × 512 + 384: viimeinen sarake on 384 px
  const alue = { lat0: -20, lat1: -10, lon0: 182, lon1: 188 }; // sauma 185° E
  const kartta = lepokerroksenLaatat({ taso, laatta: LAATTA, arkki: ARKKI, projektio: PROJEKTIO, alue, laudanY });
  const rivi = kartta.laatat[0].rivi;
  const rivilla = kartta.laatat.filter((l) => l.rivi === rivi).sort((a, b) => a.x - b.x);
  const viimeinen = rivilla.find((l) => l.sarake === taso.sarakkeita - 1);
  const ensimmainen = rivilla.find((l) => l.sarake === 0);
  assert.ok(viimeinen && ensimmainen, 'molemmat puolet saumasta mukana');
  assert.equal(viimeinen.w, 384, 'vajaa sarake luetaan tason pikseleistä');
  assert.equal(ensimmainen.x - viimeinen.x, 384, 'sarake 0 alkaa heti vajaan sarakkeen perästä');
  // UV on jatkuva sauman yli: 185° E:n itäpuoli osuu sarakkeen 0 alkuun.
  const u = lepokerroksenUV(kartta, 185, -15).u * kartta.leveys;
  assert.ok(Math.abs(u - ensimmainen.x) < 1e-6, `sauma u ${u} ≠ ${ensimmainen.x}`);
});

test('laattakatto ruudusta: työpöytä 64 (katto), puhelin 46, rajat 16…64', () => {
  assert.equal(lepokerroksenLaattakatto(2758 * 1642), LEPOKERROS_LAATTAKATTO_MAX);
  assert.equal(lepokerroksenLaattakatto(1170 * 2532), 46);
  assert.equal(lepokerroksenLaattakatto(100), LEPOKERROS_LAATTAKATTO_MIN);
  assert.equal(lepokerroksenLaattakatto(1e9), LEPOKERROS_LAATTAKATTO_MAX);
});

test('tiheysvahti: karkeampaa kuin pallon omat laatat ei koota', () => {
  // Kreikka 38,5° N: Z8 = 232 px/aste, z7 = 240 → riittää.
  assert.ok(lepokerroksenTasoRiittaa(TASOT[7], 8, 38.5));
  // Eurooppa 47° N: Z7 = 133 px/aste; z5 = 60 ei riitä, z6 = 120 riittää (0,85 × 133 = 113).
  assert.ok(!lepokerroksenTasoRiittaa(TASOT[5], 7, 47));
  assert.ok(lepokerroksenTasoRiittaa(TASOT[6], 7, 47));
  // Ilman moottorin tasoa (varatekstuuri) vahti ei estä.
  assert.ok(lepokerroksenTasoRiittaa(TASOT[3], NaN, 0));
});

test('suunnitelma: taso putoaa karkeammaksi kunnes laattamäärä ja kangas mahtuvat', () => {
  const alue = { lat0: 30, lat1: 60, lon0: -10, lon1: 40 }; // koko Eurooppa
  const yhteiset = { tasot: TASOT, alue, laatta: LAATTA, arkki: ARKKI, projektio: PROJEKTIO, laudanY };
  const katto = lepokerroksenLaattakatto(2758 * 1642);
  const tiukka = lepokerroksenSuunnitelma({ ...yhteiset, tarvePxAste: 250, katto, kangasKatto: 4096 });
  assert.ok(tiukka && tiukka.taso.z < 7, `Eurooppa ei mahdu z7:llä ${katto} laattaan`);
  assert.ok(tiukka.kartta.laatat.length <= katto);
  assert.ok(tiukka.kartta.leveys <= 4096 && tiukka.kartta.korkeus <= 4096);
  const valja = lepokerroksenSuunnitelma({ ...yhteiset, tarvePxAste: 250, katto: 100000, kangasKatto: 100000 });
  assert.equal(valja.taso.z, 7, 'ilman kattoa syvin taso');
  // Kreikan lähikuva (mitattu työpöydän laatikko) mahtuu syvimmällä tasolla ruudun kattoon: 48 laattaa.
  const kreikka = lepokerroksenSuunnitelma({
    ...yhteiset, alue: { lat0: 34.37, lat1: 42.26, lon0: 15.04, lon1: 31.37 }, tarvePxAste: 251, katto,
  });
  assert.equal(kreikka.taso.z, 7);
  assert.equal(kreikka.kartta.laatat.length, 48);
  // Sama laatikko oletuskatolla (16) putoaa: siksi katto on ruudusta.
  assert.ok(lepokerroksenSuunnitelma({
    ...yhteiset, alue: { lat0: 34.37, lat1: 42.26, lon0: 15.04, lon1: 31.37 }, tarvePxAste: 251,
  }).taso.z < 7);
});

test('verkko: kärjet pinnalla, UV kankaan sisällä, kolmiot ulospäin', () => {
  const taso = TASOT[6];
  const alue = { lat0: 35, lat1: 42, lon0: 16, lon1: 30 };
  const kartta = lepokerroksenLaatat({ taso, laatta: LAATTA, arkki: ARKKI, projektio: PROJEKTIO, alue, laudanY });
  const nx = lepokerroksenSilmat(alue.lon1 - alue.lon0);
  const ny = lepokerroksenSilmat(alue.lat1 - alue.lat0);
  assert.equal(nx, 56); // 14° / 0,25°
  assert.equal(ny, 28);
  assert.equal(lepokerroksenSilmat(0.1), LEPOKERROS_RUUDUKKO_MIN);
  assert.equal(lepokerroksenSilmat(400), LEPOKERROS_RUUDUKKO_MAX);
  const sade = 100 * LEPOKERROS_KOROTUS;
  const v = lepokerroksenVerkko({ alue, kartta, sade, nx, ny });
  const kohtia = (nx + 1) * (ny + 1);
  assert.equal(v.paikat.length, kohtia * 3);
  assert.equal(v.uvt.length, kohtia * 2);
  assert.equal(v.indeksit.length, nx * ny * 6);
  for (let i = 0; i < kohtia; i += 1) {
    const r = Math.hypot(v.paikat[i * 3], v.paikat[i * 3 + 1], v.paikat[i * 3 + 2]);
    assert.ok(Math.abs(r - sade) < 1e-3, `kärki ${i} säteellä ${r}`);
    const n = Math.hypot(v.normaalit[i * 3], v.normaalit[i * 3 + 1], v.normaalit[i * 3 + 2]);
    assert.ok(Math.abs(n - 1) < 1e-6);
    assert.ok(v.uvt[i * 2] >= 0 && v.uvt[i * 2] <= 1 && v.uvt[i * 2 + 1] >= 0 && v.uvt[i * 2 + 1] <= 1, `uv ${i}`);
  }
  // Ensimmäinen kolmio: normaali (b−a) × (d−a) osoittaa ulospäin (etupuoli = vastapäivään ulkoa).
  const P = (k) => [v.paikat[k * 3], v.paikat[k * 3 + 1], v.paikat[k * 3 + 2]];
  const [a, b, d] = [P(v.indeksit[0]), P(v.indeksit[1]), P(v.indeksit[2])];
  const ab = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const ad = [d[0] - a[0], d[1] - a[1], d[2] - a[2]];
  const n = [ab[1] * ad[2] - ab[2] * ad[1], ab[2] * ad[0] - ab[0] * ad[2], ab[0] * ad[1] - ab[1] * ad[0]];
  assert.ok(n[0] * a[0] + n[1] * a[1] + n[2] * a[2] > 0, 'kolmio osoittaa palloon sisäänpäin');
  // Ensimmäinen kärki on alueen luoteiskulma pallon pinnalla.
  const nw = pallonPiste(alue.lat1, alue.lon0, sade);
  assert.ok(Math.abs(a[0] - nw.x) < 1e-6 || Math.abs(b[0] - nw.x) < 1e-6);
});

test('kerros laattojen päällä ja kaikkien merkkien alla; ei yleiskuvassa', () => {
  assert.ok(LEPOKERROS_KOROTUS > 1);
  assert.ok(LEPOKERROS_KOROTUS < NAPAKANNEN_KOROTUS, 'napakansi jää lepokerroksen päälle');
  assert.ok(LEPOKERROS_KOROTUS - 1 < VALON_KORKEUS, 'aihevalot lepokerroksen päällä');
  assert.ok(LEPOKERROS_KOROTUS - 1 < REITIN_VARJON_KORKEUS, 'reittien varjo lepokerroksen päällä');
  assert.equal(LEPOKERROS_KORKEUSRAJA, LAATU_KAUKORAJA, 'sama raja kuin laatutilan yleiskuvalla');
  // Kartta-ala: pyramidin rajaus on 84° N…66° S, ja pohjoinen jää napakannen alle.
  assert.ok(Math.abs(laudaltaAsteiksi(PALLO_LAUTA, 0, RAJAUS.y).lat - 84) < 0.01);
  assert.ok(Math.abs(laudaltaAsteiksi(PALLO_LAUTA, 0, RAJAUS.y + RAJAUS.h).lat + 66) < 0.01);
});

test('kytkennät: sama lepo kokoaa, liike piilottaa heti, osoitteet tasokartan moduulista', () => {
  const pallo = lue('../js/pallo.js');
  assert.match(pallo, /const lepokerros = luoLepokerros\(\{\n\s*pallo, kotelo, ikkuna, renderer, laattataso: \(\) => moottori\.level,\n\s*\}\);/);
  assert.match(pallo, /alkuperainen\.call\(moottori, kamera\);\n[^\n]*\n[^\n]*void lepokerros\.kokoa\(\);/,
    'lepokerros kootaan samassa lepoon-kutsussa kuin laatutaso nousee');
  const liike = pallo.match(/edellinen\.distanceToSquared\(paikka\) > 1e-10\) \{[\s\S]*?lepokerros\.piilota\(\);[\s\S]*?if \(lepo && nyt - liikeAlku >= LAATU_LIIKEVIIVE_MS\)/);
  assert.ok(liike, 'piilotus tapahtuu heti liikkeestä, ennen LAATU_LIIKEVIIVE_MS-viivettä');
  assert.match(pallo, /lepokerros\.pura\(\);\n\s*moottori\.updatePov = alkuperainen;/);
  // Osoitteet ja luettelo VAIN tasokartan moduulista — ei omaa kaavaa.
  assert.match(pallo, /import \{\n\s*haePyramidinLuettelo, pyramidinKerrostasot, pyramidinLaattaOlemassa, pyramidinLaattaUrl,\n\} from '\.\/laattapyramidi\.js';/);
  assert.ok(!/julisteet\/pyramidi/.test(pallo), 'pallo.js ei rakenna pyramidin polkua itse');
  const pyramidi = lue('../js/laattapyramidi.js');
  for (const vienti of ['haePyramidinLuettelo', 'pyramidinKerrostasot', 'pyramidinLaattaUrl', 'pyramidinLaattaOlemassa']) {
    assert.match(pyramidi, new RegExp(`export function ${vienti}\\(`), `${vienti} puuttuu laattapyramidi.js:stä`);
  }
  // Piirtojärjestys: syvyys kirjoitetaan ja kerros piirretään läpinäkyvien ensimmäisenä.
  assert.match(pallo, /transparent: true, opacity: 0, depthWrite: true/);
  assert.match(pallo, /uusi\.renderOrder = -1;/);
  assert.match(pallo, /uusi\.raycast = \(\) => \{\};/, 'kerros ei ota napautuksia');
  // Lauta antaa kahvan savukkeille.
  assert.match(lue('../js/pallolauta/lauta.js'), /lepokerros: \(\) => pallonLepokerros\(pallo\),/);
});
