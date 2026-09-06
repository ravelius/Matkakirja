import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  LAATTAKERROS_HAIVE_MS, LAATTAKERROS_HYSTEREESI_ALAS, LAATTAKERROS_LAATTAKATTO_MUISTI,
  LAATTAKERROS_LAATTAKATTO_NAKYVA, LAATTAKERROS_LAATTAKATTO_TAVUT, LAATTAKERROS_NAYTTEITA,
  LAATTAKERROS_OLETUS, LAATTAKERROS_PAIVITYSVALI_LIIKE_MS, LAATTAKERROS_RENDER_ORDER_POHJA,
  LAATTAKERROS_RINNAKKAIN, LAATTAKERROS_SILMAT_MAX, LAATTAKERROS_SILMAT_MIN,
  LAATTAKERROS_SYVYYSSIIRTO, LAATTAKERROS_TEKSTUUREJA_PER_KEHYS, LAATTAKERROS_TERAVYYS,
  LAATTAKERROS_VARA_AST, LAATTAKERROS_VARA_OSUUS, POHJAN_TASO_MAX,
  laatanKartta, laattakerroksenLRU, laattakerroksenNakyvissa, laattakerroksenOsuma,
  laattakerroksenPeitto, laattakerroksenSilmat, laattakerroksenTaso, lepokerroksenAlue,
  lepokerroksenLaatat, lepokerroksenUV,
} from '../js/pallo.js';
import { laattakerrosPaalla, laattakerrosOsoitteesta } from '../js/ui-apurit.js';
import { PALLO_LAUTA } from '../js/pallo.js';
import { projisoiLaudalle } from '../js/fokusmitat.js';

/*
 * LAATTAKERROS (erä E1, suunnitelma
 * docs/moduulit/pallon-liike-taydella-tarkkuudella.md luku 4; Raamattu
 * 6.9.2026, PALLO LEVOSSA YHTA TERAVA KUIN TASOKARTTA › PALAUTE
 * v1642:STA, LIIKKEEN AIKAINEN TARKKUUS). Pallon pinta piirretään
 * pyramidin laatoista laatta kerrallaan, taso valitaan ruudun
 * pikseleistä hystereesillä, ylimääräiset häipyvät vain peiton alta ja
 * LRU pitää muistin kurissa. Nämä testit vartioivat ydinlogiikkaa ilman
 * selainta.
 */

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

/* pyramidi.json 2026-09-03a (samat mitat kuin tests/pallolepokerros.test.mjs). */
const PROJEKTIO = { leveys: 12000, lon0: -175 };
const ARKKI = { x: 0, y: -1046.3149255312064, w: 12000, h: 7307.715927310571 };
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
/** Tason px/aste: z6 = 120, z7 = 240. */
const pxAste = (z) => TASOT[z].leveys / 360;

test('taso hystereesillä: ylös vasta 1/0,7-venytyksellä, alas heti kun tarve pienenee', () => {
  assert.equal(LAATTAKERROS_TERAVYYS, 1, 'laatan pikseli on laitepikseli');
  assert.equal(LAATTAKERROS_HYSTEREESI_ALAS, 0.7);
  // Ilman nykyistä tasoa: matalin riittävä (sama kuin lepokerroksenTaso).
  assert.equal(laattakerroksenTaso(TASOT, 121).z, 7);
  assert.equal(laattakerroksenTaso(TASOT, 119).z, 6);
  // Nykyinen z6 pidetään, kunnes venytys ylittää 1/0,7 = 1,43:
  // 120 / 0,7 = 171,4 px/aste on raja.
  assert.equal(laattakerroksenTaso(TASOT, 150, TASOT[6]).z, 6, 'venytys 1,25: pidetään');
  assert.equal(laattakerroksenTaso(TASOT, 171, TASOT[6]).z, 6, 'venytys 1,43: vielä pidetään');
  assert.equal(laattakerroksenTaso(TASOT, 172, TASOT[6]).z, 7, 'venytys yli 1,43: noustaan');
  // Sama numerona (kerros antaa nykyisen tason z:n).
  assert.equal(laattakerroksenTaso(TASOT, 150, 6).z, 6);
  // Alas: nykyinen z7 on hienompi kuin tarve vaatii → pudotaan heti.
  assert.equal(laattakerroksenTaso(TASOT, 119, TASOT[7]).z, 6);
  assert.equal(laattakerroksenTaso(TASOT, 121, TASOT[7]).z, 7, 'tarve yhä z7: pysytään');
  /*
   * Hystereesin BANDI on siis [120, 171] px/aste: z6:sta noustaan 171:ssä
   * ja z7:stä pudotaan 120:ssä. Ilman ehtoa "nykyinen ei ole tarvetta
   * hienompi" pelkkä terävyysehto pitäisi hienon tason ikuisesti (240 ≥
   * 0,7 × mikä tahansa pienempi tarve), ja ulos zoomatessa näkyvä alue
   * kasvaisi satoihin laattoihin.
   */
  // Yleiskuva (2 px/aste) pudottaa pohjalle asti: z1 = 3,75 px/aste riittää.
  assert.equal(laattakerroksenTaso(TASOT, 2, TASOT[7]).z, 1);
  assert.equal(laattakerroksenTaso([], 100), null);
});

test('peittotesti: Kreikan laatikon z6-laatta on peitossa vasta kun kaikki z7-laatat ovat valmiit', () => {
  const alue = { lat0: 35, lat1: 42, lon0: 16, lon1: 30 };
  const yhteiset = { laatta: LAATTA, arkki: ARKKI, projektio: PROJEKTIO, alue, laudanY };
  const z6 = lepokerroksenLaatat({ taso: TASOT[6], ...yhteiset });
  const z7 = lepokerroksenLaatat({ taso: TASOT[7], ...yhteiset });
  // Kreikan laatikko: z6 antaa 15 laattaa (44–48 × 19–21), z7 neljäkymmentä
  // (89–96 × 38–42). Reunimmaisen z6-laatan lapset jäävät osin laatikon
  // ulkopuolelle, joten peittotesti tehdään laatikon SISÄLTÄ.
  assert.equal(z6.laatat.length, 15);
  assert.equal(z7.laatat.length, 40);
  const valmiit = new Set(z7.laatat.map((l) => `7/${l.sarake}/${l.rivi}`));
  const sisalla = { z: 6, sarake: 45, rivi: 20 };
  assert.ok(z6.laatat.some((l) => l.sarake === sisalla.sarake && l.rivi === sisalla.rivi));
  // Tyhjällä joukolla ei peittoa.
  assert.equal(laattakerroksenPeitto(sisalla, new Set(), TASOT), false);
  // Kaikki näkyvät z7-laatat valmiina: sisempi z6-laatta on peitossa.
  assert.equal(laattakerroksenPeitto(sisalla, valmiit, TASOT), true);
  // Peitto on TÄSMÄLLEEN ne neljä z7-laattaa, jotka osuvat z6-laatan
  // pikseleihin (Millerin pyramidissa sarakkeita on 675 · 2^z / 512, ei
  // potenssia kahdesta — sisäkkäisyys lasketaan pikseleistä, ei kaavalla).
  const lapset = ['7/90/40', '7/90/41', '7/91/40', '7/91/41'];
  assert.equal(laattakerroksenPeitto(sisalla, new Set(lapset), TASOT), true);
  for (const avain of lapset) {
    const vajaa = new Set(valmiit);
    vajaa.delete(avain);
    assert.equal(laattakerroksenPeitto(sisalla, vajaa, TASOT), false, `${avain} puuttuu → ei peittoa`);
  }
  // Laatikon reunalla oleva z6-laatta EI ole peitossa: sen lapsi 88 on
  // näkymättömissä eikä siis valmis.
  assert.equal(laattakerroksenPeitto({ z: 6, sarake: 44, rivi: 19 }, valmiit, TASOT), false);
  // Kohdetaso voi olla kauempanakin (zoom hyppää tason yli).
  assert.equal(laattakerroksenPeitto({ z: 5, sarake: 22, rivi: 10 }, valmiit, TASOT, { kohdeZ: 7 }), false,
    'neljänkymmenen z7-laatan laatikko ei kata koko z5-laattaa');
  // Syvimmän tason alla ei ole hienompaa: ei peittoa.
  assert.equal(laattakerroksenPeitto({ z: 7, sarake: 90, rivi: 40 }, valmiit, TASOT), false);
});

test('näytteet lasketaan: ruudun piste pallon pinnalle ilman säteenjäljitystä', () => {
  /*
   * Kirjaston toGlobeCoords testaa jokaisella kutsulla pallon kaikki
   * laattaverkot: 81 kutsua maksoi puhelinnäkymässä 444 ms (mitattu
   * 6.9.2026, Chromium ilman hidastusta, 47 000 kolmiota). Kerros
   * päivittyy kymmenen kertaa sekunnissa, joten näytteet lasketaan.
   * Vertailuluvut ovat SAMASTA selainnäkymästä säteenjäljityksellä
   * mitatut (Ateena, korkeus 0,35, kotelo 374 × 771, fov 50).
   */
  const pov = { lat: 37.97, lng: 23.74, altitude: 0.35 };
  const [W, H] = [374, 771];
  const linssi = { fov: 50, kuvasuhde: W / H, sade: 100 };
  const osuma = (x, y) => laattakerroksenOsuma(pov, (2 * x) / W - 1, 1 - (2 * y) / H, linssi);
  const keski = osuma(W / 2, H / 2);
  assert.ok(Math.abs(keski.lat - pov.lat) < 1e-9 && Math.abs(keski.lng - pov.lng) < 1e-9,
    'ruudun keskipiste osuu kameran alle');
  const naytteet = [];
  for (let j = 0; j < 9; j += 1) {
    for (let i = 0; i < 9; i += 1) naytteet.push(osuma((W * i) / 8, (H * j) / 8));
  }
  assert.equal(naytteet.filter(Boolean).length, 81, 'koko ruutu on pallon päällä korkeudella 0,35');
  const alue = lepokerroksenAlue(naytteet, pov.lng, { vara: 0 });
  const lahella = (a, b, raja, mika) => assert.ok(Math.abs(a - b) < raja, `${mika}: ${a} ≠ ${b}`);
  lahella(alue.lat0, 27.892, 0.1, 'etelä');
  lahella(alue.lat1, 47.787, 0.1, 'pohjoinen');
  lahella(alue.lon0, 16.606, 0.1, 'länsi');
  lahella(alue.lon1, 30.878, 0.1, 'itä');
  // Tarve px/aste: 40 css-px alaspäin keskeltä (sama kaava kuin lepokerros).
  const alas = osuma(W / 2, H / 2 + 40);
  assert.ok(alas.lat < keski.lat && keski.lat - alas.lat > 0.5, 'alaspäin mennään etelään');
  // Yleiskuvassa ruudun kulmat ovat pallon ohi (null), keskipiste ei.
  const kaukaa = { lat: 0, lng: 0, altitude: 2.5 };
  assert.ok(laattakerroksenOsuma(kaukaa, 0, 0, linssi));
  assert.equal(laattakerroksenOsuma(kaukaa, 1, 1, { ...linssi, kuvasuhde: 3 }), null,
    'leveä ruutu näkee pallon ohi');
  // Navan yllä kehys ei hajoa (itä-vektori on siellä määrittelemätön).
  assert.ok(laattakerroksenOsuma({ lat: 90, lng: 0, altitude: 0.5 }, 0, 0, linssi));
  assert.equal(laattakerroksenOsuma(null, 0, 0, linssi), null);
});

test('horisontti: takapuolen laatat karsitaan ennen laattakattoa', () => {
  /*
   * Näkyvä alue on lat/lon-LAATIKKO, mutta pallolla näkyy kalotti.
   * Yleiskuvassa laatikon kulmat ovat pallon takana: ilman karsintaa
   * kerros loisi takapuolen laatat ja laattakatto pudottaisi tason
   * turhaan — mitattu 6.9.2026, zoomissa taso karkeni kesken
   * sisäänzoomauksen (3 → 2). Karsinnan jälkeen tasot ovat
   * monotoniset 3 → 4 → 5 → 6 → 7.
   */
  const pov = { lat: 38, lng: 24, altitude: 1 }; // horisontti 60° kameran alta
  const laatikko = (lat, lon, koko) => ({
    lat0: lat - koko / 2, lat1: lat + koko / 2, lon0: lon - koko / 2, lon1: lon + koko / 2,
  });
  assert.equal(laattakerroksenNakyvissa(laatikko(38, 24, 4), pov), true, 'kameran alla');
  assert.equal(laattakerroksenNakyvissa(laatikko(38, 70, 4), pov), true, '46° päässä: näkyy');
  assert.equal(laattakerroksenNakyvissa(laatikko(38, 150, 4), pov), false, 'takapuoli pois');
  assert.equal(laattakerroksenNakyvissa(laatikko(-45, 200, 4), pov), false, 'vastakkainen napa pois');
  // Horisontin päällä oleva laatta jää mukaan, kun sen kulmasäde ulottuu
  // kalottiin (osittain näkyvä laatta ei saa kadota).
  assert.equal(laattakerroksenNakyvissa(laatikko(38, 24 + 62, 8), pov), true, 'horisontin yli ulottuva');
  // Lähikuvassa kalotti on pieni: kaukainen laatta on aina pois.
  const lahella = { lat: 38, lng: 24, altitude: 0.05 };
  assert.equal(laattakerroksenNakyvissa(laatikko(38, 24, 2), lahella), true);
  assert.equal(laattakerroksenNakyvissa(laatikko(38, 50, 2), lahella), false, '26° > horisontti 17,8°');
  // Ilman kameraa ei karsita (varmuuden vuoksi kaikki mukaan).
  assert.equal(laattakerroksenNakyvissa(laatikko(0, 0, 2), null), true);
});

test('silmät: hienolla laatalla vähimmäismäärä, karkealla enimmäismäärä, välissä 0,25°', () => {
  assert.equal(LAATTAKERROS_SILMAT_MIN, 16);
  assert.equal(LAATTAKERROS_SILMAT_MAX, 160);
  // z7-laatta on 512 / 240 px/aste = 2,13° leveä → vähimmäismäärä.
  assert.ok(Math.abs(LAATTA / pxAste(7) - 2.13) < 0.02);
  assert.equal(laattakerroksenSilmat(LAATTA / pxAste(7)), LAATTAKERROS_SILMAT_MIN);
  assert.equal(laattakerroksenSilmat(2.1), LAATTAKERROS_SILMAT_MIN);
  // z2-laatta on 512 / 7,5 px/aste = 68,3° leveä → enimmäismäärä.
  assert.ok(Math.abs(LAATTA / pxAste(2) - 68.3) < 0.1);
  assert.equal(laattakerroksenSilmat(LAATTA / pxAste(2)), LAATTAKERROS_SILMAT_MAX);
  assert.equal(laattakerroksenSilmat(68), LAATTAKERROS_SILMAT_MAX);
  // Välissä tavoite on 0,25°:n silmä.
  assert.equal(laattakerroksenSilmat(10), 40);
  assert.equal(laattakerroksenSilmat(30), 120);
  assert.equal(laattakerroksenSilmat(-10), 40, 'suunta ei vaikuta');
});

test('LRU: näkyviä ei pureta koskaan, vanhin ensin, tavukatto purkaa lisää', () => {
  assert.equal(LAATTAKERROS_LAATTAKATTO_MUISTI, 24);
  assert.equal(LAATTAKERROS_LAATTAKATTO_TAVUT, 96 * 1048576);
  const tietue = (avain, nakyva, kaytetty, tavut = 1048576) => ({ avain, nakyva, kaytetty, tavut });
  // 30 näkymätöntä, katto 24 → kuusi vanhinta puretaan järjestyksessä.
  const monta = Array.from({ length: 30 }, (_, i) => tietue(`z/${i}`, false, i));
  assert.deepEqual(laattakerroksenLRU(monta, 24, LAATTAKERROS_LAATTAKATTO_TAVUT),
    ['z/0', 'z/1', 'z/2', 'z/3', 'z/4', 'z/5']);
  // Näkyvät eivät ole ehdokkaita, vaikka olisivat vanhimpia.
  const nakyvia = [
    tietue('nak/0', true, 0), tietue('nak/1', true, 1),
    ...Array.from({ length: 26 }, (_, i) => tietue(`pois/${i}`, false, 10 + i)),
  ];
  const ulos = laattakerroksenLRU(nakyvia, 24, LAATTAKERROS_LAATTAKATTO_TAVUT);
  assert.deepEqual(ulos, ['pois/0', 'pois/1']);
  assert.ok(!ulos.some((a) => a.startsWith('nak/')), 'näkyvä ei saa koskaan purkautua');
  // Tavukatto purkaa lisää, vaikka määrä mahtuisi kattoon.
  const isot = [
    ...Array.from({ length: 10 }, (_, i) => tietue(`nak/${i}`, true, i, 8 * 1048576)),
    ...Array.from({ length: 6 }, (_, i) => tietue(`vanha/${i}`, false, 100 + i, 8 * 1048576)),
  ];
  const tavuille = laattakerroksenLRU(isot, 24, 100 * 1048576);
  assert.deepEqual(tavuille, ['vanha/0', 'vanha/1', 'vanha/2', 'vanha/3'],
    '128 Mt → 96 Mt neljällä purulla, vanhin ensin');
  // Pelkät näkyvät: tavukatto ei voi purkaa mitään (kerros ei jätä reikiä).
  assert.deepEqual(laattakerroksenLRU(isot.slice(0, 10), 0, 1), []);
  assert.deepEqual(laattakerroksenLRU([], 24), []);
});

test('laatanKartta: yksi laatta on oma karttansa, UV juoksee 0…1 sen sisällä', () => {
  const taso = TASOT[7];
  const asetukset = { laatta: LAATTA, arkki: ARKKI, projektio: PROJEKTIO, laudanY };
  const kartta = laatanKartta(taso, 3, 4, asetukset);
  assert.equal(kartta.kansX0, 3 * LAATTA);
  assert.equal(kartta.kansY0, 4 * LAATTA);
  assert.equal(kartta.leveys, LAATTA);
  assert.equal(kartta.korkeus, LAATTA);
  assert.deepEqual(kartta.laatat, [{ sarake: 3, rivi: 4, x: 0, y: 0, w: LAATTA, h: LAATTA }]);
  // Laatan omat kulmat asteina → UV 0…1 (lepokerroksenUV samalla kaavalla).
  const ppu = taso.pikseliaPerYksikko;
  const lonPx = (px) => ((px / ppu + ARKKI.x) / PROJEKTIO.leveys) * 360 + PROJEKTIO.lon0;
  const lonA = lonPx(kartta.kansX0);
  const lonB = lonPx(kartta.kansX0 + kartta.leveys);
  assert.ok(Math.abs(lepokerroksenUV(kartta, lonA, 40).u) < 1e-9);
  assert.ok(Math.abs(lepokerroksenUV(kartta, lonB, 40).u - 1) < 1e-9);
  // Vajaa viimeinen sarake ja rivi luetaan tason pikseleistä.
  const viimeinen = laatanKartta(taso, taso.sarakkeita - 1, taso.riveja - 1, asetukset);
  assert.equal(viimeinen.leveys, taso.leveys - (taso.sarakkeita - 1) * LAATTA);
  assert.equal(viimeinen.korkeus, taso.korkeus - (taso.riveja - 1) * LAATTA);
  // Ruudukon ulkopuoli on null (kerros ei pyydä olematonta laattaa).
  assert.equal(laatanKartta(taso, taso.sarakkeita, 0, asetukset), null);
  assert.equal(laatanKartta(taso, 0, -1, asetukset), null);
  assert.equal(laatanKartta(null, 0, 0, asetukset), null);
});

test('vakiot: renderOrder karkeista hienoihin, syvyyssiirto laattojen edelle, kiintiöt', () => {
  // Kerros piirtyy läpinäkyvien ensimmäisenä ja karkeat tasot ennen hienoja.
  assert.equal(LAATTAKERROS_RENDER_ORDER_POHJA, -10);
  for (let z = 0; z <= 7; z += 1) {
    assert.ok(LAATTAKERROS_RENDER_ORDER_POHJA + z < 0, `taso ${z} ennen pelin merkkejä`);
    if (z > 0) {
      assert.ok(LAATTAKERROS_RENDER_ORDER_POHJA + z > LAATTAKERROS_RENDER_ORDER_POHJA + z - 1);
    }
  }
  // Syvyyssiirto on lepokerroksen (mitattu tests/pallolepokerros.test.mjs:ssä).
  assert.equal(LAATTAKERROS_SYVYYSSIIRTO, -8);
  assert.equal(LAATTAKERROS_LAATTAKATTO_NAKYVA, 48);
  assert.equal(LAATTAKERROS_RINNAKKAIN, 6);
  assert.equal(LAATTAKERROS_TEKSTUUREJA_PER_KEHYS, 2);
  assert.equal(LAATTAKERROS_NAYTTEITA, 9);
  assert.equal(LAATTAKERROS_HAIVE_MS, 260);
  assert.equal(LAATTAKERROS_PAIVITYSVALI_LIIKE_MS, 100);
  assert.equal(LAATTAKERROS_VARA_AST, 0.5);
  assert.equal(LAATTAKERROS_VARA_OSUUS, 0.03);
  assert.equal(LAATTAKERROS_OLETUS, true, 'kerros on oletuksena päällä (E1)');
  // Muistiarvio: 48 näkyvää + 24 LRU × 512² RGBA + mipmapit mahtuu kiintiöön.
  const laatanTavut = 512 * 512 * 4 * (4 / 3);
  assert.ok((LAATTAKERROS_LAATTAKATTO_NAKYVA + LAATTAKERROS_LAATTAKATTO_MUISTI) * laatanTavut
    <= LAATTAKERROS_LAATTAKATTO_TAVUT, 'täysi kiintiö mahtuu tavukattoon');
});

test('vipu: ?laattakerros=0 sammuttaa kerroksen, muuten oletus', () => {
  const win = (haku) => ({ location: { search: haku } });
  assert.equal(laattakerrosOsoitteesta(win('')), null);
  assert.equal(laattakerrosPaalla(win(''), LAATTAKERROS_OLETUS), true);
  assert.equal(laattakerrosPaalla(win('?laattakerros=0'), LAATTAKERROS_OLETUS), false);
  assert.equal(laattakerrosPaalla(win('?laattakerros=ei'), LAATTAKERROS_OLETUS), false);
  assert.equal(laattakerrosPaalla(win('?laattakerros=1'), LAATTAKERROS_OLETUS), true);
  assert.equal(laattakerrosPaalla({}, LAATTAKERROS_OLETUS), true, 'ikkunaton ympäristö ei kaadu');
  assert.equal(laattakerrosPaalla(win(''), false), false, 'oletus tulee kutsujalta');
});

test('kytkentä: pohja naulataan tasoon 5 vain kerroksen ollessa päällä', () => {
  const pallo = lue('../js/pallo.js');
  assert.equal(POHJAN_TASO_MAX, 5);
  // Kirjaston moottori jää karkeaksi pohjaksi VAIN kerroksen kanssa;
  // ilman kerrosta katto on luettelon oma syvin taso kuten v1645:ssä.
  assert.match(pallo, /globeTileEngineMaxLevel\(\n\s*laattakerrosPaalla\(globalThis, LAATTAKERROS_OLETUS\) \? Math\.min\(syvin, POHJAN_TASO_MAX\) : syvin,\n\s*\)/);
  // asetaTila ei kosketa kynnyksiin eikä pikselisuhteeseen kerroksen kanssa.
  assert.match(pallo, /const asetaTila = \(lepoon\) => \{\n\s*lepo = lepoon;\n(?:\s*\/\/[^\n]*\n)*\s*if \(kerros\) return;/);
  assert.match(pallo, /const suhde = Math\.min\(dpr, LAATU_PIKSELISUHDE_LEPO\);\n\s*if \(renderer\.getPixelRatio\?\.\(\) !== suhde\) renderer\.setPixelRatio\(suhde\);/,
    'pikselisuhde kerran asennuksessa');
  // Lepokerrosta ei luoda kerroksen kanssa (vanha polku vain ?laattakerros=0).
  assert.match(pallo, /const lepokerros = kerros \? null : luoLepokerros\(\{/);
  /*
   * VIKA v1649 (omistaja: *"panoroidessa tuli vähän kuin kaksi karttaa
   * hieman limittäin"*, oire vain raahauksen aikana): kerros EI enää
   * päivity updatePov-koukusta, joka ajetaan pointermoven sisältä, vaan
   * piirtokoukusta — samalla kameralla ja samasta kehyksestä kuin
   * vektorikerros. Levon ajastin päivittää sen harventamattomasti samoilla
   * kehysmitoilla.
   */
  assert.ok(!/kerros\.paivita\(kam, true\)/.test(pallo), 'kerros ei saa päivittyä updatePovista');
  assert.match(pallo, /const kehyspurku = kerros\n\s*\? kytkePallonKehys\(pallo, kotelo, \(kehys\) => \{ kerros\.paivita\(kehys, true\); \}, ikkuna\)\n\s*: \(\) => \{\};/);
  assert.match(pallo, /if \(kerros\) kerros\.paivita\(pallonKehysmitat\(pallo, kotelo, kamera, ikkuna\), false\);\n\s*else lepokerros\.levossa\(\);/);
  assert.match(pallo, /laatuKuuntelijat\.delete\(pakotus\);\n\s*kehyspurku\(\);/, 'koukku puretaan');
  // Kahva on sama accessorille ja savukkeille; purku purkaa kerroksen.
  assert.match(pallo, /if \(kerros\) lepokerrokset\.set\(pallo, kerros\);/);
  assert.match(pallo, /if \(kerros\) \{ kerros\.pura\(\); lepokerrokset\.delete\(pallo\); \}/);
  assert.match(lue('../js/pallolauta/lauta.js'), /lepokerros: \(\) => pallonLepokerros\(pallo\),/);
});

test('kerros: laatan materiaali, verkko ja osoitteet ovat suunnitelman mukaiset', () => {
  const laatat = lue('../js/pallolaatat.js');
  // Materiaali ja syvyysjärjestys kuten lepokerroksella (ks. PIIRTOJÄRJESTYS).
  assert.match(laatat, /map: tekstuuri, transparent: true, opacity: 0, depthWrite: true,\n\s*polygonOffset: true, polygonOffsetFactor: 0, polygonOffsetUnits: LAATTAKERROS_SYVYYSSIIRTO,/);
  assert.match(laatat, /verkko\.renderOrder = LAATTAKERROS_RENDER_ORDER_POHJA \+ t\.z;/);
  assert.match(laatat, /verkko\.raycast = \(\) => \{\};/, 'kerros ei ota napautuksia');
  assert.match(laatat, /verkko\.userData\.laattakerros = \{ z: t\.z, sarake: t\.sarake, rivi: t\.rivi \};/);
  // Kerros on täsmälleen pinnan säteellä: ei suurennosta, ei hyppyä.
  assert.match(laatat, /pallo\.getGlobeRadius\(\) \* LEPOKERROS_KOROTUS/);
  // Kuvat bittikarttana, vara Image + decode; kangas OffscreenCanvas jos on.
  assert.match(laatat, /ikkuna\.createImageBitmap\(await vastaus\.blob\(\)\)/);
  assert.match(laatat, /kuva\.decode \? kuva\.decode\(\)/);
  assert.match(laatat, /new ikkuna\.OffscreenCanvas\(w, h\)/);
  // Tekstuuri viedään näytönohjaimelle jonosta, enintään kaksi kehyksessä.
  assert.match(laatat, /while \(vientijono\.length && n < LAATTAKERROS_TEKSTUUREJA_PER_KEHYS\)/);
  assert.match(laatat, /renderer\?\.initTexture\?\.\(t\.tekstuuri\);/);
  // Ulos-häive VAIN karkeamman valmiin peiton päältä (v1641:n oppi).
  assert.match(laatat, /if \(!karkeampiValmis\(t, valittu, valmiit\)\) continue;\n\s*t\.haipyy = true;/);
  assert.ok(!/LEPOKERROS_KOROTUS \* 1\.00/.test(laatat), 'ei sädekorotusta');
  // Osoitteet ja luettelo VAIN tasokartan moduulista — ei omaa kaavaa.
  assert.match(laatat, /import \{\n\s*haePyramidinLuettelo, pyramidinKerrostasot, pyramidinLaattaOlemassa, pyramidinLaattaUrl,\n\} from '\.\/laattapyramidi\.js';/);
  assert.ok(!/julisteet\/pyramidi/.test(laatat), 'kerros ei rakenna pyramidin polkua itse');
  // Moduuli ei tuo js/pallo.js:ää: kirjaston luokat tulevat parametreina.
  assert.ok(!/from '\.\/pallo\.js'/.test(laatat), 'tuonti pallo.js:stä tekisi kehän');
  assert.match(laatat, /kolmiulotteinen, pallonSarja = \(\) => null, lauta = 'maailmankartta', naparaja = 90,/);
});

/*
 * ======== VIKA v1649: KAKSI KARTTAA LIMITTÄIN RAAHATESSA ===========
 *
 * Omistaja 6.9.2026 ilta (iPad-sovellus, sanatarkasti): *"Kartta alkoi
 * täristämään. Eli panoroidessa tuli vähän kuin kaksi karttaa hieman
 * limittäin. Välillä kartta saattaa myös heittää ihan eri paikkaan
 * mutta harvemmin"* — ja lisähavainto: limitys ei näy levossa, ja
 * tärinä loppuu heti kun sormi irtoaa.
 *
 * Kaksi juurisyytä, molemmat mitattu 6.9.2026 Playwrightilla
 * (puhelin 390 × 844 dpr 3, Ateena korkeus 0,35, 124 px/aste):
 *
 *  1. SORMEN TARTUNTAPISTE tuli kirjaston `toGlobeCoords`ista, joka
 *     säteenjäljittää kirjaston omaan palloon — 72 × 36 -jaettuun
 *     monitahokkaaseen (globeCurvatureResolution 5°). Jänne painuu
 *     pinnan alle, ja osuma eroaa oikeasta pinnasta mediaanilla 1,41 ja
 *     enimmillään 3,23 LAITEPIKSELIÄ (196 näytettä ruudulta). Sormiveto
 *     syöttää eron suoraan kameraan joka pointermovessa, ja liu'ussa
 *     (irrotuksen jälkeen) pintaa ei lueta lainkaan — siksi oire loppuu
 *     täsmälleen sormen irrotessa. Korjaus: sama tarkka
 *     säde–pallo-leikkaus (pinnanPiste) kuin vektorikerroksella.
 *
 *  2. KAKSI KERROSTA LUKI KAMERAN ERI LÄHTEESTÄ JA ERI HETKENÄ:
 *     laattakerros kirjaston updatePov-koukusta (= pointermoven
 *     sisältä) ja vektorikerros ohjainten change-tapahtumasta oman
 *     60 ms:n ajastimensa kautta; kumpikin mittasi ruudun kotelon
 *     CSS-laatikosta eikä siitä, mitä piirtopuskuriin piirretään.
 *     Korjaus: molemmat ilmoittautuvat samaan piirtokoukkuun
 *     (kytkePallonKehys), joka antaa saman kehysmitta-olion.
 */

test('vika v1649: sormen tartuntapiste lasketaan, ei säteenjäljitetä', () => {
  const pallo = lue('../js/pallo.js');
  const laatat = lue('../js/pallolaatat.js');
  // Yksi pinnanlukija koko pallolle: pinnanPiste asuu pallolaatat.js:ssä.
  assert.match(laatat, /export function pinnanPiste\(kamera, x, y, W, H, R\) \{/);
  assert.match(pallo, /lepokerroksenVerkko, luoLepokerroksenAjoitus, pallonPiste, pinnanPiste,/);
  // Sormiveto lukee pinnan siitä, ei kirjaston säteenjäljityksestä.
  assert.match(pallo, /const sormenKohta = \(e\) => \{\n\s*const r = kotelo\.getBoundingClientRect\(\);\n\s*return pinnanPiste\(pallo\.camera\(\), e\.clientX - r\.left, e\.clientY - r\.top,\n\s*kotelo\.clientWidth, kotelo\.clientHeight, pallo\.getGlobeRadius\(\)\);\n\s*\};/);
  assert.ok(!/return pallo\.toGlobeCoords\(e\.clientX/.test(pallo),
    'tartuntapiste ei saa tulla säteenjäljityksestä (jänne painuu 1,4–3,2 px)');
  // Vektorikerros ei enää pidä omaa kappalettaan samasta kaavasta.
  const vektorit = lue('../js/pallovektorit.js');
  assert.ok(!/export function pinnanPiste\(/.test(vektorit), 'kaksi kappaletta samaa leikkausta');
  assert.match(vektorit, /export \{ pinnanPiste \};/, 'vienti jatkuu vanhassa osoitteessa');
});

test('vika v1649: molemmat kerrokset lukevat koon ja pov:n samasta kehyksestä', () => {
  const pallo = lue('../js/pallo.js');
  const laatat = lue('../js/pallolaatat.js');
  const vektorit = lue('../js/pallovektorit.js');
  // Koukku on scene.onBeforeRender: kerran per piirretty kehys, sillä
  // kameralla, jolla kuva piirretään.
  assert.match(pallo, /scene\.onBeforeRender = function pallonKehyskoukku\(renderer, kohde, kamera, \.\.\.loput\)/);
  assert.match(pallo, /export function kytkePallonKehys\(pallo, kotelo, kuuntelija, ikkuna = globalThis\)/);
  // Ruudun koko RENDERÖIJÄLTÄ (piirretty koko), kotelo vain varana.
  assert.match(pallo, /renderer\.getSize\(\{ set\(a, b\) \{ W = a; H = b; \} \}\)/);
  // Kumpikin kerros ilmoittautuu koukkuun eikä kuuntele tapahtumia.
  assert.match(vektorit, /kehyspurku = kytkePallonKehys\(pallo, kotelo, kehyksessa, ikkuna\);/);
  assert.ok(!/addEventListener\?\.\('change', pyyda\)/.test(vektorit), 'vektorit eivät kuuntele ohjaimia');
  assert.ok(!/function pyyda\(\)/.test(vektorit), 'oma ajastin poistui');
  // Kerrokset käyttävät kehysmittoja eivätkä mittaa koteloa itse.
  assert.match(laatat, /const mitat = kehysmitat\(kehys\);\n\s*const W = mitat\.W;\n\s*const H = mitat\.H;/);
  assert.match(vektorit, /const kamera = kehysmitat\?\.kamera \?\? pallo\.camera\?\.\(\);\n\s*const \{ W, H \} = ruutu\(\);/);
});

test('vika v1649: kehysmitat ovat yksi olio ja samat molemmille kuuntelijoille', async () => {
  const { kytkePallonKehys, pallonKehysmitat } = await import('../js/pallo.js');
  // Kirjaston korvike: scene, kamera ja renderöijä sen verran kuin koukku lukee.
  const kamera = { aspect: 0.5, fov: 50, position: { x: 0, y: 0, z: 135 } };
  const scene = {};
  const pallo = {
    scene: () => scene,
    camera: () => kamera,
    renderer: () => ({ getSize: (t) => t.set(374, 771), getPixelRatio: () => 3 }),
    pointOfView: () => ({ lat: 38, lng: 23.7, altitude: 0.35 }),
    getGlobeRadius: () => 100,
  };
  const kotelo = { clientWidth: 999, clientHeight: 999 };
  const saadut = [[], []];
  const purku0 = kytkePallonKehys(pallo, kotelo, (k) => saadut[0].push(k), globalThis);
  const purku1 = kytkePallonKehys(pallo, kotelo, (k) => saadut[1].push(k), globalThis);
  scene.onBeforeRender({}, scene, kamera, null);
  assert.equal(saadut[0].length, 1);
  assert.equal(saadut[1].length, 1);
  assert.equal(saadut[0][0], saadut[1][0], 'sama olio molemmille — sama kehys, sama mitta');
  assert.equal(saadut[0][0].W, 374, 'koko renderöijältä, ei kotelon 999:stä');
  assert.equal(saadut[0][0].H, 771);
  assert.equal(saadut[0][0].suhde, 3);
  assert.equal(saadut[0][0].kamera, kamera, 'kamera on se, jolla piirretään');
  assert.equal(saadut[0][0].pov.lat, 38);
  assert.equal(saadut[0][0].kehys, 1);
  scene.onBeforeRender({}, scene, kamera, null);
  assert.equal(saadut[0][1].kehys, 2, 'kehyslaskuri juoksee');
  // Purku palauttaa scenen oman koukun vasta viimeisen kuuntelijan jälkeen.
  purku0();
  scene.onBeforeRender({}, scene, kamera, null);
  assert.equal(saadut[0].length, 2, 'purettu kuuntelija ei enää saa kehyksiä');
  assert.equal(saadut[1].length, 3);
  purku1();
  assert.equal(scene.onBeforeRender, undefined, 'viimeinen purku palauttaa scenen ennalleen');
  // Ilman renderöijää mitat tulevat kotelosta (yksikkötestit, savukkeet).
  const ilman = pallonKehysmitat({ ...pallo, renderer: () => null }, kotelo, kamera, globalThis);
  assert.equal(ilman.W, 999);
  assert.equal(ilman.kuvasuhde, 0.5, 'kuvasuhde kameralta');
});
