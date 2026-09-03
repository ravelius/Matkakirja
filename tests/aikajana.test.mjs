/*
 * AIKAJANAMOOTTORI JA KEKSINTÖLINSSI.
 *
 * Kaksi asiaa, jotka rikkoutuvat hiljaa: tahti (kello ei pysähdy
 * tapahtumaan tai hyppää sen yli) ja data (paikka väärässä maassa,
 * kuvatiedosto kirjoitettu väärin). Moottorin askel on DOM:iton
 * funktio, joten se ajetaan tässä sellaisenaan; datan laudan
 * koordinaatit tarkistetaan pelin omalla projektiolla.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  aikajanaAskel, asetaMatkamittari, rajaaPaneelinSiirto, PANEELIN_RAAHAUSKYNNYS,
  rajaaPaneelinKoko, PANEELIN_KOKO_MIN, PANEELIN_KOKO_MAX,
  AIKAJANA_TAUON_OSUUS, VUOSI_RULLAUS_MS, AIKAJANA_NAKSU_VALI_MS,
  AIKAJANA_VIIVE_MS, AIKAJANA_PAALU_MS, AIKAJANA_TAUKO_HIMMENNYS, AIKAJANA_VUOSI_MS,
  aikajananNopeus, AIKAJANA_POHJANOPEUS, AIKAJANA_KIIHTYMISMATKA, AIKAJANA_ALIASKEL_MS,
  pieniOsoite, PIENEN_KATTO, karusellinPaikat, karusellinMitta, KARUSELLIN_MITAT,
  karuselliOsoite, sumeaOsoite, KARUSELLIN_KATTO,
} from '../js/aikajana.js';
import { runkoOsoitteesta } from '../tools/tee-pienet-kuvat.mjs';
import { KEKSINNOT, KEKSINTO_KUVAJUURI, LINSSI } from '../js/linssit/keksinnot.js';
import { projisoiLaudalle } from '../js/fokusmitat.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { LINSSIT } from '../js/linssit/rekisteri.js';
import { tarkistaLinssi } from '../js/linssit/kerros.js';

// Moottorin lähde tekstinä: kytkennät, joita puhdas funktio ei näytä.
const MOOTTORI = readFileSync(new URL('../js/aikajana.js', import.meta.url), 'utf8');
const TIEDELIITE = readFileSync(new URL('../js/tiedeliite.js', import.meta.url), 'utf8');
const TAPAHTUMAT = [{ vuosi: 1770 }, { vuosi: 1773, paalu: true }, { vuosi: 1780 }];
const TAHTI = { vuosiMs: 100, viiveMs: 500, paaluMs: 200 };
/* Reduced motion ajaa saman tahdin ilman nopeusprofiilia. */
const LINEAARINEN = { ...TAHTI, lineaarinen: true };

/** Ajaa kelloa tasaisin askelin, kunnes tapahtuma syttyy tai kaari loppuu. */
function ajaKunnesSyttyy(alku, tapahtumat, tahti = TAHTI, askel = 16) {
  let tila = alku;
  for (let t = 0; t < 400000; t += askel) {
    const tulos = aikajanaAskel(tila, askel, tapahtumat, tahti);
    tila = tulos.tila;
    if (tulos.syttyi !== null || tulos.loppu) {
      return { kesto: t + askel, tila, syttyi: tulos.syttyi, loppu: tulos.loppu };
    }
  }
  throw new Error('kello ei saapunut pysäkille');
}

/**
 * Ajaa yhden välin pysäkiltä pysäkille ja palauttaa keston sekä
 * nopeusotoksen (nopeus osuutena matkanopeudesta). Lähtökohta on
 * tauon hiipimän jälkeinen kohta, kuten oikeassa ajossa.
 */
function ajaVali(alkuVuosi, loppuVuosi, askel = 16, tahti = {}) {
  const tapahtumat = [{ vuosi: alkuVuosi }, { vuosi: loppuVuosi }];
  const lahto = alkuVuosi + AIKAJANA_TAUON_OSUUS;
  const vuosiMs = tahti.vuosiMs ?? AIKAJANA_VUOSI_MS;
  let tila = { vuosi: lahto, i: 0, viive: 0, alku: lahto };
  const otos = [];
  for (let t = 0; t < 1000000; t += askel) {
    const tulos = aikajanaAskel(tila, askel, tapahtumat, tahti);
    if (tulos.syttyi !== null) return { kesto: t + askel, otos };
    otos.push({ vuosi: tila.vuosi, nopeus: ((tulos.tila.vuosi - tila.vuosi) / askel) * vuosiMs });
    tila = tulos.tila;
  }
  throw new Error('väli ei päättynyt');
}

test('kello juoksee tyhjät vuodet ja pysähtyy tapahtumaan', () => {
  // Lineaarinen tahti (reduced motion): matka on suoraan dt / vuosiMs.
  let askel = aikajanaAskel({ vuosi: 1765, i: -1, viive: 0 }, 250, TAPAHTUMAT, LINEAARINEN);
  assert.equal(askel.syttyi, null);
  assert.ok(Math.abs(askel.tila.vuosi - 1767.5) < 1e-9);
  askel = aikajanaAskel(askel.tila, 400, TAPAHTUMAT, LINEAARINEN);
  assert.equal(askel.syttyi, 0, 'ensimmäinen tapahtuma syttyy kun vuosi ylittyy');
  assert.equal(askel.tila.vuosi, 1770, 'kello napsahtaa tapahtuman vuoteen, ei sen yli');
  assert.equal(askel.tila.viive, 500);

  // Nopeusprofiililla sama matka kestää kauemmin mutta päättyy samaan
  // vuoteen: kiihdytys ja jarrutus eivät saa hukata tai ylittää pysäkkiä.
  const ajo = ajaKunnesSyttyy({ vuosi: 1765, i: -1, viive: 0 }, TAPAHTUMAT);
  assert.equal(ajo.syttyi, 0);
  assert.equal(ajo.tila.vuosi, 1770);
  assert.equal(ajo.tila.viive, 500);
  assert.ok(ajo.kesto > 5 * 100, 'profiili on hitaampi kuin vakiovauhti');
});

test('viive kuluu ennen kuin kello jatkaa; tauolla mittari hiipii; merkkipaalu on lyhyempi', () => {
  let tila = { vuosi: 1770, i: 0, viive: 500, viiveTaysi: 500 };
  let askel = aikajanaAskel(tila, 300, TAPAHTUMAT, TAHTI);
  // Omistaja 3.9.2026: kello ei seiso tauollakaan — ykkösrulla hiipii
  // AIKAJANA_TAUON_OSUUS:n verran koko tauon aikana.
  assert.ok(Math.abs(askel.tila.vuosi - (1770 + AIKAJANA_TAUON_OSUUS * 0.6)) < 1e-9, 'tauolla mittari hiipii');
  assert.equal(Math.floor(askel.tila.vuosi), 1770, 'vuosi ei vaihdu tauolla');
  assert.equal(askel.tila.viive, 200);
  askel = aikajanaAskel(askel.tila, 300, TAPAHTUMAT, TAHTI);
  assert.equal(askel.tila.viive, 0);
  assert.ok(Math.abs(askel.tila.vuosi - (1770 + AIKAJANA_TAUON_OSUUS)) < 1e-9, 'tauon lopussa koko hiipimä');
  assert.ok(Math.abs(askel.tila.alku - askel.tila.vuosi) < 1e-9,
    'liike lähtee siitä, mihin hiipimä ehti — kiihdytys jatkaa siitä');
  const ajo = ajaKunnesSyttyy(askel.tila, TAPAHTUMAT);
  assert.equal(ajo.syttyi, 1, 'paalu syttyy vuonna 1773');
  assert.equal(ajo.tila.viive, 200, 'paalun viive');
  assert.equal(ajo.tila.viiveTaysi, 200);
});

test('hiipimä on alle kokonaisen vuoden ja saman vuoden ketju ei peruuta mittaria', () => {
  assert.ok(AIKAJANA_TAUON_OSUUS > 0 && AIKAJANA_TAUON_OSUUS < 1);
  const ketju = [{ vuosi: 1895 }, { vuosi: 1895 }];
  const askel = aikajanaAskel({ vuosi: 1895 + AIKAJANA_TAUON_OSUUS, i: 0, viive: 10, viiveTaysi: 500 }, 10, ketju, TAHTI);
  assert.equal(askel.syttyi, 1);
  assert.ok(askel.tila.vuosi >= 1895 + AIKAJANA_TAUON_OSUUS - 1e-9, 'mittari ei palaa taaksepäin');
  // Vanha tila ilman viiveTaysi-kenttää toimii (viive = koko tauko).
  const vanha = aikajanaAskel({ vuosi: 1770, i: 0, viive: 500 }, 250, TAPAHTUMAT, TAHTI);
  assert.ok(Math.abs(vanha.tila.vuosi - (1770 + AIKAJANA_TAUON_OSUUS * 0.5)) < 1e-9);
});

test('viimeisen tapahtuman jälkeen askel ilmoittaa lopun', () => {
  let tila = { vuosi: 1780, i: 2, viive: 500 };
  let askel = aikajanaAskel(tila, 600, TAPAHTUMAT, TAHTI);
  assert.equal(askel.loppu, true);
  askel = aikajanaAskel({ vuosi: 1780, i: 2, viive: 0 }, 100, TAPAHTUMAT, TAHTI);
  assert.equal(askel.loppu, true);
});

/* ==================== PEHMEÄ KIIHDYTYS JA JARRUTUS ==================== */

/*
 * Omistaja 3.9.2026: *"vuosinumerot juoksevat nyt mutta niihin pitäisi
 * tehdä pehmeät kiihdytykset ja jarrutukset (logaritminen)."* Tässä
 * mitataan se, mikä rikkoutuisi hiljaa: että liike ei pysähdy, että
 * kiihdytys ja jarrutus todella näkyvät nopeudessa, ettei kaari veny
 * kohtuuttomasti ja ettei tulos riipu kehysvälistä.
 */

test('nopeusprofiili: nopeus pysyy nollan yläpuolella eikä mittari peruuta', () => {
  for (const d of [-1, 0, 0.001, 0.3, 1, 1.5, 5, 100]) {
    const v = aikajananNopeus(d);
    assert.ok(v > 0, `nopeus on aina yli nollan (etäisyys ${d})`);
    assert.ok(v >= AIKAJANA_POHJANOPEUS && v <= 1, `nopeus pysyy rajoissa (etäisyys ${d})`);
  }
  assert.equal(aikajananNopeus(AIKAJANA_KIIHTYMISMATKA), 1, 'täysi vauhti kiihtymismatkan päässä');
  let edellinen = 0;
  for (let d = 0; d <= 3; d += 0.05) {
    const v = aikajananNopeus(d);
    assert.ok(v >= edellinen - 1e-12, 'käyrä kasvaa monotonisesti');
    edellinen = v;
  }
  // Koko kaari läpi: vuosi ei mene taaksepäin missään vaiheessa.
  let tila = { vuosi: 1765, i: -1, viive: 0 };
  let vuosi = tila.vuosi;
  let n = 0;
  for (; n < 50000; n += 1) {
    const askel = aikajanaAskel(tila, 16, TAPAHTUMAT, TAHTI);
    assert.ok(askel.tila.vuosi >= vuosi - 1e-12, 'mittari ei peruuta');
    vuosi = askel.tila.vuosi;
    tila = askel.tila;
    if (askel.loppu) break;
  }
  assert.ok(n < 50000 && vuosi >= 1780, 'kaari ajautuu loppuun asti');
});

test('nopeusprofiili: lähtö on hiipimisvauhtia, keskiväli täyttä vauhtia, tulo hidasta', () => {
  const hiipiminen = (AIKAJANA_TAUON_OSUUS * AIKAJANA_VUOSI_MS) / AIKAJANA_VIIVE_MS;
  assert.ok(Math.abs(AIKAJANA_POHJANOPEUS - hiipiminen) < 0.01,
    'pohjanopeus on hiipimisnopeuden luokkaa — ei nopeushyppyä tauon jälkeen');

  const { otos } = ajaVali(1783, 1796);
  const lahto = otos[0].nopeus;
  assert.ok(lahto < 1.6 * hiipiminen, `lähtönopeus ${lahto} on lähellä hiipimisnopeutta ${hiipiminen}`);
  const keski = otos.filter((o) => o.vuosi > 1788 && o.vuosi < 1791);
  const keskinopeus = keski.reduce((s, o) => s + o.nopeus, 0) / keski.length;
  assert.ok(keskinopeus > 0.98, `välin keskellä ajetaan täyttä vauhtia (${keskinopeus})`);
  assert.ok(keskinopeus > 10 * lahto, 'keskiväli on selvästi lähtöä nopeampi');
  // Viimeinen vuosi ennen pysäkkiä: jarrutus näkyy.
  const tulo = otos.filter((o) => o.vuosi > 1795);
  const suurinTulossa = Math.max(...tulo.map((o) => o.nopeus));
  assert.ok(suurinTulossa < keskinopeus, 'viimeisen vuoden aikana kello on hitaampi kuin keskellä');
  assert.ok(tulo[tulo.length - 1].nopeus < 1.6 * hiipiminen, 'saapuminen on hiipimisvauhtia');
  // Symmetria: yhden vuoden päässä kummastakin päästä sama nopeus.
  const lahin = (kohde) => otos.reduce((a, b) => (Math.abs(b.vuosi - kohde) < Math.abs(a.vuosi - kohde) ? b : a));
  const alkuPaa = lahin(1783 + AIKAJANA_TAUON_OSUUS + 1);
  const loppuPaa = lahin(1796 - 1);
  assert.ok(Math.abs(alkuPaa.nopeus - loppuPaa.nopeus) < 0.05,
    `kiihdytys ja jarrutus ovat sama käyrä (${alkuPaa.nopeus} vs ${loppuPaa.nopeus})`);
});

test('nopeusprofiili: pitkä väli ei veny eikä tulos riipu kehysvälistä', () => {
  const pitka = ajaVali(1783, 1796).kesto;
  assert.ok(pitka <= 1.6 * 13 * AIKAJANA_VUOSI_MS,
    `13 vuoden väli ${pitka} ms enintään 1,6× entisestä (${13 * AIKAJANA_VUOSI_MS} ms)`);
  const hyvinPitka = ajaVali(1800, 1840).kesto;
  assert.ok(hyvinPitka <= 1.3 * 40 * AIKAJANA_VUOSI_MS,
    `40 vuoden väli ${hyvinPitka} ms enintään 1,3× entisestä (${40 * AIKAJANA_VUOSI_MS} ms)`);
  // Kehysväli pilkotaan aliaskeliin, joten iso dt ei oikaise.
  assert.ok(AIKAJANA_ALIASKEL_MS > 0 && AIKAJANA_ALIASKEL_MS <= 16);
  const tihea = ajaVali(1783, 1796, 16).kesto;
  const harva = ajaVali(1783, 1796, 100).kesto;
  assert.ok(Math.abs(tihea - harva) / tihea < 0.05,
    `16 ms ja 100 ms askel päätyvät samaan (${tihea} vs ${harva})`);
  // Lyhyt väli ei ehdi täyteen vauhtiin — se on tarkoitus.
  const lyhyt = ajaVali(1885, 1886);
  assert.ok(Math.max(...lyhyt.otos.map((o) => o.nopeus)) < 0.9,
    'yhden vuoden välillä kello ei ehdi täyteen vauhtiin');
  // Reduced motion ohittaa profiilin kokonaan.
  const suora = ajaVali(1783, 1796, 16, { vuosiMs: 40, lineaarinen: true }).kesto;
  assert.ok(Math.abs(suora - 12.4 * 40) < 80, `lineaarinen tahti kulkee vakiovauhtia (${suora} ms)`);
});

test('oletustahti: tapahtuman viive on pidempi kuin paalun', () => {
  assert.ok(AIKAJANA_VIIVE_MS > AIKAJANA_PAALU_MS);
});

/* ==================== VUOSILUKU RULLAA ==================== */

/*
 * Vuosiluvun rullaus (omistajan tilaus 3.9.2026). Rulla on pelkkä
 * kahden rivin pari, joten DOM-tynkä riittää: tässä mitataan se, mikä
 * rikkoutuisi hiljaa — että luku jakautuu numeroittain ja että VAIN
 * muuttuneet numerot liikkuvat. Jos päivitys vaihtaisi kaikki neljä,
 * kello näyttäisi yhä oikein mutta vuosisata hyppisi joka vuosi.
 */
const tynkaRivi = () => ({ textContent: '', style: {} });
const tynkaRullat = () => [0, 1, 2, 3].map(() => ({
  vanha: tynkaRivi(), uusi: tynkaRivi(), merkki: null,
}));

test('matkamittari: ykkösrulla nousee murto-osan, ylemmät vasta ysin kohdalla', () => {
  const rullat = tynkaRullat();
  // Avaus: merkit paikoilleen ilman liikettä.
  const avaus = asetaMatkamittari(rullat, 1769, { heti: true });
  assert.equal(avaus.length, 4);
  assert.deepEqual(rullat.map((r) => r.vanha.textContent), ['1', '7', '6', '9']);
  assert.deepEqual(rullat.map((r) => r.uusi.textContent), ['2', '8', '7', '0'], 'seuraava numero odottaa alla');
  assert.equal(rullat[3].vanha.style.transform, 'translateY(0%)');
  assert.equal(rullat[3].uusi.style.transform, 'translateY(100%)');
  assert.equal(rullat[3].vanha.style.transition, 'none', 'avaus ei saa rullata');

  // 1769.25: ykkösrulla neljänneksen ylös, kymmenet myös (alempi on 9), sadat ja tuhannet eivät (7 ei ole 9).
  assert.equal(asetaMatkamittari(rullat, 1769.25).length, 0, 'numerot eivät vaihdu');
  assert.equal(rullat[3].vanha.style.transform, 'translateY(-25%)');
  assert.equal(rullat[3].uusi.style.transform, 'translateY(75%)');
  assert.equal(rullat[2].vanha.style.transform, 'translateY(-25%)', 'kymmenet liikkuvat, koska ykköset ovat 9:ssä');
  assert.equal(rullat[1].vanha.style.transform, 'translateY(0%)', 'sadat seisovat');
  assert.equal(rullat[0].vanha.style.transform, 'translateY(0%)');
  assert.equal(rullat[3].vanha.style.transition, 'none', 'käyvä kello ei käytä siirtymää');

  // 1770.0: kaksi rullaa vaihtoi numeron ja asettui paikalleen.
  const vaihto = asetaMatkamittari(rullat, 1770);
  assert.equal(vaihto.length, 2);
  assert.deepEqual(rullat.map((r) => r.merkki), ['1', '7', '7', '0']);
  assert.equal(rullat[3].vanha.style.transform, 'translateY(0%)');

  // 1770.5: vain ykkösrulla liikkuu.
  asetaMatkamittari(rullat, 1770.5);
  assert.equal(rullat[3].vanha.style.transform, 'translateY(-50%)');
  assert.equal(rullat[2].vanha.style.transform, 'translateY(0%)');

  // 1999.5 → tuhannetkin liikkuvat, koska kaikki alemmat ovat 9.
  asetaMatkamittari(rullat, 1999.5);
  assert.deepEqual(rullat.map((r) => r.vanha.style.transform), Array(4).fill('translateY(-50%)'));
  assert.equal(rullat[0].uusi.textContent, '2');
});

test('pysäytetyn kellon hyppy rullaa muuttuneet numerot yhdellä liikkeellä', () => {
  const rullat = tynkaRullat();
  asetaMatkamittari(rullat, 1770, { heti: true });
  const hyppy = asetaMatkamittari(rullat, 1928, { liuku: true });
  assert.equal(hyppy.length, 3, 'vain muuttuneet numerot liikkuvat');
  // Vanha merkki liukuu alas näkyvistä, uusi tulee ylhäältä tilalle.
  assert.equal(rullat[1].vanha.textContent, '7');
  assert.equal(rullat[1].uusi.textContent, '9');
  assert.equal(rullat[1].vanha.style.transform, 'translateY(100%)');
  assert.equal(rullat[1].uusi.style.transform, 'translateY(0%)');
  assert.equal(rullat[1].uusi.style.transition, `transform ${VUOSI_RULLAUS_MS}ms cubic-bezier(0.22, 0.9, 0.24, 1)`);
  // Vuosituhat ei liikahtanut.
  assert.equal(rullat[0].vanha.textContent, '1');
  assert.equal(rullat[0].vanha.style.transform, 'translateY(0%)');
  assert.equal(rullat[0].vanha.style.transition, 'none');
  // Sama vuosi uudelleen ei vaihda numeroita.
  assert.equal(asetaMatkamittari(rullat, 1928, { liuku: true }).length, 0);
  // Käyvä kello jatkaa hypyn jälkeen saumatta: nykyinen numero palaa vanha-riville.
  asetaMatkamittari(rullat, 1928.1);
  assert.equal(rullat[1].vanha.textContent, '9');
  assert.equal(rullat[1].vanha.style.transform, 'translateY(0%)');
  assert.equal(rullat[3].vanha.style.transform, 'translateY(-10%)');
});

test('paneelin koko nipistämällä: kerroin rajataan vakioväliin ja linssin leveyteen', () => {
  assert.ok(PANEELIN_KOKO_MIN < 1 && PANEELIN_KOKO_MAX > 1.5);
  assert.equal(rajaaPaneelinKoko(1), 1);
  assert.equal(rajaaPaneelinKoko(0.1), PANEELIN_KOKO_MIN);
  assert.equal(rajaaPaneelinKoko(9), PANEELIN_KOKO_MAX);
  assert.equal(rajaaPaneelinKoko(NaN), 1);
  // Paneeli 300 px kertoimella 1 → perusleveys 300; linssi 800 px → enintään (800-16)/300.
  assert.ok(Math.abs(rajaaPaneelinKoko(5, { leveys: 300, kokoNyt: 1, juuriLeveys: 500 }) - 484 / 300) < 1e-9);
  assert.equal(rajaaPaneelinKoko(1.5, { leveys: 300, kokoNyt: 1, juuriLeveys: 800 }), 1.5);
  assert.equal(rajaaPaneelinKoko(5, { leveys: 300, kokoNyt: 1, juuriLeveys: 5000 }), PANEELIN_KOKO_MAX);
  // Kytkentä: kaksi osoitinta nipistää, rulla mitoittaa, koko muistetaan laitteella.
  assert.match(MOOTTORI, /if \(sormet\.size >= 2\) \{ aloitaNipistys\(\); return; \}/);
  assert.match(MOOTTORI, /paneeli\.addEventListener\('wheel', \(e\) => \{\n\s*e\.preventDefault\(\);\n\s*e\.stopPropagation\(\);/);
  assert.match(MOOTTORI, /localStorage\?\.setItem\(PANEELIN_MUISTIAVAIN/);
  const CSS = readFileSync(new URL('../css/aikajana.css', import.meta.url), 'utf8');
  assert.match(CSS, /width: calc\(var\(--aikajana-paneeli-leveys\) \* var\(--aikajana-paneeli-koko, 1\)\)/);
  assert.match(CSS, /\.aikajana-ilmio\.nipistetaan \{ transition: none; \}/);
});

test('paneelin siirto rajataan linssin alueelle ja raahauskynnys erottaa napautuksen', () => {
  assert.ok(PANEELIN_RAAHAUSKYNNYS >= 4 && PANEELIN_RAAHAUSKYNNYS <= 12);
  const laatikko = (left, top, width, height) => ({ getBoundingClientRect: () => ({ left, top, width, height, right: left + width, bottom: top + height }) });
  const juuri = laatikko(0, 0, 1000, 600);
  // Paneeli oikeassa yläkulmassa (600..900 x 60..260), siirto nyt 0.
  const paneeli = laatikko(600, 60, 300, 200);
  const nolla = { dx: 0, dy: 0 };
  assert.deepEqual(rajaaPaneelinSiirto(paneeli, juuri, 50, 50, nolla), { dx: 50, dy: 50 });
  // Liian kauas oikealle/alas: pysähtyy reunan varaan (8 px).
  assert.deepEqual(rajaaPaneelinSiirto(paneeli, juuri, 500, 900, nolla), { dx: 92, dy: 332 });
  // Liian kauas vasemmalle/ylös.
  assert.deepEqual(rajaaPaneelinSiirto(paneeli, juuri, -900, -300, nolla), { dx: -592, dy: -52 });
  // Mitaton ympäristö (testitynkä) päästää siirron läpi.
  assert.deepEqual(rajaaPaneelinSiirto({}, {}, 3, 4, nolla), { dx: 3, dy: 4 });
});

/* ==================== PIENI KUVAVERSIO ==================== */

/*
 * Pieni WebP-versio (Raamattu, KEKSIJAT LINSSIN ALARIVILLA kohta 4).
 * Osoitesääntö on kahdessa paikassa — pelissä (pieniOsoite) ja
 * pienennystyökalussa (tools/tee-pienet-kuvat.mjs) — ja juuri se
 * rikkoutuisi hiljaa: peli pyytäisi osoitetta, jota ämpärissä ei ole,
 * ja varareitti näyttäisi ison kuvan ilman että kukaan huomaa.
 */

test('pieni versio menee saman kansion pieni/-alikansioon WebPinä', () => {
  assert.equal(
    pieniOsoite(`${KEKSINTO_KUVAJUURI}/1769-watt.jpg`),
    `${KEKSINTO_KUVAJUURI}/pieni/1769-watt.webp`,
  );
  assert.equal(
    pieniOsoite(`${KEKSINTO_KUVAJUURI}/muotokuva/1769-james-watt.jpg`),
    `${KEKSINTO_KUVAJUURI}/muotokuva/pieni/1769-james-watt.webp`,
  );
});

test('kelvoton syöte palautuu sellaisenaan eikä pieni kierry kahdesti', () => {
  for (const syote of ['', 'ei-url', 'aikajana/keksinnot/1769-watt.jpg',
    `${KEKSINTO_KUVAJUURI}/ilman-paatetta`, null, undefined, 42]) {
    assert.equal(pieniOsoite(syote), syote, `${syote}`);
  }
  // Jo pieni osoite ei saa saada toista pieni/-kerrosta.
  const pieni = `${KEKSINTO_KUVAJUURI}/pieni/1769-watt.webp`;
  assert.equal(pieniOsoite(pieni), pieni);
});

test('pieni osoite on sama kuin pienennystyökalun kirjoittama avain', () => {
  const osoitteet = KEKSINNOT.flatMap((t) => [t.kuva, t.kuvaToinen, t.ilmio, t.ilmioLisa])
    .filter((k) => k?.osoite).map((k) => k.osoite);
  assert.ok(osoitteet.length >= 50, `osoitteita vain ${osoitteet.length}`);
  for (const osoite of osoitteet) {
    const { runko, alikansio } = runkoOsoitteesta(osoite);
    const odotettu = `${KEKSINTO_KUVAJUURI}/${alikansio ? `${alikansio}/` : ''}pieni/${runko}.webp`;
    assert.equal(pieniOsoite(osoite), odotettu, osoite);
  }
});

test('moottori näyttää pienen version ja esilataa koko kaaren pienenä', () => {
  // Ilmiöpaneeli (640) ja kortin muotokuva (400) mahtuvat kattoon.
  assert.equal(PIENEN_KATTO, 640);
  assert.match(MOOTTORI, /if \(kuvatieto\.osoite\) asetaAmpariKuva\(kuva, kuvatieto\.osoite, leveys\);/);
  // Varareitti kerran, ei silmukkaa.
  assert.match(MOOTTORI, /function asetaAmpariKuva[\s\S]{0,1200}addEventListener\('error', \(\) => \{ kuva\.src = osoite; \}, \{ once: true \}\)/);
  // Esilataus: koko kaari pienenä heti käynnistyksessä, ei kolmen ikkunaa.
  assert.match(MOOTTORI, /kaynnista\(\) \{[\s\S]{0,200}this\.esilataaPienet\(\);/);
  assert.match(MOOTTORI, /esilataaPienet\(\) \{[\s\S]{0,400}for \(const t of this\.tapahtumat\)[\s\S]{0,300}pieniOsoite\(kuva\.osoite\)/);
  assert.ok(!/esilataaSeuraavat/.test(MOOTTORI), 'kolmen pysäkin ikkuna on korvattu');
  // "Lue juttu" avaa Tiedeliitteen, joka saa alkuperäiset kuvatiedot
  // (js/tiedeliite.js piirtää ne itse; pieni versio on vain moottorin).
  assert.match(MOOTTORI, /avaaJuttu\(t\) \{[\s\S]{0,300}avaaTiedeliite\(this\.ui, this\.tapahtumat, i, \{/);
  assert.ok(!/pieniOsoite/.test(TIEDELIITE), 'Tiedeliite ei pienennä kuvia');
});

/* ==================== KARUSELLI ==================== */

/*
 * Alarivi on karuselli (omistaja 3.9.2026). Laskenta rikkoutuisi
 * hiljaa: kortti liukuisi ruudun ulkopuolelle, keskikortti ei olisi
 * keskellä tai sumennus osuisi väärälle puolelle. LEVEYS on nauhan
 * leveys kortin leveyksinä — 1280 px:n ruudulla noin 9,7 ja 390 px:n
 * puhelimella noin 4.
 */
const LEVEA = 9.7;
const KAPEA = 4;

test('nykyinen kortti on aina keskellä ruutua täydessä mitassa', () => {
  for (const leveys of [LEVEA, KAPEA, 0.5]) {
    const k = karusellinPaikat(5, 5, leveys);
    assert.equal(k.paikka, 0, `leveys ${leveys}`);
    assert.equal(k.mitta, KARUSELLIN_MITAT[0]);
    assert.equal(k.luokka, 'nykyinen');
    assert.equal(k.sumennus, 0);
    assert.equal(k.himmeys, 1);
  }
});

test('menneet ovat vasemmalla ja tarkkoja, tulevat oikealla ja sumeita (omistaja 3.9.2026)', () => {
  const mennyt = karusellinPaikat(4, 5, LEVEA);
  const tuleva = karusellinPaikat(6, 5, LEVEA);
  assert.ok(mennyt.paikka < 0, 'mennyt kuuluu vasemmalle');
  assert.ok(tuleva.paikka > 0, 'tuleva kuuluu oikealle');
  assert.equal(mennyt.luokka, 'mennyt');
  assert.equal(tuleva.luokka, 'tuleva');
  assert.ok(tuleva.sumennus >= 1.5 && tuleva.sumennus <= 2, `sumennus ${tuleva.sumennus} px`);
  assert.equal(mennyt.sumennus, 0, 'jo nähtyjä ei sumenneta');
  // Sivut ovat symmetriset koon puolesta ja merkittävästi pienempiä.
  assert.equal(mennyt.mitta, tuleva.mitta);
  assert.ok(mennyt.mitta <= 0.7, `sivukortin mitta ${mennyt.mitta}`);
  assert.ok(mennyt.himmeys < 1 && tuleva.himmeys < 1, 'sivut ovat vaimeampia');
});

test('kortit pienenevät ja etääntyvät järjestyksessä keskeltä ulos', () => {
  let edellinen = karusellinPaikat(5, 5, LEVEA);
  for (let d = 1; d <= 6; d += 1) {
    const oikea = karusellinPaikat(5 + d, 5, LEVEA);
    const vasen = karusellinPaikat(5 - d, 5, LEVEA);
    assert.ok(oikea.paikka > edellinen.paikka, `d=${d}: etäisyys ei kasva`);
    assert.ok(oikea.mitta <= edellinen.mitta, `d=${d}: mitta ei pienene`);
    assert.ok(Math.abs(vasen.paikka + oikea.paikka) < 1e-9, `d=${d}: puolet eivät ole peilikuvia`);
    assert.equal(vasen.mitta, oikea.mitta);
    // Kortit eivät saa mennä päällekkäin: väli on vähintään mittojen keskiarvo.
    assert.ok(oikea.paikka - edellinen.paikka >= (oikea.mitta + edellinen.mitta) / 2 - 1e-9,
      `d=${d}: kortit menisivät päällekkäin`);
    edellinen = oikea;
  }
  assert.equal(karusellinMitta(9), KARUSELLIN_MITAT.at(-1), 'kauimmaiset eivät enää kutistu');
});

test('reunan taakse jäävä kortti on piilossa, ja kapea ruutu näyttää vähemmän', () => {
  const nakyvat = (leveys) => {
    let n = 0;
    for (let i = 0; i < 26; i += 1) if (karusellinPaikat(i, 12, leveys).luokka !== 'piilossa') n += 1;
    return n;
  };
  const levealla = nakyvat(LEVEA);
  const kapealla = nakyvat(KAPEA);
  assert.ok(levealla >= 9, `leveällä ruudulla näkyi vain ${levealla} korttia`);
  assert.ok(kapealla >= 3 && kapealla <= 7, `kapealla ruudulla näkyi ${kapealla} korttia`);
  assert.ok(kapealla < levealla, 'kapea ruutu ei näytä yhtä montaa');
  // Piilossa oleva kortti ei ole napautettava eikä näy.
  const piilossa = karusellinPaikat(25, 12, KAPEA);
  assert.equal(piilossa.luokka, 'piilossa');
  assert.equal(piilossa.himmeys, 0);
  // Nykyinen näkyy vaikka ruutu olisi korttia kapeampi.
  assert.equal(karusellinPaikat(12, 12, 0.4).luokka, 'nykyinen');
});

test('lähempi kortti peittää kauemman', () => {
  assert.ok(karusellinPaikat(5, 5, LEVEA).jarjestys > karusellinPaikat(6, 5, LEVEA).jarjestys);
  assert.ok(karusellinPaikat(6, 5, LEVEA).jarjestys > karusellinPaikat(8, 5, LEVEA).jarjestys);
});

test('moottori asettelee karusellin mitatusta leveydestä eikä kehyskohtaisesti', () => {
  assert.match(MOOTTORI, /asettele\(\) \{[\s\S]{0,400}karusellinPaikat\(i, nyt, leveys\)/);
  assert.match(MOOTTORI, /nauhanLeveysKortteina\(\) \{[\s\S]{0,400}nauha \/ kortti/);
  // Koon muutos laskee asettelun uudelleen — kuuntelijalla, ei ajastimella.
  assert.match(MOOTTORI, /addEventListener\?\.\('resize', this\.koonMuutos\)/);
  assert.match(MOOTTORI, /removeEventListener\?\.\('resize', this\.koonMuutos\)/);
  assert.ok(!/setInterval/.test(MOOTTORI), 'karuselli ei saa ajastinta');
});

test('rullauksen kesto on Raamatun animaatiosäännön rajoissa', () => {
  assert.ok(VUOSI_RULLAUS_MS >= 200 && VUOSI_RULLAUS_MS <= 400, `kesto ${VUOSI_RULLAUS_MS} ms`);
});

test('naksahdus soi vain elävästä vaihdosta ja enintään kahdeksan kertaa sekunnissa', () => {
  assert.ok(AIKAJANA_NAKSU_VALI_MS >= 125, `${AIKAJANA_NAKSU_VALI_MS} ms sallisi yli 8 naksua sekunnissa`);
  // Kytkentä: avaus ja alustus ovat `heti`, pysäytetty kello hiljainen.
  assert.match(MOOTTORI, /naytaVuosi\(vuosi, heti = false\) \{[\s\S]{0,1400}if \(elava && this\.kaynnissa\) this\.naksahda\(\);/);
  // Kohahdus kuuluu keksinnölle, ei vuodenvaihteelle (omistaja 3.9.2026).
  assert.match(MOOTTORI, /sytyta\(i\) \{[\s\S]{0,700}this\.keksinnonAani\(t\);/);
  assert.match(MOOTTORI, /keksinnonAani\(t\) \{\n    if \(t\?\.paalu\) return;\n    sfx\.play\('keksinto'\);/);
  assert.ok(!/vuosiAani/.test(MOOTTORI), 'vuosiAani on korvattu');
  assert.match(MOOTTORI, /naksahda\(\) \{[\s\S]{0,300}AIKAJANA_NAKSU_VALI_MS[\s\S]{0,200}sfx\.play\('vuosi'\);/);
  // prefers-reduced-motion vaihtaa merkin ilman liikettä; pysäytetty kello liukuu.
  assert.match(MOOTTORI, /asetaMatkamittari\(this\.rullat, arvo, \{ heti: heti \|\| this\.reducedMotion, liuku: !this\.kaynnissa \}\)/);
  // Käyvä kello antaa mittarille murto-osavuoden joka kehyksellä.
  assert.match(MOOTTORI, /this\.tila = tila;\n\s*this\.naytaVuosi\(tila\.vuosi\);/);
  // Lamput ovat napautettavia (omistaja 3.9.2026) ja paneeli raahattava.
  assert.match(MOOTTORI, /g\.addEventListener\('click', \(e\) => \{ e\.stopPropagation\(\); this\.napautaValoa\(i\); \}\)/);
  assert.match(MOOTTORI, /napautaValoa\(i\) \{[\s\S]{0,200}this\.siirry\(i\);/);
  assert.match(MOOTTORI, /kytkeRaahaus\(\) \{[\s\S]{0,6000}rajaaPaneelinSiirto\(paneeli, this\.juuri/);
  const CSS = readFileSync(new URL('../css/aikajana.css', import.meta.url), 'utf8');
  assert.match(CSS, /\.aikajana-valo\.palaa \{ pointer-events: auto; cursor: pointer; \}/);
  assert.match(CSS, /translate\(var\(--aikajana-paneeli-dx, 0px\), var\(--aikajana-paneeli-dy, 0px\)\)/);
});

/* ==================== MUSIIKKI ==================== */

/*
 * Linssin oma musiikki (omistajan tilaus 2.9.2026 ilta). Soitin on
 * js/siirtymamusiikki.js ja sen taulukko on testattu
 * tests/linssimusiikki.test.mjs:ssä; täällä vartioidaan KYTKENTÄ eli
 * se, että kaari nimeää raidan ja moottori käskee sitä oikeissa
 * kohdissa. Kytkentä on juuri sellainen, joka katoaa huomaamatta:
 * kaikki neljä pintaa toimisivat ilman ainuttakaan ääntä.
 */

test('kaari nimeää oman raitansa ja tauko hiljentää sen puoleen', () => {
  assert.equal(LINSSI.aikajana.musiikki, 'keksinnot');
  assert.equal(AIKAJANA_TAUKO_HIMMENNYS, 0.5);
});

test('moottori käskee musiikkia käynnistyksessä, tauolla, jutussa ja purussa', () => {
  // Raita alkaa ajon mukana ja loppuu purussa.
  assert.match(MOOTTORI, /kaynnista\(\) \{[\s\S]{0,400}this\.aloitaMusiikki\(true\)/);
  assert.match(MOOTTORI, /pura\(\) \{[\s\S]{0,200}this\.lopetaMusiikki\(\)/);
  // Tauko ja jatko säätävät tasoa, EIVÄT katkaise raitaa.
  assert.match(MOOTTORI, /pysayta\(\) \{[\s\S]{0,200}this\.saadaMusiikki\(\)/);
  assert.match(MOOTTORI, /jatka\(\) \{[\s\S]{0,200}this\.saadaMusiikki\(\)/);
  assert.match(MOOTTORI, /saadaMusiikki\([\s\S]{0,200}himmennaSiirtymamusiikki\(ajossa \? 1 : AIKAJANA_TAUKO_HIMMENNYS\)/);
  // Juttu Tiedeliitteenä: raita pois kun sivu aukeaa ja takaisin
  // kortin sulkukoukusta (kunSuljetaan → palautaJutunJalkeen).
  assert.match(MOOTTORI, /avaaJuttu\(t\) \{[\s\S]{0,900}if \(auki\) this\.vaimennaJutunAjaksi\(\)/);
  assert.match(MOOTTORI, /kunSuljetaan: \(\) => this\.palautaJutunJalkeen\(\)/);
  assert.match(MOOTTORI, /palautaJutunJalkeen\(\) \{[\s\S]{0,200}this\.aloitaMusiikki\(\)/);
  assert.match(MOOTTORI, /pura\(\) \{[\s\S]{0,120}suljeTiedeliite\(this\.ui\)/);
  // Kaari ilman musiikki-kenttää ei koske soittimeen.
  assert.match(MOOTTORI, /this\.musiikkiLaji = kaari\.musiikki \?\? null;/);
  for (const metodi of ['aloitaMusiikki', 'saadaMusiikki', 'lopetaMusiikki', 'vaimennaJutunAjaksi']) {
    assert.match(MOOTTORI, new RegExp(`${metodi}\\([^)]*\\) \\{\\n    if \\(!this\\.musiikkiLaji\\) return;`),
      `${metodi}: hiljainen kaari ei saa koskea soittimeen`);
  }
});

/* ==================== KEKSINTÖDATA ==================== */

test('keksintölinssi täyttää linssisopimuksen ja on rekisterissä', () => {
  const linssi = tarkistaLinssi({ LINSSI }, 'keksinnot');
  assert.equal(linssi.kerros, false);
  assert.ok(LINSSIT.some((r) => r.tunnus === 'keksinnot'), 'rekisteririvi puuttuu');
  assert.ok(linssi.aikajana.alku < KEKSINNOT[0].vuosi);
  assert.equal(linssi.aikajana.loppu, KEKSINNOT.at(-1).vuosi);
});

test('jokaisella tapahtumalla on vuosi, paikka, otsikko ja selite; vuodet nousevat', () => {
  let edellinen = 0;
  for (const t of KEKSINNOT) {
    assert.ok(Number.isInteger(t.vuosi), `${t.otsikko}: vuosi`);
    assert.ok(t.vuosi >= edellinen, `${t.otsikko}: vuodet eivät ole järjestyksessä`);
    edellinen = t.vuosi;
    for (const kentta of ['paikka', 'otsikko', 'selite', 'henkilo']) {
      assert.ok(typeof t[kentta] === 'string' && t[kentta].length > 0, `${t.otsikko}: ${kentta}`);
    }
    if (!t.paalu) {
      assert.ok(typeof t.juttu === 'string' && t.juttu.includes('\n\n'), `${t.otsikko}: juttu kahdessa kappaleessa`);
      assert.ok(t.lahde, `${t.otsikko}: lähde`);
    }
  }
});

test('laudan koordinaatit vastaavat asteita pelin omalla projektiolla', () => {
  const EUROOPPA = LINSSI.aikajana.alue;
  for (const t of KEKSINNOT) {
    assert.ok(Number.isFinite(t.x) && Number.isFinite(t.y), `${t.otsikko}: x/y`);
    assert.ok(t.x >= EUROOPPA.x && t.x <= EUROOPPA.x + EUROOPPA.w
      && t.y >= EUROOPPA.y && t.y <= EUROOPPA.y + EUROOPPA.h, `${t.otsikko}: Euroopan alueen ulkopuolella`);
    if (!Number.isFinite(t.lat)) continue;
    const p = projisoiLaudalle('maailmankartta', t.lon, t.lat);
    assert.ok(Math.abs(p.x - t.x) < 1 && Math.abs(p.y - t.y) < 1,
      `${t.otsikko}: x/y ei vastaa asteita (${p.x.toFixed(1)}, ${p.y.toFixed(1)})`);
  }
});

test('pelin omissa kaupungeissa valo osuu kaupungin laatan viereen', () => {
  const kaupungit = new Map(MAAILMANKARTTA.cities.map((c) => [c.name.toLowerCase(), c]));
  for (const t of KEKSINNOT) {
    const c = kaupungit.get(t.paikka.toLowerCase());
    if (!c) continue;
    const ero = Math.hypot(c.x - t.x, c.y - t.y);
    assert.ok(ero < 30, `${t.otsikko}: ${t.paikka} on ${ero.toFixed(1)} yksikköä laatasta`);
  }
});

test('kuvat ovat Commons-nimiä ilman polkua tai ämpäriosoitteita, ja jokaisella on selite', () => {
  for (const t of KEKSINNOT) {
    for (const k of [t.kuva, t.kuvaToinen, t.kuvaAito, t.ilmio, t.ilmioLisa]) {
      if (!k) continue;
      if (k.osoite) {
        // Generoitu kuva: valmis osoite kuvaputken kansiossa, ei tiedostoa.
        assert.ok(k.osoite.startsWith(`${KEKSINTO_KUVAJUURI}/`) && /\.jpg$/.test(k.osoite),
          `${t.otsikko}: ämpäriosoite ${k.osoite}`);
        assert.equal(k.tiedosto, undefined, `${t.otsikko}: osoite ja tiedosto yhtä aikaa`);
        assert.ok(k.lahde, `${t.otsikko}: generoidun kuvan lähderivi puuttuu`);
      } else {
        assert.ok(typeof k.tiedosto === 'string' && !k.tiedosto.includes('/') && /\.(jpe?g|png|gif)$/i.test(k.tiedosto),
          `${t.otsikko}: tiedostonimi ${k.tiedosto}`);
      }
      assert.ok(k.selite, `${t.otsikko}: kuvaselite puuttuu`);
    }
  }
});

test('hyväksytyt generoidut ilmiökuvat ovat kytketty (Watt, Montgolfier, Jenner, Volta, Jacquard)', () => {
  const odotetut = ['1769-watt', '1783-montgolfier', '1796-jenner', '1800-volta', '1804-jacquard'];
  const kytketyt = KEKSINNOT.filter((t) => t.ilmio?.osoite).map((t) => t.ilmio.osoite.split('/').pop().replace(/\.jpg$/, ''));
  for (const o of odotetut) assert.ok(kytketyt.includes(o), `${o} puuttuu`);
});

/* ==================== KEKSIJÖIDEN MUOTOKUVAT ==================== */

/*
 * Muotokuvat ovat kuvaputken generoimia studiokuvia (omistajan tilaus
 * 3.9.2026), ja ne ovat pelin ENSISIJAINEN henkilökuva. Kolme asiaa
 * rikkoutuisi hiljaa: pysäkiltä puuttuisi kuva (nimikirjainlaatta
 * kesken kaaren), osoite osoittaisi väärään kansioon (404 vasta
 * ruudulla) tai kaksoispysäkiltä puuttuisi toinen tekijä.
 */

test('jokaisella pysäkillä on generoitu muotokuva omassa kansiossaan', () => {
  for (const t of KEKSINNOT) {
    if (t.paalu) {
      assert.equal(t.kuva, null, 'merkkipaalulla ei ole muotokuvaa');
      continue;
    }
    assert.ok(t.kuva?.osoite, `${t.otsikko}: muotokuva puuttuu`);
    for (const k of [t.kuva, t.kuvaToinen].filter(Boolean)) {
      assert.ok(k.osoite.startsWith(`${KEKSINTO_KUVAJUURI}/muotokuva/`),
        `${t.otsikko}: muotokuva väärässä kansiossa (${k.osoite})`);
      assert.match(k.osoite, /\/\d{4}-[a-z-]+\.jpg$/, `${t.otsikko}: muotokuvan nimi ${k.osoite}`);
      if (t.henkilojuttu) {
        // Tiedeliitteen pilotti (omistaja 3.9.2026): selite kuvaa persoonaa,
        // lähde on sama alleviivattu maininta kuin ilmiökuvissa.
        assert.ok(k.selite.length > 40, `${t.otsikko}: persoonakuvaus puuttuu`);
        assert.doesNotMatch(k.selite, /studiomuotokuva/, `${t.otsikko}: selite ei saa nimetä kuvaputkea`);
        assert.equal(k.lahde, 'Matkakirjan havainnekuva', `${t.otsikko}: muotokuvan lähde`);
      } else {
        assert.match(k.selite, /, kuvaputken generoitu studiomuotokuva \(2026\)\.$/,
          `${t.otsikko}: muotokuvan selite ${k.selite}`);
      }
    }
  }
});

test('kaksoispysäkeillä on molempien keksijöiden muotokuva, muilla yksi', () => {
  const kaksi = KEKSINNOT.filter((t) => t.kuvaToinen).map((t) => t.henkilo);
  assert.deepEqual(kaksi, ['Montgolfier-veljekset', 'Cooke ja Wheatstone', 'Lumière-veljekset']);
  for (const t of KEKSINNOT.filter((x) => x.kuvaToinen)) {
    assert.notEqual(t.kuva.osoite, t.kuvaToinen.osoite, `${t.otsikko}: sama kuva kahdesti`);
  }
});

test('muotokuvia on 28 eri tiedostoa — yhtä monta kuin ämpäriin vietiin', () => {
  const osoitteet = KEKSINNOT.flatMap((t) => [t.kuva, t.kuvaToinen])
    .filter((k) => k?.osoite).map((k) => k.osoite);
  assert.equal(osoitteet.length, 28);
  assert.equal(new Set(osoitteet).size, 28, 'sama tiedosto kahdella pysäkillä');
});

test('aito Commons-kuva säilyy datassa Tiedeliitettä varten', () => {
  const aidot = KEKSINNOT.filter((t) => t.kuvaAito);
  assert.equal(aidot.length, 22, 'aitoja Commons-kuvia oli 22 (Otto, Siemens ja Benz ilman)');
  for (const t of aidot) {
    assert.ok(t.kuvaAito.tiedosto && t.kuvaAito.selite, `${t.otsikko}: aidon kuvan tiedot`);
  }
  assert.match(LINSSI.lahde.lisenssi, /PD \(kuvat\)/, 'kuvien lisenssirivi ei saa kadota');
});

test('moottori piirtää kortin ja henkilörivin generoidusta muotokuvasta', () => {
  assert.match(MOOTTORI, /const muotokuvat = \(t\) => \[t\.kuva, t\.kuvaToinen\]\.filter\(onKuva\);/);
  assert.match(MOOTTORI, /kortti\.appendChild\(muotokuvaKehys\(t, 400, 'aikajana-muotokuva'\)\);/,
    'kortti ottaa muotokuvan kaksoispysäkit kestävän kehyksen kautta');
  assert.match(MOOTTORI, /muotokuvaKehys\(t, 200, 'aikajana-ilmio-kasvot'\)/,
    'ilmiöpaneelin henkilörivillä on kasvot');
  assert.ok(!/kuvaTaiLaatta\(t\.kuva,/.test(MOOTTORI), 'aito kuva ei enää piirry kortille');
  assert.match(MOOTTORI, /this\.esilataaPienet\(\);/, 'koko kaari esiladataan pienenä');
});

/* ==================== KARUSELLIN KUVAT VALMIIKSI (3.9.2026) ==================== */

test('muotokuvalla on karusellikoko ja valmiiksi sumennettu versio, ilmiökuvalla vain pieni', () => {
  const muotokuva = `${KEKSINTO_KUVAJUURI}/muotokuva/1769-james-watt.jpg`;
  assert.equal(karuselliOsoite(muotokuva), `${KEKSINTO_KUVAJUURI}/muotokuva/karuselli/1769-james-watt.webp`);
  assert.equal(sumeaOsoite(muotokuva), `${KEKSINTO_KUVAJUURI}/muotokuva/sumea/1769-james-watt.webp`);
  const ilmio = `${KEKSINTO_KUVAJUURI}/1769-watt.jpg`;
  assert.equal(karuselliOsoite(ilmio), pieniOsoite(ilmio));
  assert.equal(sumeaOsoite(ilmio), pieniOsoite(ilmio));
  assert.equal(KARUSELLIN_KATTO, 400);
  // Kortit eivät käytä CSS-suodatinta: sumennus on tiedostossa.
  const CSS = readFileSync(new URL('../css/aikajana.css', import.meta.url), 'utf8');
  const kortti = CSS.match(/\.aikajana-kortti \{[^}]*\}/)[0];
  assert.doesNotMatch(kortti, /filter:/);
  assert.doesNotMatch(CSS, /\.aikajana-kortti\.tuleva \{[^}]*filter:/);
  assert.match(MOOTTORI, /img\[data-terava\]/);
});

/* ==================== SIIRTYMÄT: KARUSELLI JA PANEELI (3.9.2026) ====================
 *
 * Omistajan tilaus sanatarkasti: *"alareunan kuvat pitäisi siirtyä
 * animoidusti niin että uusi kuva kasvaa suureksi samalla kun vanha
 * pienenee ja siirtyy eteenpäin … myös havainnekuvaan tarvitaan joko
 * ristihäivytys tai jokin muu animoitu siirtymä."*
 *
 * Siirtymät ovat CSS:ssä ja rikkoutuvat hiljaa: kaari, joka tekee koko
 * matkan ensimmäisissä kehyksissä, näyttää hyppäykseltä vaikka siirtymä
 * teknisesti on olemassa — juuri niin kävi aiemmalle kaarelle
 * (0.22, 0.8, 0.28, 1), joka selaimessa mitattuna vei 35 % matkasta
 * ensimmäisen 10 %:n aikana. Nämä vartiot lukitsevat sen, mitä
 * mittauksen jälkeen jäi: pehmeä kaari, transform-pohjainen liike,
 * kuvanvaihto dekoodauksen kautta ja paneelin korkeusliuku.
 */

const AIKAJANA_CSS = readFileSync(new URL('../css/aikajana.css', import.meta.url), 'utf8');

/** cubic-bezier(x1,y1,x2,y2): edistymä (0..1) ajan osuudella t. */
function kaarenArvo(x1, y1, x2, y2, t) {
  let lo = 0;
  let hi = 1;
  let u = t;
  for (let k = 0; k < 40; k += 1) {
    u = (lo + hi) / 2;
    const x = 3 * (1 - u) ** 2 * u * x1 + 3 * (1 - u) * u * u * x2 + u ** 3;
    if (x < t) lo = u; else hi = u;
  }
  return 3 * (1 - u) ** 2 * u * y1 + 3 * (1 - u) * u * u * y2 + u ** 3;
}

test('linssin kaaressa on nopeutus ja hidastus, ei pelkkää jarrutusta', () => {
  const kesto = AIKAJANA_CSS.match(/--aikajana-kesto:\s*([\d.]+)s/);
  assert.ok(kesto, '--aikajana-kesto puuttuu');
  const ms = Number(kesto[1]) * 1000;
  assert.ok(ms >= 500 && ms <= 700, `siirtymän kesto ${ms} ms (tilaus n. 600 ms)`);
  const kaari = AIKAJANA_CSS.match(/--aikajana-kaari:\s*cubic-bezier\(([\d.]+),\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)\)/);
  assert.ok(kaari, '--aikajana-kaari puuttuu tai ei ole cubic-bezier');
  const [x1, y1, x2, y2] = kaari.slice(1).map(Number);
  const kymmenesosa = kaarenArvo(x1, y1, x2, y2, 0.1);
  assert.ok(kymmenesosa <= 0.1,
    `kaari lähtee hyppäyksellä: ${(kymmenesosa * 100).toFixed(0)} % matkasta 10 %:ssa kestoa`);
  assert.ok(kaarenArvo(x1, y1, x2, y2, 0.5) >= 0.5, 'kaari ei ehdi puoliväliin ajoissa');
  assert.ok(kaarenArvo(x1, y1, x2, y2, 0.9) >= 0.95, 'kaari ei hidastu loppua kohti');
  // prefers-reduced-motion nollaa liikkeen samalla muuttujalla.
  assert.match(AIKAJANA_CSS, /prefers-reduced-motion[\s\S]{0,200}--aikajana-kesto: 0\.01s/);
});

test('kortti liukuu ja skaalautuu yhdellä transform-siirtymällä, ei left/width-siirtymällä', () => {
  const kortti = AIKAJANA_CSS.match(/\.aikajana-kortti \{[\s\S]*?\n\}/)[0];
  // Yksi GPU-matriisi: siirto ja suurennus samassa transformissa.
  assert.match(kortti, /transform:\s*translate3d\(calc\(var\(--paikka\) \* var\(--aikajana-kortti-w\) - 50%\), 0, 0\)\s*scale\(var\(--mitta\)\);/);
  assert.match(kortti, /transition:\s*transform var\(--aikajana-kesto\) var\(--aikajana-kaari\),\s*opacity var\(--aikajana-kesto\) var\(--aikajana-kaari\);/);
  assert.doesNotMatch(kortti, /transition:[^;]*\b(left|width|top|height)\b/, 'sommittelua ei animoida kehyksittäin');
  assert.match(kortti, /will-change: transform, opacity;/);
  // Kortin teksti seuraa kortin kokoa liukuen eikä napsahda luokan vaihtuessa.
  assert.match(AIKAJANA_CSS, /\.aikajana-kortti-otsikko \{ transition: font-size var\(--aikajana-kesto\) var\(--aikajana-kaari\); \}/);
});

test('kortin terävä/sumea vaihtuu vasta dekoodatusta kuvasta, ei tyhjän kehyksen kautta', () => {
  // Suoraa src-sijoitusta ei enää tehdä asettelussa: se välähti tyhjänä.
  assert.match(MOOTTORI, /vaihdaKorttikuva\(img, luokka === 'tuleva' \? img\.dataset\.sumea : img\.dataset\.terava\)/);
  assert.match(MOOTTORI, /function vaihdaKorttikuva[\s\S]{0,900}esilataus\.decode\(\)\.then\(pane, pane\)/);
  // Kilpailun esto: vanhentunut lataus ei kirjoita korttiin.
  assert.match(MOOTTORI, /function vaihdaKorttikuva[\s\S]{0,900}kuva\.dataset\.vaihtoon !== osoite\) return;/);
});

test('havainnekuvapaneelin ristihäivytyksessä on liikettä ja korkeus liukuu', () => {
  // Sivu tulee esiin nousten ja kasvaen, väistyvä kohoaa ja suurenee ohi.
  assert.match(AIKAJANA_CSS, /\.aikajana-ilmio-sivu \{[\s\S]*?transform: translateY\(10px\) scale\(0\.985\);/);
  assert.match(AIKAJANA_CSS, /\.aikajana-ilmio-sivu\.poistuu \{ position: absolute; opacity: 0; transform: translateY\(-8px\) scale\(1\.03\); \}/);
  // Ristihäivytys ajetaan linssin omalla kaarella, ei selaimen ease-oletuksella.
  assert.match(AIKAJANA_CSS, /\.aikajana-ilmio-sivu \{[\s\S]*?opacity var\(--aikajana-kesto\) var\(--aikajana-kaari\),\s*transform var\(--aikajana-kesto\) var\(--aikajana-kaari\);/);
  // Korkeus liukuu, mutta raahaus ei saa liukua perässä.
  assert.match(AIKAJANA_CSS, /\.aikajana-ilmio \{ transition: height var\(--aikajana-kesto\) var\(--aikajana-kaari\), width 180ms var\(--aikajana-kaari\); \}/);
  assert.match(AIKAJANA_CSS, /\.aikajana-ilmio\.raahataan, \.aikajana-ilmio\.nipistetaan \{ transition: none; \}/);
});

test('paneelinvaihto pakottaa lähtöarvon ja liuuttaa korkeuden vanhasta uuteen', () => {
  // Ilman pakotettua sommittelua siirtymällä ei ole mistä lähteä.
  assert.match(MOOTTORI, /void sivu\.offsetHeight;\s*\n\s*if \(vanhaKorkeus > 0\) this\.paneeli\.style\.height = `\$\{vanhaKorkeus\}px`;\s*\n\s*sivu\.classList\.add\('esilla'\);/);
  // Reunus mukaan (border-box) ja mitta sommittelusta: skaalattu
  // ruutulaatikko olisi liian matala ja lukon avaus nytkäyttäisi.
  assert.match(MOOTTORI, /const reunat = this\.paneeli\.offsetHeight - this\.paneeli\.clientHeight;/);
  assert.match(MOOTTORI, /const pohja = Number\.parseFloat\(getComputedStyle\(this\.paneeli\)\.minHeight\) \|\| 0;/);
  assert.match(MOOTTORI, /this\.paneeli\.style\.height = `\$\{Math\.max\(sivu\.offsetHeight \+ reunat, pohja\)\}px`;/);
  // Pohjan ehto katsoo ESILLÄ olevaa sivua: vaihdon aikana paneelissa
  // on kaksi sivua, ja väistyvä kuvasivu antoi väärän pohjan.
  assert.match(AIKAJANA_CSS, /\.aikajana-ilmio:has\(> \.aikajana-ilmio-sivu\.esilla > \.aikajana-ilmiokuva:only-child\) \{ min-height: 0; \}/);
  // Lukko avataan häivytyksen jälkeen, ja vanhentunut ajastin ei avaa uudempaa.
  assert.match(MOOTTORI, /this\.paneelinKorkeusMerkki === merkki\) this\.paneeli\.style\.height = '';/);
  assert.match(MOOTTORI, /setTimeout\(\(\) => v\.remove\(\), PANEELIN_HAIVYTYS_MS\)/);
  assert.match(MOOTTORI, /const PANEELIN_HAIVYTYS_MS = 700;/);
  // Raahaus säilyy: siirto on yhä CSS-muuttujissa eikä korkeuslukko koske siihen.
  assert.match(MOOTTORI, /asetaPaneelinSiirto\(raja\.dx, raja\.dy\)/);
});
