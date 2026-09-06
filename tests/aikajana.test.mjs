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
import { jaaVirkkeiksi } from '../js/aikajana.js';
import { readFileSync } from 'node:fs';

import {
  aikajanaAskel, asetaMatkamittari, rajaaPaneelinSiirto, PANEELIN_RAAHAUSKYNNYS,
  rullanSumu, tasoitaSumu, sumennaRullat, RULLAN_VALOTUS_S, RULLAN_SUMU_MAX, RULLAN_SUMUN_KYNNYS,
  rajaaPaneelinKoko, PANEELIN_KOKO_MIN, PANEELIN_KOKO_MAX,
  AIKAJANA_TAUON_OSUUS, VUOSI_RULLAUS_MS, AIKAJANA_NAKSU_VALI_MS,
  AIKAJANA_VIIVE_MS, AIKAJANA_PAALU_MS, AIKAJANA_TAUKO_HIMMENNYS, AIKAJANA_VUOSI_MS,
  aikajananNopeus, AIKAJANA_POHJANOPEUS, AIKAJANA_KIIHTYMISMATKA, AIKAJANA_ALIASKEL_MS,
  pieniOsoite, PIENEN_KATTO, karusellinPaikat, karusellinMitta, KARUSELLIN_MITAT,
  karuselliOsoite, sumeaOsoite, KARUSELLIN_KATTO,
  aikaSeuraavaan, ennakonKesto, KARUSELLIN_ENNAKKO_MS, KARUSELLIN_ENNAKKO_POHJA_MS,
  AIKAJANAN_LAHIKUVA_LEVEYS, AIKAJANAN_KAMERAN_ENNAKKO_OSUUS, AIKAJANAN_KAMERAN_ENNAKKO_MS,
  AIKAJANAN_KAMERAN_JALKIJATTO_MS, AIKAJANAN_KAMERAN_POHJA_MS, aikajananKameranPehmennys,
  valokeilanMaski, VALOKEILAN_LOHKOT, paneelikuvanOsoite, PANEELIN_ESILATAUS_PYSAKKEJA,
  KUVAVARASTON_KATTO,
} from '../js/aikajana.js';
import { runkoOsoitteesta } from '../tools/tee-pienet-kuvat.mjs';
import { KEKSINNOT, KEKSINTO_KUVAJUURI, LINSSI } from '../js/linssit/keksinnot.js';
import { projisoiLaudalle } from '../js/fokusmitat.js';
import { PALLOLAUDAN_SIIRTOLEVEYS } from '../js/pallolauta/kamera.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { LINSSIT } from '../js/linssit/rekisteri.js';
import { tarkistaLinssi } from '../js/linssit/kerros.js';

// Moottorin lähde tekstinä: kytkennät, joita puhdas funktio ei näytä.
const MOOTTORI = readFileSync(new URL('../js/aikajana.js', import.meta.url), 'utf8');
const TIEDELIITE = readFileSync(new URL('../js/tiedeliite.js', import.meta.url), 'utf8');

/** Yhden metodin lohko lähteestä (sisennys erottaa metodin lopun). */
function metodi(nimi) {
  const osuma = MOOTTORI.match(new RegExp(`\\n  ${nimi}\\([^)]*\\) \\{[\\s\\S]*?\\n  \\}`));
  assert.ok(osuma, `moottorista ei löydy metodia ${nimi}`);
  return osuma[0];
}
/*
 * PURKU KASVAA JOKA KERROKSESTA (avausjakso, välinäytös), joten sen
 * vartiot lukevat koko lohkon eivätkä ensimmäisiä merkkejä.
 */
const PURA = metodi('pura');
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
  assert.ok(PANEELIN_KOKO_MIN < 1 && PANEELIN_KOKO_MAX >= 2);
  assert.equal(rajaaPaneelinKoko(1), 1);
  assert.equal(rajaaPaneelinKoko(0.1), PANEELIN_KOKO_MIN);
  assert.equal(rajaaPaneelinKoko(9), PANEELIN_KOKO_MAX);
  assert.equal(rajaaPaneelinKoko(NaN), 1);
  // Paneeli 300 px kertoimella 1 → perusleveys 300; linssi 800 px → enintään (800-16)/300.
  assert.ok(Math.abs(rajaaPaneelinKoko(5, { leveys: 300, kokoNyt: 1, juuriLeveys: 500 }) - 484 / 300) < 1e-9);
  assert.equal(rajaaPaneelinKoko(1.5, { leveys: 300, kokoNyt: 1, juuriLeveys: 800 }), 1.5);
  assert.equal(rajaaPaneelinKoko(5, { leveys: 300, kokoNyt: 1, juuriLeveys: 5000 }), PANEELIN_KOKO_MAX);
  // Korkeus: paneeli 200 px, linssi 600 px, vuosipalkki vie 60 → enintään (600-60-16)/200.
  assert.ok(Math.abs(rajaaPaneelinKoko(5, { leveys: 300, korkeus: 200, kokoNyt: 1, juuriLeveys: 5000, juuriKorkeus: 600, ylaVara: 60 }) - 524 / 200) < 1e-9 || rajaaPaneelinKoko(5, { leveys: 300, korkeus: 200, kokoNyt: 1, juuriLeveys: 5000, juuriKorkeus: 600, ylaVara: 60 }) === PANEELIN_KOKO_MAX);
  assert.ok(Math.abs(rajaaPaneelinKoko(5, { leveys: 300, korkeus: 300, kokoNyt: 1, juuriLeveys: 5000, juuriKorkeus: 600, ylaVara: 60 }) - 524 / 300) < 1e-9);
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
  // Ulkoinen kuva (merkkipaalun isoisä) ei kulje pieni-putken kautta.
  const osoitteet = KEKSINNOT.flatMap((t) => [t.kuva, t.kuvaToinen, t.ilmio, t.ilmioLisa])
    .filter((k) => k?.osoite && !k.ulkoinen).map((k) => k.osoite);
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
  assert.match(MOOTTORI, /asetaAmpariKuva\(kuva, kuvatieto\.osoite, leveys, \{ pienet, vara: kuvatieto\.vara \?\? null \}\);/);
  // Varareitti kerran, ei silmukkaa: karuselli → pieni → alkuperäinen.
  assert.match(MOOTTORI, /const alkuperaiseen = \(\) => \{ otaVarakuva\(kuva, vara\); kuva\.src = osoite; \};/);
  assert.match(MOOTTORI, /function asetaAmpariKuva[\s\S]{0,1200}addEventListener\('error', alkuperaiseen, \{ once: true \}\)/);
  // Kortin viimeinen varareitti (6.9.2026): kaaren oma havainnekuva,
  // kerran ja vain kerran, ja rajaus keskeltä (css .varakuva).
  assert.match(MOOTTORI, /function otaVarakuva\(kuva, vara\) \{[\s\S]{0,400}kuva\.classList\.add\('varakuva'\);[\s\S]{0,120}\{ once: true \}\);/);
  // Esilataus: koko kaari pienenä heti käynnistyksessä, ei kolmen ikkunaa.
  assert.ok(MOOTTORI.match(/\n  kaynnista\(\) \{[\s\S]*?\n  \}/)[0].includes('this.esilataaPienet();'), 'käynnistys ei esilataa');
  assert.match(MOOTTORI, /esilataaPienet\(\) \{[\s\S]{0,900}for \(const t of this\.tapahtumat\)[\s\S]{0,300}pieniOsoite\(kuva\.osoite\)/);
  // Kaari ilman pieniä versioita ei esilataa mitään (6.9.2026): se
  // olisi joko pelkkiä 404:iä tai megatavujen ryntäys alkuperäisiä.
  assert.match(MOOTTORI, /esilataaPienet\(\) \{[\s\S]{0,900}if \(!this\.pienetKuvat\) return;/);
  // Kolmen pysäkin IKKUNA on korvattu koko kaarella: esilataaPienet ei
  // saa palata pysäkkikohtaiseksi. (Sen rinnalla ajava dekoodausjono
  // valmistaSeuraavat on eri asia — se ei rajaa mitään pois, ks. alla.)
  assert.ok(!/esilataaPienet\(i\)|esilataaPienet\(kohde\)/.test(MOOTTORI), 'kolmen pysäkin ikkuna on korvattu');
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
  assert.match(MOOTTORI, /asettele\(\) \{[\s\S]{0,900}karusellinPaikat\(i, nyt, leveys\)/);
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
  assert.match(MOOTTORI, /naytaVuosi\(vuosi, heti = false\) \{[\s\S]{0,2600}if \(elava && this\.kaynnissa\) this\.naksahda\(\);/);
  // Kohahdus kuuluu keksinnölle, ei vuodenvaihteelle (omistaja 3.9.2026).
  assert.match(MOOTTORI, /sytyta\(i\) \{[\s\S]{0,700}this\.keksinnonAani\(t\);/);
  assert.match(MOOTTORI, /keksinnonAani\(t\) \{\n    if \(t\?\.paalu\) return;\n    sfx\.play\('keksinto'\);/);
  assert.ok(!/vuosiAani/.test(MOOTTORI), 'vuosiAani on korvattu');
  assert.match(MOOTTORI, /naksahda\(\) \{[\s\S]{0,300}AIKAJANA_NAKSU_VALI_MS[\s\S]{0,200}sfx\.play\('vuosi'\);/);
  // prefers-reduced-motion vaihtaa merkin ilman liikettä; pysäytetty kello liukuu.
  // (Askel ja suunta ovat "vuotta sitten" -asteikon jatke (5.9.2026): keksinnöillä
  // ne ovat 1 ja 1, eli entinen kello — ks. tests/ihmisen-matka.test.mjs.)
  // Näytetty lukema on TÄYSI: askel 1 (omistaja 6.9.2026 keskipäivä,
  // "Vuosinumerot saisivat vilistää yksittäisistä numeroista alkaen").
  assert.match(MOOTTORI, /asetaMatkamittari\(this\.rullat, arvo, \{[\s\S]{0,900}heti: heti \|\| this\.reducedMotion,[\s\S]{0,900}askel: 1,\n\s*suunta,/);
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
  /*
   * Raita alkaa jo avausjaksossa mutta HILJAA (aloitaMusiikki(false)):
   * täysi linssitaso tulee vasta Käynnistä-napista. Loppuu purussa.
   */
  assert.ok(MOOTTORI.match(/\n  kaynnista\(\) \{[\s\S]*?\n  \}/)[0].includes('this.aloitaMusiikki(false)'), 'käynnistys ei aloita musiikkia hiljaa');
  assert.match(MOOTTORI, /aloitaAjo\(\) \{[\s\S]{0,900}this\.aloitaMusiikki\(true\)/);
  // Koko metodilohko eikä merkkilaskuri: purkuun tulee rivejä lisää
  // aina kun linssiin tulee uusi kerros (avausjakso, välinäytös).
  assert.ok(PURA.includes('this.lopetaMusiikki();'), 'purku ei lopeta musiikkia');
  // Tauko ja jatko säätävät tasoa, EIVÄT katkaise raitaa.
  assert.match(MOOTTORI, /pysayta\(\) \{[\s\S]{0,200}this\.saadaMusiikki\(\)/);
  assert.match(MOOTTORI, /jatka\(\) \{[\s\S]{0,200}this\.saadaMusiikki\(\)/);
  assert.match(MOOTTORI, /saadaMusiikki\([\s\S]{0,200}himmennaSiirtymamusiikki\(ajossa \? 1 : AIKAJANA_TAUKO_HIMMENNYS\)/);
  // Juttu Tiedeliitteenä: raita pois kun sivu aukeaa ja takaisin
  // kortin sulkukoukusta (kunSuljetaan → palautaJutunJalkeen).
  assert.match(MOOTTORI, /avaaJuttu\(t\) \{[\s\S]{0,900}if \(auki\) this\.vaimennaJutunAjaksi\(\)/);
  assert.match(MOOTTORI, /kunSuljetaan: \(\) => this\.palautaJutunJalkeen\(\)/);
  assert.match(MOOTTORI, /palautaJutunJalkeen\(\) \{[\s\S]{0,200}this\.aloitaMusiikki\(\)/);
  assert.ok(PURA.includes('suljeTiedeliite(this.ui);'), 'purku ei sulje Tiedeliitettä');
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
        // Ulkoinen (isoisän valokuva) saa asua kohtaamiset/isoisa-kansiossa.
        const juuri = k.ulkoinen ? 'https://media.matkakirja.app/kohtaamiset/isoisa/' : `${KEKSINTO_KUVAJUURI}/`;
        assert.ok(k.osoite.startsWith(juuri) && /\.jpg$/.test(k.osoite),
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
      // Merkkipaalu sai 4.9.2026 isoisän hassuttelevan muotokuvan
      // (kuvaputki, kuvateksti sanasta sanaan) — ei ilmiökuvaa.
      assert.equal(t.kuva?.osoite, `${KEKSINTO_KUVAJUURI}/muotokuva/1873-isoisa.jpg`,
        'merkkipaalun muotokuva on isoisä');
      assert.equal(t.kuva.lahde, 'Kuvaputken generoitu valokuva');
      // Ilmiökuva on isoisän Kantonin teehuonekuva oman kansion ulkopuolelta (4.9.2026).
      assert.ok(t.ilmio?.ulkoinen && /kohtaamiset\/isoisa\/isoisa-kanton-1873-kuva-v1\.jpg$/.test(t.ilmio.osoite),
        'merkkipaalun ilmiökuva on isoisän pohjukkeeton Kantonin kuva');
      assert.equal(t.ilmio.rajaus, undefined, 'pohjukkeeton kuva ei tarvitse rajausta');
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

test('muotokuvia on 29 eri tiedostoa — 28 keksijää ja isoisä', () => {
  const osoitteet = KEKSINNOT.flatMap((t) => [t.kuva, t.kuvaToinen])
    .filter((k) => k?.osoite).map((k) => k.osoite);
  assert.equal(osoitteet.length, 29);
  assert.equal(new Set(osoitteet).size, 29, 'sama tiedosto kahdella pysäkillä');
});

test('aito Commons-kuva säilyy datassa Tiedeliitettä varten', () => {
  const aidot = KEKSINNOT.filter((t) => t.kuvaAito);
  assert.equal(aidot.length, 25, 'jokaisella keksijäpysäkillä on aito Commons-kuva');
  for (const t of aidot) {
    assert.ok(t.kuvaAito.tiedosto && t.kuvaAito.selite, `${t.otsikko}: aidon kuvan tiedot`);
  }
  assert.match(LINSSI.lahde.lisenssi, /PD \(kuvat\)/, 'kuvien lisenssirivi ei saa kadota');
});

/*
 * TIEDELIITTEEN HENKILÖNOSTO (omistajan tilaus 3.9.2026: "laita agentit
 * monistamaan Wattin noston tyyli muihin samanlaisiin"). Wattin pysäkki
 * oli pilotti; nyt jokaisella keksijäpysäkillä pitää olla sama kolmikko:
 * kaksikappaleinen henkilojuttu, luonnetta kuvaava muotokuvateksti ja
 * aito Commons-kuva. Ilman testiä yksi pysäkki jäisi hiljaa vajaaksi.
 */
test('jokaisella keksijäpysäkillä on henkilojuttu, luonnekuva ja aito kuva', () => {
  const keksijat = KEKSINNOT.filter((t) => !t.paalu);
  assert.equal(keksijat.length, 25);
  for (const t of keksijat) {
    assert.ok(t.henkilojuttu, `${t.otsikko}: henkilojuttu puuttuu`);
    const kappaleet = t.henkilojuttu.split('\n\n');
    assert.equal(kappaleet.length, 2, `${t.otsikko}: henkilojuttu on kaksi kappaletta`);
    for (const k of kappaleet) {
      assert.ok(k.trim().length > 0, `${t.otsikko}: tyhjä kappale`);
    }
    const sanoja = t.henkilojuttu.split(/\s+/).filter(Boolean).length;
    assert.ok(sanoja >= 90, `${t.otsikko}: henkilojuttu vain ${sanoja} sanaa`);
    // Sidos vuoteen 1873 on nostojen koko idea — se ei saa unohtua.
    assert.match(t.henkilojuttu, /1873/, `${t.otsikko}: henkilojutusta puuttuu sidos vuoteen 1873`);
    assert.ok(t.kuvaAito?.tiedosto, `${t.otsikko}: aito Commons-kuva puuttuu`);
  }
});

test('moottori piirtää kortin ja henkilörivin generoidusta muotokuvasta', () => {
  assert.match(MOOTTORI, /const muotokuvat = \(t\) => \[t\.kuva, t\.kuvaToinen\]\.filter\(onKuva\);/);
  assert.match(MOOTTORI, /kortti\.appendChild\(muotokuvaKehys\(t, 400, 'aikajana-muotokuva', this\.pienetKuvat\)\);/,
    'kortti ottaa muotokuvan kaksoispysäkit kestävän kehyksen kautta');
  assert.match(MOOTTORI, /muotokuvaKehys\(t, 200, 'aikajana-ilmio-kasvot', this\.pienetKuvat\)/,
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
/* Pöllönapin väistösäännöt asuvat sovelluskehyksen tyylitiedostossa. */
const STYLES = readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');

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
  // Kortin alla on vain henkilön nimi (omistaja 5.9.2026): vuosi ja otsikko
  // luetaan havainnekuvan alta, eikä korttiin ladota niitä.
  assert.doesNotMatch(AIKAJANA_CSS, /\.aikajana-kortti-(vuosi|otsikko)\b/);
});

test('kortin terävä/sumea vaihtuu vasta dekoodatusta kuvasta, ei tyhjän kehyksen kautta', () => {
  // Suoraa src-sijoitusta ei enää tehdä asettelussa: se välähti tyhjänä.
  assert.match(MOOTTORI, /const sumeana = luokka === 'tuleva' \|\| \(ennakossa && luokka === 'nykyinen'\);/);
  assert.match(MOOTTORI, /vaihdaKorttikuva\(img, sumeana \? img\.dataset\.sumea : img\.dataset\.terava\)/);
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
  assert.match(AIKAJANA_CSS, /\.aikajana-ilmio \{\s*transition:\s*height var\(--aikajana-kesto\) var\(--aikajana-kaari\),\s*width 180ms var\(--aikajana-kaari\),/);
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
  assert.match(AIKAJANA_CSS, /\.aikajana-ilmio:has\(> \.aikajana-ilmio-sivu\.esilla > \.aikajana-ilmiokuva:first-child\) \{ min-height: 0; \}/);
  // Lukko avataan häivytyksen jälkeen, ja vanhentunut ajastin ei avaa uudempaa.
  assert.match(MOOTTORI, /this\.paneelinKorkeusMerkki === merkki\) this\.paneeli\.style\.height = '';/);
  assert.match(MOOTTORI, /setTimeout\(\(\) => v\.remove\(\), PANEELIN_HAIVYTYS_MS\)/);
  assert.match(MOOTTORI, /const PANEELIN_HAIVYTYS_MS = 700;/);
  // Raahaus säilyy: siirto on yhä CSS-muuttujissa eikä korkeuslukko koske siihen.
  assert.match(MOOTTORI, /asetaPaneelinSiirto\(raja\.dx, raja\.dy\)/);
});

/* ==================== LINSSIN AIKANA KAIKKI MUU ON KIINNI ==================== */

/*
 * OMISTAJAN TILAUS 4.9.2026: *"Pöllön kommentit saattavat tulla vielä
 * kesken linssin. Tosin itse käynnistin linssin kesken kaiken mutta
 * silti pitää kaikki muu blokata varmuuden vuoksi kun linssi alkaa."*
 *
 * Kytkentä katoaa hiljaa: linssi näyttäisi täsmälleen oikealta,
 * kunnes kuplapino tai kohdekortti nousee sen päälle keskellä ajoa
 * (omistajan kuvakaappaus). Kaksi puolta vartioidaan:
 *   1. KÄYNNISTYS sulkee sen, mikä oli jo auki, ja PYSÄYTYS päästää
 *      lykätyt puheenvuorot ulos.
 *   2. AVAAJAT kysyvät yhteistä porttia (js/ui-apurit.js linssiEstaa),
 *      jotta uusi avaaja ei unohda sitä.
 */

const POLLO_LAHDE = readFileSync(new URL('../js/pollo.js', import.meta.url), 'utf8');
const KOHTEET_LAHDE = readFileSync(new URL('../js/fokuskohteet.js', import.meta.url), 'utf8');
const NOSTO_LAHDE = readFileSync(new URL('../js/fokusnosto.js', import.meta.url), 'utf8');
const VIRTA_LAHDE = readFileSync(new URL('../js/fokusvirta.js', import.meta.url), 'utf8');
const LIVIA_LAHDE = readFileSync(new URL('../js/livia.js', import.meta.url), 'utf8');

test('linssin käynnistys sulkee kuplat ja kelluvat kortit, pysäytys purkaa jonon', () => {
  // Sulkeminen tehdään VASTA kun ajo on pystyssä: bodyn luokka on
  // silloin paikallaan, joten portti pitää eivätkä kortit palaa.
  assert.match(MOOTTORI, /ui\.aikajana = ajo;[\s\S]{0,200}suljeKelluvat\(ui\);\n  return true;/);
  // Jokaisella kelluvalla kortilla on oma kerrosluokkansa, joten
  // jokainen suljetaan erikseen — yksi kutsu ei vie toista mukanaan.
  assert.match(MOOTTORI, /function suljeKelluvat\(ui\) \{[\s\S]{0,600}polloLinssiAlkoi\(\);[\s\S]{0,300}polloKuplatPois\(\);[\s\S]{0,300}suljeFokuskohde\(ui\);[\s\S]{0,200}suljeNostonKortti\(ui\);[\s\S]{0,200}suljeElaintaky\(ui\);[\s\S]{0,200}suljeSyvennys\(ui\);/);
  /*
   * Koukku on PURUSSA eikä pysaytaAikajana-funktiossa: "Sulje" ja
   * linssinappi menevät js/ui.js:n oman pysaytaAikajanan kautta, joka
   * kutsuu pura():a suoraan. Funktioon jätetty koukku ei siis laukeaisi
   * kertaakaan oikeassa pelissä.
   */
  assert.match(MOOTTORI, /document\.body\.classList\.remove\('aikajana-paalla'\);[\s\S]{0,600}polloLinssiPaattyi\(\);/);
  // Kytkennän tuonnit ovat oikeista moduuleista (ei omaa kopiota).
  assert.match(MOOTTORI, /import \{\n  polloKuplatPois, polloLinssiAlkoi, polloLinssikupla, polloLinssiPaattyi,\n\} from '\.\/pollo\.js';/);
  assert.match(MOOTTORI, /import \{ suljeFokuskohde \} from '\.\/fokuskohteet\.js';/);
  assert.match(MOOTTORI, /import \{ suljeNostonKortti \} from '\.\/fokusnosto\.js';/);
});

test('kartan avaajat eivät avaa mitään linssin aikana', () => {
  // Yksi apuri, jota kaikki avaajat kysyvät.
  assert.match(readFileSync(new URL('../js/ui-apurit.js', import.meta.url), 'utf8'),
    /export function linssiEstaa\(doc[\s\S]{0,200}contains\('aikajana-paalla'\)/);
  // Kohdekortti ja kohdemerkin napautus (myös kaupungin laatta merkin alta).
  assert.match(KOHTEET_LAHDE, /export function avaaFokuskohde\(ui, kohde, \{ ankkuri = null \} = \{\}\) \{[\s\S]{0,600}if \(linssiEstaa\(\)\) return false;/);
  assert.match(KOHTEET_LAHDE, /const avaa = \(tapahtuma\) => \{[\s\S]{0,300}if \(linssiEstaa\(\)\) return;/);
  // Eläintäky: kerros kysyy tätä ensin, ja tosi tarkoittaa "jo hoidettu".
  assert.match(KOHTEET_LAHDE, /export function elainmerkinNapautusLuovutettu\(ui, tapahtuma, g\) \{[\s\S]{0,600}if \(linssiEstaa\(\)\) return true;/);
  // Nosto: sekä kartan merkistä että kohdekortin napista.
  assert.match(NOSTO_LAHDE, /function avaaNosto\(ui, nosto\) \{[\s\S]{0,500}if \(linssiEstaa\(\)\) return false;/);
  assert.match(NOSTO_LAHDE, /function avaaNostonKortti\(ui, nosto\) \{[\s\S]{0,300}if \(linssiEstaa\(\)\) return false;/);
  // Pöllönappi jää näkyviin, mutta chatti ei aukea linssin päälle.
  // Chatin portti on löysempi: välinäytöksessä pulun kanssa saa keskustella (4.9.2026).
  assert.match(POLLO_LAHDE, /avaa\(\) \{[\s\S]{0,900}if \(linssiEstaaChatin\(this\.doc\)\) return;/);
});

test('Livian paljastus odottaa linssin yli eikä 90 sekunnin katto laukea sen takia', () => {
  // Paljastussarja ei katkea vaan kysyy uudelleen linssin sulkeuduttua.
  // (Äänitetty variantti kulkee sarjan mukana 6.9.2026 alkaen:
  // js/liviapuhe.js soittaa repliikin vain äänitetylle maalle.)
  assert.match(LIVIA_LAHDE, /if \(linssiEstaa\(\)\) \{\s*\n\s*paljastusAjastin = setTimeout\(\s*\n\s*\(\) => paljastusRepliikki\(ui, cityId, i, jalkeen, repliikit, variantti\),\s*\n\s*PALJASTUKSEN_LINSSIVALI,/);
  // Maadoituskommentin katto pysähtyy linssin ajaksi (muuten kommentti
  // tulisi paljastuksen päälle heti linssin sulkeuduttua).
  assert.match(VIRTA_LAHDE, /const linssissa = linssiEstaa\(\);\s*\n\s*if \(!linssissa && \(!livianPaljastusKesken\(ui\) \|\| jaljella <= 0\)\) \{ jatka\(\); return; \}/);
  assert.match(VIRTA_LAHDE, /linssissa \? jaljella : jaljella - SAAPUMISKUPLAN_PALJASTUSVALI_MS/);
  // Mannerivihje ei kuluta kertalippujaan linssin aikana.
  assert.match(LIVIA_LAHDE, /function ruutuVarattu\(doc = document\) \{[\s\S]{0,400}if \(linssiEstaa\(doc\)\) return true;/);
});

/* ==================== ENNAKKO: KARUSELLI LÄHTEE ENNEN VUOTTA ==================== */

/*
 * Omistajan tilaus 4.9.2026 aamu, sanatarkasti: *"Alareunan
 * muotokuvien siirtymisen animointi kannattaa lähteä jo vähän
 * ennakkoon liikkeelle … niin että kun kohde vuosi vaihtuu niin
 * animaatio juuri valmistuu. Alareunan animaatio saisi olla noin 2sek
 * pituinen … vasta kun muotokuva on täysikokoinen, niin sitten voi
 * päivittää sen terävän kuvan sumean tilalle."*
 *
 * Kolme asiaa, jotka rikkoutuvat hiljaa eivätkä näy lokissa:
 *
 *   1. SAAPUMISAIKA. Kello ei kulje vakionopeudella, joten ennakko on
 *      laskettava samalla profiililla (aikaSeuraavaan). Väärä luku ei
 *      kaada mitään — animaatio vain alkaa liian aikaisin tai myöhään.
 *   2. TAUKO. Jos tauon jäljellä oleva viive unohtuu, ennakko lähtee
 *      kesken lukurauhan ja kortit vaihtuvat ennen aikojaan.
 *   3. TIETOVUOTO. Ennakko saa liikuttaa VAIN kortteja: lamppu, kello,
 *      paneeli ja paikkarivi kertoisivat keksinnön ennen sen vuotta.
 */

test('aikaSeuraavaan laskee saapumisen samalla profiililla kuin ajo', () => {
  const tapahtumat = [{ vuosi: 1800 }, { vuosi: 1840 }, { vuosi: 1842 }];
  // Pitkä väli (40 vuotta): saapumiseen on selvästi yli ennakon.
  const kaukana = { vuosi: 1800 + AIKAJANA_TAUON_OSUUS, i: 0, viive: 0, alku: 1800 + AIKAJANA_TAUON_OSUUS };
  const pitka = aikaSeuraavaan(kaukana, tapahtumat);
  assert.ok(pitka > KARUSELLIN_ENNAKKO_MS, `pitkä väli ${pitka} ms ei ylitä ennakkoa`);
  // Sama luku kuin oikealla ajolla (ajaKunnesSyttyy) parin prosentin sisällä.
  const mitattu = ajaKunnesSyttyy(kaukana, tapahtumat, {}, 16).kesto;
  assert.ok(Math.abs(pitka - mitattu) < mitattu * 0.03, `laskettu ${pitka} ms vs. ajettu ${mitattu} ms`);
  // Lyhyt väli (2 vuotta) mahtuu ennakon sisään.
  const lahella = { vuosi: 1840 + AIKAJANA_TAUON_OSUUS, i: 1, viive: 0, alku: 1840 + AIKAJANA_TAUON_OSUUS };
  const lyhyt = aikaSeuraavaan(lahella, tapahtumat);
  assert.ok(lyhyt > 0 && lyhyt < KARUSELLIN_ENNAKKO_MS, `lyhyt väli ${lyhyt} ms ei ole ennakon sisällä`);
  // Kaaren viimeisestä pysäkistä ei ole seuraavaa: ei myöskään ennakkoa.
  assert.equal(aikaSeuraavaan({ vuosi: 1842, i: 2, viive: 0 }, tapahtumat), Infinity);
  assert.equal(ennakonKesto(Infinity), 0);
});

test('tauon jäljellä oleva viive lasketaan saapumisaikaan mukaan', () => {
  const tapahtumat = [{ vuosi: 1800 }, { vuosi: 1802 }];
  const taysi = { vuosi: 1800, i: 0, viive: AIKAJANA_VIIVE_MS, viiveTaysi: AIKAJANA_VIIVE_MS };
  const puolikas = { ...taysi, viive: AIKAJANA_VIIVE_MS / 2 };
  const a = aikaSeuraavaan(taysi, tapahtumat);
  const b = aikaSeuraavaan(puolikas, tapahtumat);
  assert.ok(Number.isFinite(a) && Number.isFinite(b));
  // Puolet taukoa vähemmän = puolet taukoa lyhyempi matka (± aliaskel).
  assert.ok(Math.abs((a - b) - AIKAJANA_VIIVE_MS / 2) < 8 * AIKAJANA_ALIASKEL_MS, `ero ${a - b} ms`);
  // Kesken tauon ennakko ei vielä ala, sen lopussa alkaa.
  assert.equal(ennakonKesto(a), 0);
  assert.ok(ennakonKesto(aikaSeuraavaan({ ...taysi, viive: 200 }, tapahtumat)) > 0);
});

test('ennakko alkaa vasta kahden sekunnin päässä ja kestää jäljellä olevan ajan', () => {
  assert.equal(KARUSELLIN_ENNAKKO_MS, 2000);
  // Kaukana: ei ennakkoa. Rajalla: täysi kesto. Sisällä: jäljellä oleva aika.
  assert.equal(ennakonKesto(KARUSELLIN_ENNAKKO_MS + 1), 0);
  assert.equal(ennakonKesto(KARUSELLIN_ENNAKKO_MS), KARUSELLIN_ENNAKKO_MS);
  assert.equal(ennakonKesto(1200), 1200);
  // Lähekkäiset pysäkit ja pysäytetystä kellosta jatkaminen: pohjakesto.
  assert.equal(ennakonKesto(30), KARUSELLIN_ENNAKKO_POHJA_MS);
  assert.equal(ennakonKesto(0), KARUSELLIN_ENNAKKO_POHJA_MS);
  assert.ok(KARUSELLIN_ENNAKKO_POHJA_MS >= 400, 'pohjakesto ei saa olla hyppäys');
});

test('ennakko liikuttaa vain kortteja; lamput, kello ja paneeli vaihtuvat syttymisessä', () => {
  // Kehys laskee saapumisajan ja aloittaa ennakon vain kun sitä ei ole.
  assert.match(MOOTTORI, /if \(syttyi !== null\) this\.sytyta\(syttyi\);\s*\n\s*else if \(!this\.luentaSoi\(\)\) \{ this\.tarkistaEnnakko\(tahti\); this\.tarkistaKameraEnnakko\(tahti\); \}/);
  // Selostaja saa puhua loppuun: tauko pidätetään luennan ajan (omistaja 4.9.2026).
  assert.match(MOOTTORI, /pidataTaukoaLuennalle\(\) \{[\s\S]{0,700}vuosi: Math\.floor\(this\.tila\.vuosi\),\s*\n\s*viive: LUENNAN_TAUKOVARA_MS,\s*\n\s*viiveTaysi: LUENNAN_TAUKOVARA_MS,/);
  assert.match(MOOTTORI, /this\.pidataTaukoaLuennalle\(\);\s*\n\s*const \{ tila, syttyi, loppu \} = aikajanaAskel/);
  assert.match(MOOTTORI, /tarkistaEnnakko\(tahti\) \{[\s\S]{0,900}aikaSeuraavaan\(this\.tila, this\.tapahtumat, tahti, KARUSELLIN_ENNAKKO_MS \+ AIKAJANA_ALIASKEL_MS\)/);
  assert.match(MOOTTORI, /tarkistaEnnakko\(tahti\) \{[\s\S]{0,900}if \(kesto > 0\) this\.aloitaEnnakko\(kohde, kesto\);/);
  // Reduced motion ei ennakoi lainkaan.
  assert.match(MOOTTORI, /tarkistaEnnakko\(tahti\) \{\s*\n\s*if \(this\.reducedMotion\) return;/);
  // Ennakko koskee VAIN nauhaa: kesto menee nauhan omaan muuttujaan.
  assert.match(MOOTTORI, /aloitaEnnakko\(kohde, kesto\) \{[\s\S]{0,400}this\.nauha\.style\.setProperty\('--aikajana-kesto', `\$\{Math\.round\(kesto\)\}ms`\);/);
  const ennakko = MOOTTORI.match(/aloitaEnnakko\(kohde, kesto\) \{[\s\S]*?\n {2}\}/)[0];
  for (const kielletty of ['asetaValonTila', 'vaihdaPaneeli', 'paikkarivi', 'naytaVuosi']) {
    assert.ok(!ennakko.includes(kielletty), `ennakko ei saa koskea: ${kielletty}`);
  }
  // Syttyminen päättää ennakon; pysäytys ja alustus peruvat sen.
  assert.match(MOOTTORI, /this\.paattaEnnakko\(\);\s*\n\s*this\.asettele\(\);\s*\n\s*\}/);
  assert.match(MOOTTORI, /pysayta\(\) \{[\s\S]{0,300}this\.peruEnnakko\(\);/);
  assert.ok(metodi('alusta').includes('this.paattaEnnakko();'), 'Alusta ei päätä ennakkoa');
  // Karuselli saa olla kelloa edellä: asettelu lukee ennakon kohteen.
  assert.match(MOOTTORI, /const nyt = this\.ennakkoKohde \?\? this\.tila\.i;/);
});

test('sumea muotokuva vaihtuu terävään vasta kortin ollessa täysikokoinen', () => {
  // Vaihto tulee siirtymän päätöksestä (transform, ei opacity) tai syttymisestä.
  assert.match(MOOTTORI, /odotaTaysikokoista\(kohde\) \{[\s\S]{0,900}kortti\.addEventListener\('transitionend', teravoita\);/);
  assert.match(MOOTTORI, /if \(e\?\.propertyName && e\.propertyName !== 'transform'\) return;/);
  // Peruttu ennakko ei terävöi: kortti on takaisin tulevana ja sumeana.
  assert.match(MOOTTORI, /if \(!kortti\?\.classList\.contains\('nykyinen'\)\) return;/);
  // Terävä osoite menee saman dekoodaavan vaihdon kautta kuin muutkin.
  assert.match(MOOTTORI, /teravoitaKortti\(i\) \{[\s\S]{0,600}vaihdaKorttikuva\(img, img\.dataset\.terava\)/);
  // Kuuntelija irrotetaan aina, ettei vanha kortti jää odottamaan.
  assert.match(MOOTTORI, /lopetaTeravoitus\(\) \{[\s\S]{0,300}removeEventListener\('transitionend', this\.teravoitus\.teravoita\)/);
});

/* ==================== LÄHIKUVA JA ENNAKOIVA KAMERA (5.9.2026 ilta) ==================== */

/*
 * Omistaja työpöytäselaimella, sanatarkasti: *"zoomaa maapallo näin
 * lähelle mutta liikuta palloa pehmeästi ja hieman jo ennakoiden kohti
 * uutta valopalloa niin että kun valopallo syttyy kartan liike loppuu
 * vasta vähän sen jälkeen."* Luvut ovat mitta, ja mitta rikkoutuu
 * hiljaa: muutos leveydessä ei kaada mitään, se vain vie kuvan väärälle
 * etäisyydelle.
 */

test('lähikuva on omistajan mitta: mitattu 1 525 km ruudun leveydellä', () => {
  /*
   * LUKU ON MITATTU SELAIMESSA, EI LASKETTU KAAVASTA. Ensimmäinen mitta
   * oli 260, koska korkeusLeveydesta asetti pyydetyn leveyden ruudun
   * KORKEUDELLE (fov on pystykulma) ja vaakakaista oli työpöydällä
   * 1,7-kertainen. Kaava sai kuvasuhteen 5.9.2026 yöllä
   * (js/pallolauta/kamera.js), ja luku kalibroitiin uudelleen niin, että
   * RUUDULLA NÄKYVÄ KAISTA ON SAMA KUIN ENNEN: mitattu Chromiumilla
   * 1400 × 900 korjauksen jälkeen 260 → 898 km, 400 → 1 403 km,
   * 434 → n. 1 525 km, 450 → 1 588 km. Vartija pitää mitatun luvun
   * paikallaan: jos kaavaa tai avauskulmaa muutetaan, mittaus on tehtävä
   * uudestaan.
   */
  assert.equal(AIKAJANAN_LAHIKUVA_LEVEYS, 434);
  // Ei koskaan laattojen tarkkuusrajan alle (js/pallolauta/kamera.js
  // PALLOLAUDAN_SIIRTOLEVEYS = 120 on lähin sallittu näkymä).
  assert.ok(AIKAJANAN_LAHIKUVA_LEVEYS > PALLOLAUDAN_SIIRTOLEVEYS, 'lähikuva menee laattojen tarkkuuden alle');
  // Ja selvästi lähempänä kuin koko kaaren rajaus (Eurooppa ≈ 2 000 yks.).
  assert.ok(AIKAJANAN_LAHIKUVA_LEVEYS < 1200, 'lähikuva ei ole lähikuva');
  // Pyydetty kaista asteina — sama luku kuin toteutusmerkinnässä.
  const asteet = (AIKAJANAN_LAHIKUVA_LEVEYS / 12000) * 360;
  assert.ok(Math.abs(asteet - 13) < 0.2, `pyydetty kaista ${asteet}°`);
});

/*
 * ENNAKKO ON 80 % PYSÄKIN KESTOSTA (omistaja 6.9.2026 keskipäivä:
 * *"se saisi liikkua jo aiemmin ja pidemmän aikaa piirtäen viivaa
 * seuraavaan paikkaan"*). Aamun 40 % jätti kartan seisomaan neljä
 * viidesosaa pysäkkivälistä; nyt liike alkaa jo pysäkin lukuajan
 * lopulla ja täyttää lähes puolet välistä.
 */
test('kameran ennakko on 80 % pysäkin kestosta ja ajo päättyy ennen syttymistä', () => {
  assert.equal(AIKAJANAN_KAMERAN_ENNAKKO_OSUUS, 0.8);
  assert.equal(AIKAJANAN_KAMERAN_ENNAKKO_MS, Math.round(AIKAJANA_VIIVE_MS * 0.8));
  // Ajo on selvästi pidempi kuin ennen: pysäkkiväli on tauko + matka
  // (4 600 + 2 600 ms), ja ajon osuus siitä yli kolmanneksen.
  const vali = AIKAJANA_VIIVE_MS + 10 * 260;
  const ajo = AIKAJANAN_KAMERAN_ENNAKKO_MS + AIKAJANAN_KAMERAN_JALKIJATTO_MS;
  assert.ok(ajo / vali > 0.35, `ajo täyttää vain ${Math.round((ajo / vali) * 100)} % välistä`);
  // Omistaja 6.9.2026: "Kamera pysähtyy ennen syttymistä" — jälkijättö
  // negatiivinen, 200–400 ms ennen valoa.
  assert.ok(AIKAJANAN_KAMERAN_JALKIJATTO_MS <= -200 && AIKAJANAN_KAMERAN_JALKIJATTO_MS >= -400);
  assert.ok(AIKAJANAN_KAMERAN_POHJA_MS >= 600, 'lyhinkin ajo ei saa olla hyppäys');
  // Tavallisella ennakolla ajo päättyy ennen syttymistä; vain hyvin
  // lähellä syttyvä valo (alle pohjakeston) saa ajon jatkumaan sen yli.
  for (const eta of [1200, AIKAJANAN_KAMERAN_ENNAKKO_MS]) {
    const kesto = Math.max(AIKAJANAN_KAMERAN_POHJA_MS, eta + AIKAJANAN_KAMERAN_JALKIJATTO_MS);
    assert.ok(kesto < eta, `eta ${eta} ms: ajon pitäisi päättyä ennen syttymistä`);
  }
});

test('kameran pehmennys lähtee ja pysähtyy nollanopeudella', () => {
  const p = aikajananKameranPehmennys;
  assert.equal(p(0), 0);
  assert.equal(p(1), 1);
  assert.equal(p(0.5), 0.5, 'käyrä ei ole symmetrinen');
  // Nolla nopeus päissä: ensimmäinen ja viimeinen prosentti liikkuu
  // murto-osan tasaisesta vauhdista — ei nykäisyä kummassakaan päässä.
  assert.ok(p(0.01) < 0.001 && 1 - p(0.99) < 0.001);
  // Monotoninen: kamera ei peruuta kesken ajon.
  let edellinen = -1;
  for (let t = 0; t <= 1.0001; t += 0.02) {
    const arvo = p(t);
    assert.ok(arvo >= edellinen, `käyrä peruuttaa kohdassa ${t}`);
    edellinen = arvo;
  }
  assert.equal(p(-1), 0);
  assert.equal(p(2), 1);
});

test('kamera seuraa pysäkkejä vain pallolla ja ajo alkaa lähikuvasta', () => {
  assert.match(metodi('ajaPysakille'), /if \(!this\.pallolla \|\| !kamera\?\.ajaKamera\) return Promise\.resolve\(false\);/);
  // PERILLÄ LEVEYS ON AINA KAAREN PERUSMITTA (omistaja 6.9.2026
  // keskipäivä: "Kartta on liian kaukana"). Pitkä hyppy näytetään
  // liikkeellä eikä nostamalla kameraa — nousu on kaaren huipulla.
  assert.match(metodi('ajaPysakille'), /leveys: this\.lahikuva,/);
  assert.match(metodi('hypynHuippu'), /return this\.lahikuva;/);
  assert.match(MOOTTORI, /this\.lahikuva = kaari\.lahikuva \?\? AIKAJANAN_LAHIKUVA_LEVEYS;/);
  assert.match(metodi('ajaPysakille'), /pehmennys: aikajananKameranPehmennys/);
  assert.match(metodi('sovitaAlkuun'), /if \(this\.pallolla\) \{[\s\S]{0,300}return this\.ajaPysakille\(i, kesto\);/);
  assert.match(metodi('sovitaAlkuun'), /return this\.sovitaKaareen\(kesto\);/);
  // Avausjakso ja Alusta ajavat alkunäkymään, eivät enää kaaren rajaukseen.
  assert.match(metodi('avaaAvausjakso'), /this\.sovitaAlkuun\(heti \? 0 : AVAUS_KAMERA_MS\)/);
  assert.ok(metodi('alusta').includes('this.sovitaAlkuun();'), 'Alusta ei aja alkunäkymään');
  // Ennakko lasketaan samalla puhtaalla funktiolla kuin karusellin.
  assert.match(metodi('tarkistaKameraEnnakko'), /aikaSeuraavaan\(this\.tila, this\.tapahtumat, tahti, AIKAJANAN_KAMERAN_ENNAKKO_MS \+ AIKAJANA_ALIASKEL_MS\)/);
  assert.match(metodi('tarkistaKameraEnnakko'), /Math\.max\(AIKAJANAN_KAMERAN_POHJA_MS, eta \+ AIKAJANAN_KAMERAN_JALKIJATTO_MS\)/);
  // Tasokartallakin ajetaan, jos kaari piirtää reittiviivan: kamera ei
  // liiku, mutta viiva kasvaa kohti seuraavaa paikkaa samaa tahtia.
  assert.match(metodi('tarkistaKameraEnnakko'), /if \(this\.reducedMotion\) return;\n\s*if \(!this\.pallolla && !this\.reittiOsat\) return;/);
  // Kaaren lopussa kamera peräytyy koko kaareen: loppusanat lupaavat
  // kaikki valot, eikä lähikuvassa näkyisi kuin yksi.
  assert.match(metodi('lopeta'), /if \(this\.pallolla\) \{\n\s*this\.kameraKohde = null;\n\s*this\.sovitaKaareen\(\);/);
  // Terävä tila pyydetään käynnistyksessä ja vapautetaan purussa.
  assert.ok(metodi('kaynnista').includes('this.pakotaLaatu(true);'), 'käynnistys ei pakota terävää tilaa');
  assert.ok(PURA.includes('this.pakotaLaatu(false);'), 'purku ei vapauta terävää tilaa');
  assert.match(metodi('pakotaLaatu'), /if \(!this\.pallolla \|\| paalla === this\.laatuPakotettu\) return;/);
  assert.match(MOOTTORI, /import \{ pakotaPallonLaatu \} from '\.\/pallo\.js';/);
});

/* ============ HAVAINNEKUVAT ETUKÄTEEN JA VALOKEILAN REUNA (5.9.2026 ilta) ============ */

test('havainnekuvat esiladataan kahdelle seuraavalle pysäkille ja paneeli käyttää valmista oliota', () => {
  assert.equal(PANEELIN_ESILATAUS_PYSAKKEJA, 2);
  // Esilataus osuu SIIHEN osoitteeseen, jonka paneeli pyytää.
  const ilmio = { osoite: `${KEKSINTO_KUVAJUURI}/1769-watt.jpg` };
  assert.equal(paneelikuvanOsoite(ilmio, 640), pieniOsoite(ilmio.osoite));
  assert.equal(paneelikuvanOsoite({ osoite: 'https://x.test/a/muotokuva/b.jpg' }, 400),
    karuselliOsoite('https://x.test/a/muotokuva/b.jpg'));
  assert.equal(paneelikuvanOsoite({ osoite: 'https://x.test/iso.jpg', ulkoinen: true }, 640), 'https://x.test/iso.jpg');
  assert.equal(paneelikuvanOsoite({ tiedosto: 'Watt.jpg' }, 640), null);
  assert.equal(paneelikuvanOsoite(null, 640), null);

  const valmista = metodi('valmistaSeuraavat');
  assert.match(valmista, /for \(let n = 1; n <= PANEELIN_ESILATAUS_PYSAKKEJA; n \+= 1\)/);
  assert.match(valmista, /paneelikuvanOsoite\(t\.ilmio, 640, this\.pienetKuvat\)/);
  assert.match(valmista, /paneelikuvanOsoite\(t\.kuva, 400, this\.pienetKuvat\)/);
  // Jono siirtyy pysäkin vaihtuessa ja käynnistyksessä.
  assert.ok(metodi('kaynnista').includes('this.valmistaSeuraavat(-1);'));
  assert.ok(metodi('sytyta').includes('this.valmistaSeuraavat(i);'));
  assert.ok(metodi('siirry').includes('this.valmistaSeuraavat(i);'));
  // Varasto: lataus JA dekoodaus, katto ja yksi otto per osoite.
  assert.match(MOOTTORI, /if \(typeof kuva\.decode === 'function'\) kuva\.decode\(\)\.then\(merkitse, merkitse\);/);
  assert.match(MOOTTORI, /while \(kuvat\.size >= katto\) kuvat\.delete\(kuvat\.keys\(\)\.next\(\)\.value\);/);
  assert.ok(KUVAVARASTON_KATTO >= 6, 'katto ei mahduta kahta pysäkkiä');
  // Paneeli ottaa valmiin olion eikä lataa uudestaan eikä odota dekoodausta.
  assert.match(MOOTTORI, /const esiladattu = varasto\?\.ota\?\.\(paneelikuvanOsoite\(kuvatieto, leveys, pienet\)\) \?\? null;/);
  assert.match(MOOTTORI, /const kuva = esiladattu \?\? document\.createElement\('img'\);/);
  assert.match(MOOTTORI, /const valmis = kuva && !esiladattu && typeof kuva\.decode === 'function'/);
  assert.match(metodi('vaihdaPaneeli'), /kuvaTaiLaatta\(\n\s*t\.ilmio, t\.otsikko, 640, 'aikajana-ilmiokuva', this\.paneelikuvat, this\.pienetKuvat,\n\s*\)/);
  // Purku tyhjentää varaston: valmiit oliot eivät jää elämään.
  assert.ok(PURA.includes('this.paneelikuvat.tyhjenna();'));
});

test('valokeilan maski on epäsäännöllinen, deterministinen ja pysyy laatikon sisällä', () => {
  const maski = valokeilanMaski(3);
  // Sama siemen, sama muoto — myös taaksepäin selatessa.
  assert.equal(maski, valokeilanMaski(3));
  assert.notEqual(maski, valokeilanMaski(4), 'kuvat saavat saman reunan');
  // Monta soikiota eri keskipisteissä (pohja + lohkot).
  const kerroksia = maski.split('radial-gradient').length - 1;
  assert.equal(kerroksia, VALOKEILAN_LOHKOT + 1);
  const keskipisteet = [...maski.matchAll(/at ([\d.]+)% ([\d.]+)%/g)].map((m) => [Number(m[1]), Number(m[2])]);
  assert.equal(keskipisteet.length, kerroksia);
  const eriPisteita = new Set(keskipisteet.map((k) => k.join(','))).size;
  assert.ok(eriPisteita >= VALOKEILAN_LOHKOT, 'lohkot ovat päällekkäin: reuna olisi säännöllinen');
  // EI KOVAA REUNAA: jokainen soikio häipyy nollaan ennen laatikon laitaa.
  const lohkot = maski.split('radial-gradient(').slice(1).map((osa) => {
    const muoto = /ellipse ([\d.]+)% ([\d.]+)% at ([\d.]+)% ([\d.]+)%/.exec(osa);
    const loppu = /transparent ([\d.]+)%/.exec(osa);
    assert.ok(muoto && loppu, `kerros ilman soikiota tai läpinäkyvää loppua: ${osa.slice(0, 60)}`);
    return {
      rx: Number(muoto[1]), ry: Number(muoto[2]), cx: Number(muoto[3]), cy: Number(muoto[4]), loppu: Number(loppu[1]),
    };
  });
  assert.equal(lohkot.length, kerroksia, 'jokaisella kerroksella ei ole läpinäkyvää loppua');
  for (const {
    rx, ry, cx, cy, loppu,
  } of lohkot) {
    const ulottuvuus = loppu / 100;
    assert.ok(cx + rx * ulottuvuus <= 100.001, `soikio ${cx}±${rx} leikkautuu vaakasuunnassa`);
    assert.ok(cx - rx * ulottuvuus >= -0.001, `soikio ${cx}±${rx} leikkautuu vaakasuunnassa`);
    assert.ok(cy + ry * ulottuvuus <= 100.001, `soikio ${cy}±${ry} leikkautuu pystysuunnassa`);
    assert.ok(cy - ry * ulottuvuus >= -0.001, `soikio ${cy}±${ry} leikkautuu pystysuunnassa`);
  }
  // Reuna kumpuilee: kaikki lohkot eivät ole laatikon keskellä.
  assert.ok(keskipisteet.some(([x, y]) => Math.abs(x - 50) > 3 || Math.abs(y - 50) > 3), 'maski on yhä keskitetty');
  // EI SUODATTIMIA (iPad): maski on pelkkiä liukuvärejä.
  assert.ok(!/filter|feTurbulence|url\(/.test(maski), 'maski käyttää suodatinta tai kuvaa');
  // Muoto lasketaan tapahtuman indeksistä ja annetaan css:lle muuttujana.
  assert.match(metodi('vaihdaPaneeli'), /kehys\.style\.setProperty\('--aikajana-valokeila', valokeilanMaski\(t\.n \?\? t\.vuosi \?\? 0\)\);/);
  assert.match(AIKAJANA_CSS, /-webkit-mask-image: var\(--aikajana-valokeila,/);
});

/* ==================== YLÄPALKKI ON VUOSILUVUN KORKUINEN ==================== */

test('yläpalkki on vuosinumeroiden korkuinen: kosketuskorkeus purettu, napit kellon mittaan', () => {
  // Pelin yleinen `@media (pointer: coarse) { button { min-height: 46px } }`
  // venytti kellon ja napit puhelimella yli kaksinkertaisiksi.
  assert.match(AIKAJANA_CSS, /\.aikajana-kello \{[\s\S]*?min-height: 0;/);
  assert.match(AIKAJANA_CSS, /\.aikajana-nappi \{[\s\S]*?min-height: 0;/);
  // Napit saavat korkeutensa riviltä, eivät omasta pehmusteestaan.
  assert.match(AIKAJANA_CSS, /\.aikajana-ohjaimet \{ display: flex; align-self: stretch; align-items: stretch;/);
  // Palkin pystypehmuste on hiuksenohut sekä leveällä että kapealla ruudulla.
  const ylarivi = AIKAJANA_CSS.match(/\.aikajana-ylarivi \{[\s\S]*?\n\}/)[0];
  const pysty = ylarivi.match(/padding: ([\d.]+)rem/);
  assert.ok(pysty && Number(pysty[1]) <= 0.16, `ylärivin pystypehmuste ${pysty?.[1]}rem on liian iso`);
  // Kapean ruudun sääntö on nyt monirivinen (palkki keskitetään takaisin).
  assert.match(AIKAJANA_CSS, /\.aikajana-ylarivi \{\s*gap: [\d.]+rem;\s*padding: 0\.15rem/);
  // Kaksi otsikkoriviä eivät saa nostaa palkkia kellon yli.
  assert.match(AIKAJANA_CSS, /\.aikajana-otsikko \{[\s\S]*?line-height: 1\.1;/);
  assert.match(AIKAJANA_CSS, /\.aikajana-paikka \{[\s\S]*?line-height: 1\.15;/);
});

/* ==================== KARTTA ON LINSSIN AJAN TYHJÄ TAULU ==================== */

test('linssi häivyttää kartan omat merkit eikä jätä napautettavia jälkiä', () => {
  const STYLES = readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');
  const lohko = STYLES.match(/body\.aikajana-paalla \.fokuskohteet[\s\S]*?pointer-events: none;\n\}/g);
  assert.ok(lohko && lohko.length >= 1, 'body.aikajana-paalla ei piilota kartan merkkejä');
  const kaikki = lohko.join('\n');
  for (const merkki of ['.fokuskohteet', '.elaintakyt', '.karttanimi-kohde', '.karttanimi-nosto']) {
    assert.ok(kaikki.includes(`body.aikajana-paalla ${merkki}`), `${merkki} jää näkyviin linssin ajaksi`);
  }
  // Osuma-alat ovat itse `pointer-events: all`, joten lapsetkin vaietaan.
  assert.match(kaikki, /body\.aikajana-paalla \.fokuskohteet \*,/);
  assert.match(kaikki, /body\.aikajana-paalla \.elaintakyt \*,/);
  assert.match(kaikki, /body\.aikajana-paalla \.karttanimet \*/);
  // Häivytys, ei leikkaus — ja palautuu kun luokka lähtee bodylta.
  assert.match(kaikki, /transition: opacity 0\.5s ease;/);
  assert.match(MOOTTORI, /document\.body\.classList\.remove\('aikajana-paalla'\)/);
});

test('rikkinäinen karttalaatta ei maalaa selaimen kysymysmerkkiä kartalle', () => {
  // WebKit piirtää saapumattoman <image>-elementin tilalle sinisen
  // laatikon ja kysymysmerkin, venytettynä laatan koko alaan
  // (omistajan kuvakaappaus 4.9.2026). Osoitteen poisto vie merkin.
  const PYRAMIDI = readFileSync(new URL('../js/laattapyramidi.js', import.meta.url), 'utf8');
  assert.match(PYRAMIDI, /mittarit\.epaonnistui \+= 1;[\s\S]{0,1600}kuva\.removeAttribute\('href'\);/);
});


/* ==================== AVAUSJAKSO ==================== */

/*
 * Omistajan tilaus 4.9.2026 aamu: linssi alkaa mustasta ruudusta,
 * jonka päällä on kaaren esittely ja Käynnistä-nappi. Kello ei käy
 * ennen nappia, kartta sumenee peitteen backdrop-filterillä (ei
 * kartan omalla filterillä) ja tummennus on aiempaa syvempi.
 */

test('käynnistys ei päästä kelloa liikkeelle: vain Käynnistä-nappi kutsuu jatkan', () => {
  const kaynnista = MOOTTORI.match(/\n  kaynnista\(\) \{[\s\S]*?\n  \}/)[0];
  assert.ok(!kaynnista.includes('this.jatka()'), 'kaynnista ei saa käynnistää kelloa itse');
  assert.ok(kaynnista.includes('this.avaaAvausjakso()'), 'kaynnista avaa avausjakson');
  // Linssin omat elementit odottavat mustan alla.
  assert.match(kaynnista, /this\.juuri\.classList\.add\('avaus-piilossa'\)/);
  // Musiikki alkaa hiljaa; täysi taso tulee vasta napista.
  assert.match(kaynnista, /this\.aloitaMusiikki\(false\)/);
  const aloita = MOOTTORI.match(/\n  aloitaAjo\(\) \{[\s\S]*?\n  \}/)[0];
  assert.match(aloita, /this\.jatka\(\);/);
  assert.match(aloita, /this\.aloitaMusiikki\(true\);/);
  assert.match(aloita, /classList\.add\('pois'\)/);
  // Toinen painallus ei tee mitään: jakso on jo ohi.
  assert.match(aloita, /if \(!this\.avausKesken\) return;/);
});

test('avausjakson esittely tulee datasta eikä koodista', () => {
  const esittely = LINSSI.aikajana.esittely;
  assert.ok(esittely, 'keksintölinssiltä puuttuu aikajana.esittely');
  assert.ok(esittely.otsikko?.length > 5, 'esittelyn otsikko puuttuu');
  assert.ok(esittely.teksti?.length > 40, 'esittelyn selite puuttuu');
  assert.match(esittely.otsikko, /1765/);
  // Moottori lukee kentän eikä kirjoita omia sanojaan laatikkoon.
  assert.match(MOOTTORI, /const esittely = this\.kaari\.esittely \?\? \{\};/);
  assert.match(MOOTTORI, /esittely\.otsikko \?\? this\.kaari\.otsikko/);
  assert.match(MOOTTORI, /if \(esittely\.teksti\) laatikko\.appendChild/);
});

/*
 * PEITE PYSYY TÄYSIN MUSTANA (omistaja 6.9.2026 keskipäivä, iPhone:
 * *"Ladattaessa taustalle ilmestyi haaleasti jotain. Saisi olla
 * kokonaan musta tausta että takana ei näy mitään."*). Tämä vartija
 * väitti aiemmin päinvastaista — että keskimmäinen vaihe ohentaa
 * peitteen ja sumentaa kartan backdrop-filterillä. Väite on käännetty,
 * ei poistettu: sumea vaihe ei saa palata takaovesta.
 */
test('avauksen peite on täysin musta Käynnistä-nappiin asti', () => {
  const lohko = AIKAJANA_CSS.match(/\.aikajana-avaus \{[\s\S]*?\.aikajana-avaus-nappi:active[^\n]*\n/)[0];
  // Ei suodattimia lainkaan: kartan oma filter jäi iOS-kuoressa tyhjäksi
  // kerrokseksi, ja sumennettavaa ei enää ole.
  assert.ok(!/[^-]\bfilter: blur/.test(lohko), 'avaus ei saa käyttää pelkkää filter: bluria');
  assert.ok(!lohko.includes('backdrop-filter'), 'avausjaksossa ei saa olla sumennusta');
  assert.ok(!AIKAJANA_CSS.includes('aikajana-avaus-sumennin'), 'sumenninkerros poistui sumean mukana');
  assert.ok(!AIKAJANA_CSS.includes('.aikajana-avaus.sumea'), 'sumea vaihe ei saa palata');
  // (Karusellin sumeat pikkukuvat ovat eri asia: siellä `sumea` on tiedostopolku.)
  assert.ok(!MOOTTORI.includes('avausSumennin'), 'moottorissa ei ole sumenninkerrosta');
  assert.ok(!MOOTTORI.includes("classList.add('sumea')"), 'moottorissa ei ole sumeaa vaihetta');
  assert.ok(!MOOTTORI.includes('sumennaTausta'), 'sumennaTausta korvattiin valmistaTaustaPimeassa-metodilla');
  // Peite on puhdas musta ja täysin läpinäkymätön mustassa vaiheessa.
  const peite = lohko.match(/\.aikajana-avaus-peite \{[\s\S]*?\n\}/)[0];
  assert.match(peite, /background-color: #000;/);
  assert.ok(!peite.includes('backdrop-filter'), 'värikerros ei saa kantaa suodatinta');
  assert.match(lohko, /\.aikajana-avaus\.musta \.aikajana-avaus-peite \{ opacity: 1; \}/);
  assert.match(lohko, /\.aikajana-avaus\.pois \.aikajana-avaus-peite \{ opacity: 0; \}/);
  // Peite on linssin muiden kerrosten yläpuolella (.aikajana on 7).
  const z = Number(lohko.match(/z-index: (\d+)/)[1]);
  assert.ok(z > 7, `peitteen z-index ${z} ei nouse linssin yli`);
  // Musta ensin, pois viimeisenä (järjestys ratkaisee).
  assert.ok(lohko.indexOf('.musta') < lohko.indexOf('.pois'));
  // Peite piirretään ennen laatikon kehystä, jotta paperi jää sen päälle.
  assert.match(MOOTTORI, /this\.avaus\.append\(this\.avausPeite, kehys\);/);
  /*
   * LINSSIN JUURI PALJASTETAAN MUSTAN ALLA: entinen sumennaTausta on
   * nyt valmistaTaustaPimeassa eikä se lisää yhtään luokkaa peitteeseen.
   */
  const valmista = metodi('valmistaTaustaPimeassa');
  assert.match(valmista, /this\.naytaLinssi\(\);/);
  assert.ok(!valmista.includes('classList'), 'taustan valmistus ei saa muuttaa peitteen tilaa');
});

/*
 * PULU POIS AVAUKSEN AJAKSI (omistaja 6.9.2026: *"Pulu voi olla pois
 * tästä näkymästä."*). Kelluva pöllönappi elää kartan kerrosten
 * ulkopuolella, joten se piilotetaan body-luokalla kuten lennossa.
 */
test('pöllönappi ja sen paneeli väistyvät avausjakson ajaksi', () => {
  assert.match(metodi('avaaAvausjakso'), /this\.merkitseAvausRuutuun\(true\);/);
  // Luokka poistuu KAIKISSA poluissa: Käynnistä ja purku (myös kesken avauksen).
  assert.match(metodi('aloitaAjo'), /this\.merkitseAvausRuutuun\(false\);/);
  assert.match(metodi('puraAvaus'), /this\.merkitseAvausRuutuun\(false\);/);
  assert.match(metodi('merkitseAvausRuutuun'), /classList\.toggle\('aikajana-avaus-auki', paalla\)/);
  assert.ok(PURA.includes('this.puraAvaus();'), 'purku ei pura avausjaksoa');
  // Sääntö asuu styles.css:ssä samassa kohdassa kuin lennon vastaava.
  const saanto = STYLES.match(/body\.aikajana-avaus-auki \.pollo-nappi,\n\s*body\.aikajana-avaus-auki \.pollo-paneeli \{[\s\S]*?\n\}/)[0];
  assert.match(saanto, /opacity: 0;/);
  assert.match(saanto, /pointer-events: none;/);
  assert.match(saanto, /transition: opacity 0\.3s ease;/);
});

/*
 * KÄYNNISTÄ EROTTUU PAPERISTA (omistaja 6.9.2026: *"Nappi saisi olla
 * näkyvämpi."*). Entinen nappi oli lähes läpinäkyvä kehys paperin
 * omalla musteella; nyt se on täytetty tumma mustenappi kultareunalla
 * ja vaalealla tekstillä.
 */
test('Käynnistä-nappi on täytetty eikä läpinäkyvä kehys', () => {
  const nappi = AIKAJANA_CSS.match(/\.aikajana-avaus-nappi \{[\s\S]*?\n\}/)[0];
  assert.ok(!/background: rgba\(60, 40, 16, 0\.1\)/.test(nappi), 'haalea täyte poistui');
  // Täyte on tumma muste (kirkkaus selvästi paperin #d9c69c alapuolella).
  const [, r, g, b] = nappi.match(/background: linear-gradient\(180deg, rgba\((\d+), (\d+), (\d+), [\d.]+\)/).map(Number);
  assert.ok(0.299 * r + 0.587 * g + 0.114 * b < 90, `täyte ${r},${g},${b} ei ole tumma`);
  // Reunus on kultaa ja teksti vaaleaa pergamenttia.
  assert.match(nappi, /border: 1\.5px solid rgba\(214, 168, 84, 0\.92\);/);
  assert.match(nappi, /color: #f6e6c2;/);
  // Kevyt kultahehku ja kosketuskohteen alaraja.
  assert.match(nappi, /box-shadow:[\s\S]*?rgba\(226, 168, 78, 0\.3\)/);
  assert.match(nappi, /min-height: 44px;/);
  // Kirjainkoko ja välistys entistä isommat.
  assert.ok(Number(nappi.match(/font-size: ([\d.]+)rem;/)[1]) >= 1.0, 'kirjainkoko ei kasvanut');
  assert.ok(Number(nappi.match(/letter-spacing: ([\d.]+)em;/)[1]) >= 0.15, 'välistys ei kasvanut');
  // Hover ja focus-visible ovat mukana, samoin näkyvä fokusrengas.
  assert.match(AIKAJANA_CSS, /\.aikajana-avaus-nappi:hover,\n\.aikajana-avaus-nappi:focus-visible \{/);
  assert.match(AIKAJANA_CSS, /\.aikajana-avaus-nappi:focus-visible \{ outline: /);
});

/*
 * PAPERI ON ELÄVÄ (omistaja 6.9.2026: *"Paperi taustalla saisi olla
 * elävämmän näköinen reunoiltaan ja tekstuuriltaan."*). Reunat
 * repaleiset, tekstuuri kaksikerroksinen kohina, läiskät omana
 * kerroksenaan — eikä yhtään uutta kuvatiedostoa.
 */
test('avauslaatikon paperi on repaleinen ja tekstuuriltaan monikerroksinen', () => {
  const avaus = AIKAJANA_CSS.match(/\.aikajana-avaus-laatikko \{[\s\S]*?\n\}/)[0];
  // 1. Repaleinen reuna: monikulmio, ei suorakaide eikä pyöristys.
  const monikulmio = avaus.match(/clip-path: polygon\(([\s\S]*?)\);/)[1];
  assert.ok(monikulmio.split(',').length >= 24, 'reunassa on liian vähän pisteitä ollakseen repaleinen');
  assert.ok(!avaus.includes('border-radius'), 'repaleinen paperi ei ole pyöristetty suorakaide');
  // 2. Kaksi kohinakerrosta (hieno kuitu ja karkea kellastuma), multiply.
  assert.equal((avaus.match(/feTurbulence/g) ?? []).length, 2, 'kohinaa pitää olla kaksi eri karkeutta');
  assert.match(avaus, /background-blend-mode: multiply, multiply, normal, normal;/);
  assert.ok(!avaus.includes('filter: '), 'kohina tulee kuvana, ei CSS-suodattimena (iOS-kuori)');
  // 3. Läiskät ja kellastumat omana kerroksenaan lyhtyjen alla.
  const laiskat = AIKAJANA_CSS.match(/\.aikajana-avaus-laatikko::before \{[\s\S]*?\n\}/)[0];
  assert.ok((laiskat.match(/radial-gradient/g) ?? []).length >= 6, 'läiskiä on liian vähän');
  assert.match(laiskat, /mix-blend-mode: multiply;/);
  assert.match(laiskat, /z-index: 0;/);
  // Kellastunut reunavyö useampana inset-kerroksena.
  assert.ok((avaus.match(/inset 0 0 \d+px/g) ?? []).length >= 3, 'reunavyö tarvitsee useamman kerroksen');
});

/*
 * VALON VASTAKOHTA (omistaja 6.9.2026: lisää tunnelmaa ja elävyyttä).
 * Varjo syvenee, kun liekit vaimenevat, ja laatikon ulkopuolinen kajo
 * sykkii samassa tahdissa — laatikko on ainoa valonlähde pimeässä.
 */
test('laatikon varjo ja ulkokajo hengittävät lyhtyjen tahdissa', () => {
  const varjo = AIKAJANA_CSS.match(/\.aikajana-avaus-laatikko::after \{[\s\S]*?\n\}/)[0];
  assert.match(varjo, /opacity: calc\(0\.55 \+ 0\.45 \* var\(--lyhty-varjo, 0\.25\)\);/);
  // Kerros on lyhtyjen päällä (sama z-index, pseudo maalataan viimeisenä).
  assert.match(varjo, /z-index: 1;/);
  // Alakulmat tummuvat omilla gradienteillaan.
  assert.ok((varjo.match(/at \d+% 100%/g) ?? []).length === 2, 'kumpikin alakulma tarvitsee oman varjon');
  /*
   * Ulkokajo asuu KEHYKSESSÄ eikä paperissa: clip-path leikkaisi
   * elementin oman box-shadow'n pois.
   */
  const kehys = AIKAJANA_CSS.match(/\.aikajana-avaus-kehys \{[\s\S]*?\n\}/)[0];
  assert.match(kehys, /--lyhty-varjo: 0\.25;/);
  assert.match(kehys, /--lyhty-ulko: 0\.26;/);
  assert.match(kehys, /box-shadow:[\s\S]*?rgba\(255, 170, 76, var\(--lyhty-ulko\)\)/);
  // Sisääntuloliuku siirtyi kehykselle, jotta kajo ja paperi saapuvat yhdessä.
  assert.match(AIKAJANA_CSS, /\.aikajana-avaus\.laatikko-nakyy \.aikajana-avaus-kehys \{ opacity: 1; transform: none; \}/);
  assert.match(MOOTTORI, /const kehys = solmu\('div', 'aikajana-avaus-kehys'\);/);
  assert.match(MOOTTORI, /kehys\.appendChild\(laatikko\);/);
});

test('tummennus on aiempaa syvempi: kartta erottuu juuri ja juuri', () => {
  const opacity = Number(AIKAJANA_CSS.match(/\.aikajana-tummennus\.paalla \.aikajana-tummennus-pinta \{ opacity: ([\d.]+); \}/)[1]);
  assert.ok(opacity >= 0.85, `tummennus ${opacity} ei ole omistajan pyytämällä rajalla`);
  assert.ok(opacity < 1, 'tummennus ei saa peittää karttaa kokonaan');
});

test('avausjakso vaientaa selostajan ja omii näppäimistön', () => {
  // Luenta ei soi ennen Käynnistä-nappia: syttyminen palaa siihen
  // paikkaan, jossa avausjakso on yhä kesken.
  assert.match(metodi('sytyta'), /if \(this\.avausKesken\) return;/);
  const nappain = MOOTTORI.match(/\n  nappain\(e\) \{[\s\S]*?\n  \}/)[0];
  assert.match(nappain, /if \(this\.avausKesken\) \{/);
  assert.match(nappain, /e\.key === 'Enter' \|\| e\.key === ' '/);
  assert.match(nappain, /this\.aloitaAjo\(\);/);
  assert.match(nappain, /e\.key === 'Escape'[\s\S]{0,140}this\.ui\.pysaytaAikajana\?\.\(\)/);
  // Purku vie peitteen, laatikon ja ajastimet kesken avauksenkin.
  assert.ok(PURA.includes('this.puraAvaus();'), 'purku ei pura avausjaksoa');
  assert.match(MOOTTORI, /puraAvaus\(\) \{[\s\S]*?this\.tyhjennaAvauksenAjastimet\(\);[\s\S]*?this\.avaus\?\.remove\(\);/);
  // Alusta ei näytä avausta uudelleen.
  const alusta = MOOTTORI.match(/\n  alusta\(\) \{[\s\S]*?\n  \}/)[0];
  assert.ok(!alusta.includes('avaaAvausjakso'), 'Alusta ei saa avata avausjaksoa uudestaan');
  assert.match(alusta, /this\.jatka\(\);/);
});


/* ==================== VÄLINÄYTÖS 1873 ==================== */

/*
 * Omistajan tilaus 4.9.2026 aamu, sanatarkasti: *"Kertoja voisi myös
 * kertoa vähän pidemmin isoisän kohdalla mihin pulu sitten vain
 * kommentoisi. Aika voisi pysähtyä siinä kohtaa automaattisesti …
 * Animaatio jatkuisi vasta popup tekstin alla olevasta napista. Näin
 * pitkään animaatioon tulee pieni hengähdys tauko."*
 *
 * Näissä vartioissa on kolme asiaa, jotka pettävät hiljaa: laatikko
 * avautuu väärässä tilanteessa (kelaus), kello ei enää jatku napista,
 * tai hengähdystauko toistuu joka kierroksella.
 */

test('1873 pysäyttää kellon ja avaa laatikon vain elävässä ajossa', () => {
  const sytyta = metodi('sytyta');
  // Syttyminen on ainoa ovi: pysäytetty kelaus (siirry) ei avaa mitään.
  assert.match(sytyta, /if \(!this\.avaaValinaytos\(t\)\) \{\s*\n\s*soitaLinssiluenta\(this\.ui, t, \{ juuri: this\.luentajuuri \}\);\s*\n\s*this\.luennanAlku = performance\.now\(\);/);
  const siirry = metodi('siirry');
  assert.ok(!siirry.includes('alinaytos'), 'siirry ei saa koskea välinäytökseen');

  const avaa = metodi('avaaValinaytos');
  // Kello pysähtyy automaattisesti.
  assert.match(avaa, /this\.pysayta\(\);/);
  // Kerran per ajo, eikä avausjakson aikana.
  assert.match(avaa, /if \(!tiedot \|\| this\.valinaytosNahty \|\| this\.avausKesken\) return false;/);
  assert.match(avaa, /this\.valinaytosNahty = true;/);
  // Sisältö tulee DATASTA: otsikko ja kertojan teksti virkkeiksi jaettuna
  // (omistaja 4.9.2026 iltapäivä: teksti suoraan kartan päälle, ei korttia).
  assert.match(avaa, /tiedot\.otsikko \?\? t\.otsikko/);
  assert.match(avaa, /jaaVirkkeiksi\(tiedot\.kertoja \?\? ''\)/);
  assert.ok(!avaa.includes('aikajana-valinaytos-nappi'), 'kortin Jatka-nappi poistui: Jatka on yläpalkin nappi');
  assert.ok(!avaa.includes('aikajana-valinaytos-laatikko'), 'kortti poistui');
  // Yläpalkin nappi hehkuu viiveellä ja body-luokka avaa pulun chatin.
  assert.match(avaa, /this\.taukoNappi\.classList\.add\('hehku'\)/);
  assert.match(avaa, /document\.body\.classList\.add\('aikajana-valinaytos-auki'\)/);
  assert.match(avaa, /this\.ladoValinaytoksenRivit\(rivit, luenta\)/);

  /*
   * KEHYSSILMUKKA EI SAA JATKUA pysäytyksen yli: ilman tätä tarkistusta
   * Jatka käynnistäisi toisen rinnakkaisen silmukan ja kello kulkisi
   * kaksinkertaista vauhtia.
   */
  const kehys = metodi('kehys');
  assert.match(kehys, /if \(!this\.kaynnissa\) return;\n\s*this\.raf = requestAnimationFrame/);
});

test('Jatka-nappi vie kuplat, laatikon ja käynnistää kellon', () => {
  const jatka = metodi('jatkaValinaytoksesta');
  assert.match(jatka, /if \(!this\.valinaytos\) return;/);
  assert.match(jatka, /this\.suljeValinaytos\(\);/);
  assert.match(jatka, /this\.jatka\(\);/);
  const sulje = metodi('suljeValinaytos');
  assert.match(sulje, /clearTimeout\(this\.valinaytosAjastin\);/);
  assert.match(sulje, /pysaytaLinssiluenta\(this\.ui\);/);
  assert.match(sulje, /polloKuplatPois\(\);/);
  // Näppäimistö: Enter/väli on Jatka, Esc sulkee linssin.
  const nappain = MOOTTORI.match(/\n  nappain\(e\) \{[\s\S]*?\n  \}/)[0];
  assert.match(nappain, /if \(this\.valinaytos\) \{[\s\S]{0,300}this\.jatkaValinaytoksesta\(\);/);
  // Alusta ja purku vievät laatikon; Alusta nollaa myös muistin.
  const alusta = metodi('alusta');
  assert.match(alusta, /this\.suljeValinaytos\(\{ heti: true \}\);/);
  assert.match(alusta, /this\.valinaytosNahty = false;/);
  assert.ok(PURA.includes('this.suljeValinaytos({ heti: true });'), 'purku ei sulje välinäytöstä');
});

test('kertoja lukee ensin, pulu kommentoi vasta sen jälkeen', () => {
  const puhe = metodi('aloitaValinaytoksenPuhe');
  // Oma runko: valinaytos-<vuosi>, ei pysäkin kolmen sanan riviä.
  assert.match(puhe, /soitaLinssiluenta\(this\.ui, t, \{ runko: valinaytoksenRunko\(t\), juuri: this\.luentajuuri \}\)/);
  // Kuplat luennan päätyttyä; puuttuva tai kytkimetön luenta viiveellä.
  assert.match(puhe, /luenta\.addEventListener\('ended', kuplat, \{ once: true \}\);/);
  assert.match(puhe, /luenta\.addEventListener\('error', viiveella, \{ once: true \}\);/);
  assert.match(puhe, /if \(!luenta\) \{ viiveella\(\); return null; \}/);
  // Kupla on linssin OMA poikkeus kuplaporttiin (js/pollo.js).
  assert.match(puhe, /polloLinssikupla\(osat\);/);
  // Sulkeutunut laatikko ei enää päästä kuplaa ruudulle.
  assert.match(puhe, /if \(!this\.valinaytos\?\.isConnected\) return;/);
  // Esittely luetaan laatikon auetessa, ja Käynnistä katkaisee sen.
  assert.match(metodi('avaaAvausjakso'), /soitaLinssiluenta\(this\.ui, null, \{ runko: ESITTELYN_RUNKO, juuri: this\.luentajuuri \}\)/);
  assert.match(metodi('aloitaAjo'), /pysaytaLinssiluenta\(this\.ui\);/);
});

test('välinäytös on tekstiä kartan päällä, ei korttia; Jatka hehkuu yläpalkissa', () => {
  const lohko = AIKAJANA_CSS.match(/\.aikajana-valinaytos \{[\s\S]*?\.aikajana-ilmiokuva img\.aikajana-kiertokuva\.esilla[^\n]*\n/)[0];
  // Kerros ei nappaa napautuksia: kartta, karuselli ja pulun nappi pysyvät käytössä.
  assert.match(lohko, /\.aikajana-valinaytos \{[\s\S]*?pointer-events: none;/);
  assert.ok(!lohko.includes('aikajana-valinaytos-laatikko') && !lohko.includes('aikajana-valinaytos-peite'), 'kortti ja peite poistuivat');
  // Rivi kerrallaan: rivi on piilossa, kunnes js antaa luokan nakyy.
  assert.match(lohko, /\.aikajana-valinaytos-rivi \{[\s\S]*?opacity: 0;[\s\S]*?transition: opacity 700ms ease/);
  assert.match(lohko, /\.aikajana-valinaytos-rivi\.nakyy \{ opacity: 1; transform: none; \}/);
  // Hehku: henno punainen, hidas syke.
  assert.match(lohko, /\.aikajana-nappi\.hehku \{[\s\S]*?animation: aikajana-hehku 2\.8s ease-in-out infinite;/);
  assert.match(lohko, /@keyframes aikajana-hehku/);
  // Kuvakierto: päällyskuvat pohjakuvan päällä, hidas ristihäivytys.
  assert.match(lohko, /\.aikajana-ilmiokuva img\.aikajana-kiertokuva \{[\s\S]*?opacity: 0;[\s\S]*?transition: opacity 1600ms ease;/);
  const avaus = AIKAJANA_CSS.match(/\.aikajana-avaus-laatikko \{[\s\S]*?\n\}/)[0];
  assert.match(avaus, /background-color: #d9c69c;/);
  assert.match(avaus, /feTurbulence/, 'paperin kuitu tulee SVG-kohinasta kuvana');
  assert.match(avaus, /rgba\(58, 38, 14, 0\.5\) 100%/, 'paperi tummuu alaspäin');
  // Lyhdyt (omistaja 4.9.2026): kaksi kerrosta per nurkka, skriptin ohjaamat muuttujat, ei CSS-keyframeja.
  assert.doesNotMatch(AIKAJANA_CSS, /aikajana-lepatus/, 'keyframe-lepatus korvattiin liekkimallilla (js/lyhty.js)');
  assert.match(AIKAJANA_CSS, /\.aikajana-lyhty > \.kajo \{\n  opacity: var\(--lyhty-kajo\);\n  mix-blend-mode: screen;/);
  assert.match(AIKAJANA_CSS, /\.aikajana-lyhty > \.ydin \{\n  opacity: var\(--lyhty-ydin\);\n  mix-blend-mode: screen;/);
  assert.match(AIKAJANA_CSS, /transform: translate\(var\(--lyhty-dx\), var\(--lyhty-dy\)\) scale\(var\(--lyhty-koko\)\);/);
  assert.match(metodi('avaaAvausjakso'), /this\.sammutaLyhdyt = sytytaLyhdyt\(laatikko, \{ reducedMotion: this\.reducedMotion, valokohde: kehys \}\);/);
  assert.match(metodi('puraAvaus'), /this\.sammutaLyhdyt\?\.\(\);/);
  // Havainnekuva valokeilassa: pelkkä kuva -paneeli ilman laatikkoa, reunat läpinäkyviksi maskilla (ei suodatin).
  // Maski tulee js:n laskemasta muuttujasta (epäsäännöllinen reuna,
  // omistaja 5.9.2026 ilta); entinen yksi soikio on sen varasija.
  assert.match(AIKAJANA_CSS, /\.aikajana-ilmio-sivu\.esilla > \.aikajana-ilmiokuva:first-child,[\s\S]*?mask-image: var\(--aikajana-valokeila, radial-gradient\(ellipse 50% 50% at 50% 50%, #000 44%, rgba\(0, 0, 0, 0\.72\) 62%, rgba\(0, 0, 0, 0\.24\) 82%, transparent 97%\)\);/);
  assert.match(AIKAJANA_CSS, /\.aikajana-ilmio:has\(> \.aikajana-ilmio-sivu\.esilla > \.aikajana-ilmiokuva:first-child\) \{\n  border-color: transparent;\n  background: transparent;\n  box-shadow: none;\n\}/);
  assert.ok(!lohko.includes('backdrop-filter'), 'välinäytös ei sumenna karttaa');
  /*
   * KERROS JÄÄ PULUN KUPLAPINON ALLE (.pollo-kuplapino-kehys z-index
   * 40): pulu kommentoi kertojan jälkeen, ja kuplan pitää näkyä
   * tekstin päällä. Linssin oman juuren (7) yli sen on silti mentävä.
   */
  const z = Number(lohko.match(/z-index: (\d+)/)[1]);
  assert.ok(z > 7 && z < 40, `välinäytöksen kerros ${z} ei ole linssin ja kuplapinon välissä`);
});

test('yksi Tauko/Jatka-nappi ja (x): välinäytöksessä nappi on Jatka, kuvakierto paneelissa', () => {
  const rakenna = metodi('rakenna');
  assert.match(rakenna, /solmu\('button', 'aikajana-nappi aikajana-sulje', '✕'\)/);
  assert.match(rakenna, /sulje\.setAttribute\('aria-label', 'Sulje'\)/);
  assert.ok(!rakenna.includes("'Alusta'"), 'Alusta-nappi poistui palkista (omistaja 4.9.2026)');
  assert.match(metodi('taukoTaiJatka'), /if \(this\.valinaytos\) \{ this\.jatkaValinaytoksesta\(\); return; \}/);
  assert.match(metodi('jatka'), /if \(this\.valinaytos\) this\.suljeValinaytos\(\);/);
  const sulje = metodi('suljeValinaytos');
  assert.match(sulje, /this\.taukoNappi\?\.classList\.remove\('hehku'\);/);
  assert.match(sulje, /classList\.remove\('aikajana-valinaytos-auki'\);/);
  // Virkkeiksi jako säilyttää sanat ja välimerkit.
  const osat = jaaVirkkeiksi('Vuosi 1873. Kartalla palaa yksitoista valoa: höyry vetää junia. Isoisä lähtee matkaan.');
  assert.deepEqual(osat, ['Vuosi 1873.', 'Kartalla palaa yksitoista valoa: höyry vetää junia.', 'Isoisä lähtee matkaan.']);
  // Kuvakierto: merkkipaalulla ilmion perässä Charing Crossin junakuva (ent. välinäytöksen kuva).
  const paalu = KEKSINNOT.find((t) => t.paalu);
  assert.ok(Array.isArray(paalu.ilmioSarja) && paalu.ilmioSarja.length >= 1, 'merkkipaalulla on kuvakierto');
  for (const k of paalu.ilmioSarja) {
    assert.ok(k.ulkoinen && /kohtaamiset\/isoisa\//.test(k.osoite) && k.selite && k.lahde, 'kiertokuva on isoisän ulkoinen kuva');
  }
  assert.equal(paalu.valinaytos.kuva, undefined, 'välinäytöksellä ei ole enää omaa kuvaa');
  assert.match(metodi('vaihdaPaneeli'), /if \(sarja\.length > 1\) this\.aloitaKuvakierto\(kehys, sarja, t\.otsikko\);/);
  assert.ok(PURA.includes('this.lopetaKuvakierto();'), 'purku ei pysäytä kuvakiertoa');
});

/*
 * OLETUSASETTELUT NÄYTTÖLUOKITTAIN (omistaja 4.9.2026 iltapäivä, kolme
 * kaappausta): pystynäytöllä kartta laskeutuu paneelin alle, vaaka-
 * näytöllä Eurooppa täyttää ruudun ja paneeli peittää koillisnurkan.
 */
test('kameralaatikko jatkuu pystynäytöllä ylös ja vaakanäytöllä vasemmalle', async () => {
  const { kaarenKameralaatikko, KAMERA_JATKE } = await import('../js/aikajana.js');
  const alue = { x: 5560, y: 830, w: 1700, h: 1000 };
  const juuri = (w, h) => ({ getBoundingClientRect: () => ({ width: w, height: h }) });
  const pysty = kaarenKameralaatikko(alue, juuri(820, 1100));
  assert.equal(pysty.x, alue.x);
  assert.equal(pysty.w, alue.w);
  assert.ok(pysty.y < alue.y, 'pystynäytöllä laatikko jatkuu ylös (kartta laskeutuu paneelin alle)');
  assert.equal(pysty.h, alue.h * (1 + KAMERA_JATKE.alas + KAMERA_JATKE.ylos));
  const vaaka = kaarenKameralaatikko(alue, juuri(1440, 800));
  assert.ok(vaaka.x < alue.x && vaaka.w > alue.w, 'vaakanäytöllä laatikko jatkuu vasemmalle');
  assert.ok(vaaka.y < alue.y, 'vaa\'assa pieni jatke ylös (vuosipalkki)');
  assert.equal(vaaka.h, alue.h * (1 + KAMERA_JATKE.vaakaAlas + KAMERA_JATKE.vaakaYlos));
  // Ilman juurta (testien DOM-jäljitelmä) käytetään vaakalaatikkoa.
  assert.deepEqual(kaarenKameralaatikko(alue, null), vaaka);
  assert.match(metodi('sovitaKaareen'), /bbox: kaarenKameralaatikko\(alue, this\.juuri\), marginaali: 0\.03/);
  // Paneelin oletusleveydet: vaaka 45 %, tabletti pystyssä 66 %, puhelin reunasta reunaan.
  assert.match(AIKAJANA_CSS, /--aikajana-paneeli-leveys: min\(60rem, 45%\);/);
  assert.match(AIKAJANA_CSS, /@media \(min-width: 701px\) and \(orientation: portrait\) \{\n  \.aikajana-ilmio \{ right: 3\.5%; --aikajana-paneeli-leveys: 66%; \}/);
  assert.match(AIKAJANA_CSS, /\.aikajana-ilmio \{ top: 3\.6rem; right: 0; --aikajana-paneeli-leveys: 100%;/);
  assert.match(MOOTTORI, /PANEELIN_MUISTIAVAIN = 'matkakirja-linssi-paneeli-v2'/);
});

/*
 * RULLIEN LIIKE-EPÄTERÄVYYS (omistaja 6.9.2026 ilta: numerot sumenevat
 * kuin elokuvakamerassa nopean liikkeen ja valotusajan mukaan).
 */
test('rullan sumu: hidas terävä, nopea sumea, ylemmät rullat kymmenesosalla, katto ja kynnys', () => {
  // Keksintökello: vuosi 260 ms:ssa ≈ 3,85 yksikköä/s → ykköset alle kynnyksen ≈ terävä.
  const keksinto = rullanSumu(3.85, 1);
  assert.ok(keksinto < 0.1, `keksintökellon ykköset ${keksinto}`);
  assert.equal(tasoitaSumu(0, rullanSumu(3.85, 10)), 0, 'kympit terävät');
  // Syvä aika: 6 600 vuotta sekunnissa → ykköset, kympit ja sadat katossa, tuhannet kevyesti.
  assert.equal(rullanSumu(6600, 1), RULLAN_SUMU_MAX);
  assert.equal(rullanSumu(6600, 10), RULLAN_SUMU_MAX);
  assert.ok(rullanSumu(6600, 100) > 0.5, `sadat ${rullanSumu(6600, 100)}`);
  const tuhannet = rullanSumu(6600, 1000);
  assert.ok(Math.abs(tuhannet - 6.6 * RULLAN_VALOTUS_S) < 1e-9, `tuhannet valotusajan matka ${tuhannet}`);
  assert.equal(rullanSumu(6600, 100000), 0.0066 * RULLAN_VALOTUS_S * 10, 'satatuhannet käytännössä terävät');
  // Suunta ei vaikuta (laskeva kello), nolla ja epäluku ovat teräviä.
  assert.equal(rullanSumu(-6600, 1), rullanSumu(6600, 1));
  assert.equal(rullanSumu(0, 1), 0);
  assert.equal(rullanSumu(NaN, 1), 0);
  // Tasoitus: kohti kohdetta askel kerrallaan, kynnyksen alle jäävä on tasan 0.
  const askel = tasoitaSumu(0, RULLAN_SUMU_MAX);
  assert.ok(askel > 0 && askel < RULLAN_SUMU_MAX, 'ei hyppää kerralla kohteeseen');
  assert.ok(tasoitaSumu(askel, RULLAN_SUMU_MAX) > askel, 'lähestyy');
  assert.equal(tasoitaSumu(RULLAN_SUMUN_KYNNYS * 1.5, 0, 0.5), 0, 'laskiessa kynnyksen alle → 0');
  assert.ok(RULLAN_VALOTUS_S > 1 / 100 && RULLAN_VALOTUS_S < 1 / 24, 'valotusaika elokuvakameran luokkaa');
});

test('sumennaRullat kirjoittaa muuttujat ja luokan vain liikkuville rullille; nollaus pyyhkii', () => {
  const kehys = () => {
    const tyyli = new Map();
    return {
      style: { setProperty: (k, v) => tyyli.set(k, v), removeProperty: (k) => tyyli.delete(k) },
      classList: { luokat: new Set(), add(l) { this.luokat.add(l); }, remove(l) { this.luokat.delete(l); } },
      tyyli,
    };
  };
  const rullat = Array.from({ length: 6 }, () => ({ vanha: {}, uusi: {}, merkki: null, kehys: kehys() }));
  // Muutama kehys samalla nopeudella: tasoitus nostaa sumun kohti kohdetta.
  for (let k = 0; k < 12; k += 1) sumennaRullat(rullat, 6600);
  const ykkoset = rullat[5];
  const tuhannet = rullat[2];
  const satatuhannet = rullat[0];
  assert.ok(ykkoset.kehys.classList.luokat.has('vauhdissa'), 'ykköset sumeat');
  assert.ok(Number(ykkoset.kehys.tyyli.get('--sumu')) > 0.6, `ykkösten sumu ${ykkoset.kehys.tyyli.get('--sumu')}`);
  assert.ok(Number(ykkoset.kehys.tyyli.get('--sumu-osuus')) > 0.99, `osuus ${ykkoset.kehys.tyyli.get('--sumu-osuus')}`);
  assert.ok(tuhannet.kehys.classList.luokat.has('vauhdissa') && Number(tuhannet.kehys.tyyli.get('--sumu')) < 0.3, 'tuhannet kevyesti');
  assert.ok(!satatuhannet.kehys.classList.luokat.has('vauhdissa'), 'satatuhannet terävät');
  assert.ok(!satatuhannet.kehys.tyyli.has('--sumu'));
  // Nollaus: kaikki pois kerralla (pysäytys, reduced motion).
  sumennaRullat(rullat, 6600, { nollaa: true });
  for (const r of rullat) {
    assert.equal(r.sumu, 0);
    assert.ok(!r.kehys.classList.luokat.has('vauhdissa'));
    assert.ok(!r.kehys.tyyli.has('--sumu'));
  }
  // Moottori kytkee: naytaVuosi sumentaa, pysayta nollaa, css ei käytä filter: blur -suodatinta.
  assert.match(MOOTTORI, /this\.sumennaKello\(arvo, heti\);/);
  assert.match(MOOTTORI, /pysayta\(\) \{[\s\S]{0,500}sumennaRullat\(this\.rullat, 0, \{ nollaa: true \}\);/);
  assert.match(MOOTTORI, /if \(!this\.kaynnissa \|\| heti \|\| this\.reducedMotion \|\| !edellinen\) \{/);
  const lohko = AIKAJANA_CSS.match(/\.vuosi-numero\.vauhdissa \.vuosi-merkki \{[\s\S]*?\n\}/)[0];
  assert.match(lohko, /text-shadow:/);
  assert.ok(!/filter/.test(lohko), 'sumu ilman suodatinta');
  assert.match(AIKAJANA_CSS, /@media \(prefers-reduced-motion: reduce\) \{\n\s*\.vuosi-numero\.vauhdissa \.vuosi-merkki \{ opacity: 1; text-shadow: none; \}/);
});
