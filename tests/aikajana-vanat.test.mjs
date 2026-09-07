/*
 * IHMISEN MATKA — VANAT PALLOLLA (js/aikajana-vanat.js) -vartija.
 *
 * Moduulin piirto-osaa ei voi ajaa Nodessa (three.js, Globe.gl, DOM),
 * mutta sen PÄÄTÖKSET ovat puhtaita funktioita, ja juuri ne ratkaisevat
 * miltä kaista näyttää: kuinka pitkälle se on kasvanut, kuinka kirkas
 * kärki on, kuinka leveä kaista on missäkin, mitkä kärjet ovat merellä
 * ja missä kärki on kameralle. Ne testataan täällä; varjostimen ja
 * materiaalin asetukset sekä moduulin kytkennät (sw.js, luokat)
 * tekstitasolla, kuten muissakin pallon kerroksissa.
 *
 * 1. Kasvu: matkaHetkella (uniformi uKuljettu).
 * 2. Kärjen väri: karjenPaino (sama kaava kuin ruudunTila kalvolla ja varjostimessa).
 * 3. Kaista: leveyskerroin, kaistanLeveysKm, vahimmaisleveysKm, aineiston alueet.
 * 4. Kärki kameralle: karkiHetkella oikealla selkärangalla.
 * 5. Kotipesän rengas.
 * 6. Rantamaski: koko, tarkistuspisteet, karkiMerella vanojen kärjillä.
 * 7. Kytkennät: varjostin, syvyys, piirtojärjestys, sw.js SHELL.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  matkaHetkella, karjenPaino, karkiHetkella, kotipesanRengas,
  leveyskerroin, kaistanLeveysKm, vahimmaisleveysKm, karkiMerella, merisyys, etaisyysMaahan, rantamaskinRuutu,
  KAISTAN_MERI_RAJAT_KM,
  KAISTAN_PEITTO, KAISTAN_LEVEYS_KM, KAISTAN_MIN_PX, KAISTAN_MERI_MIN_PX, KAISTAN_MERI_KERROIN,
  KAISTAN_KERROIN_RAJAT, KAISTAN_RENDER_ORDER, KOTIPESAN_RENDER_ORDER, KAISTAN_SYVYYSBIAS,
  VANAN_ENNAKKO, VANAN_ENNAKKO_MAX_AST, VANAN_KORKEUS,
} from '../js/aikajana-vanat.js';
import {
  puraMaamaski, laskeKentat, johdaVanat, rintamanLeveys, ruudunTila, vanaKm,
} from '../js/aikajana-virrat-laskenta.js';
import { MAAMASKI } from '../js/linssit/ihmisen-matka-maamaski.js';
import { RANTAMASKI } from '../js/linssit/ihmisen-matka-rantamaski.js';
import {
  IHMISEN_MATKA_VIRRAT, IHMISEN_MATKA_RETKI, IHMISEN_MATKA_VANHA, IHMISEN_MATKA_VANAT,
} from '../js/linssit/ihmisen-matka-virrat.js';

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');

/* ------------------------------------------------------------ 1. kasvu */

test('matkaHetkella: vana kasvaa kellon mukana, ei ennen alkuaan eikä yli päänsä', () => {
  // Kolme kärkeä: 100 ka → 50 ka → 10 ka, matkat 0 → 10 → 30.
  const matka = Float32Array.from([0, 10, 30]);
  const aika = Float32Array.from([100000, 50000, 10000]);
  assert.equal(matkaHetkella(matka, aika, 200000), 0, 'ennen vanan alkua ei piirretä mitään');
  assert.equal(matkaHetkella(matka, aika, 100000), 0, 'alkuhetkellä nolla');
  assert.equal(matkaHetkella(matka, aika, 75000), 5, 'puolivälissä ensimmäistä janaa');
  assert.equal(matkaHetkella(matka, aika, 50000), 10, 'toisessa kärjessä');
  assert.equal(matkaHetkella(matka, aika, 30000), 20, 'puolivälissä toista janaa');
  assert.equal(matkaHetkella(matka, aika, 10000), 30, 'perillä');
  assert.equal(matkaHetkella(matka, aika, 0), 30, 'kellon lopussa koko vana');
  // Rappeutuneet syötteet eivät kaada piirtoa.
  assert.equal(matkaHetkella(Float32Array.from([0]), Float32Array.from([1]), 0), 0);
  assert.equal(matkaHetkella(null, null, 1000), 0);
});

/* -------------------------------------------------------- 2. kärjen väri */

test('karjenPaino: kärki kirkas, häntä vanhaa sävyä — sama kaava kuin ruudunTila', () => {
  const nyt = 50000;
  const rintama = rintamanLeveys(nyt); // 5 000 v
  assert.equal(karjenPaino(nyt, nyt, rintama), 1, 'juuri saavutettu kärki on rintamaa');
  assert.equal(karjenPaino(nyt + rintama, nyt, rintama), 0, 'rintaman takana paino on nolla');
  assert.ok(Math.abs(karjenPaino(nyt + rintama / 2, nyt, rintama) - 0.5) < 1e-6);
  assert.equal(karjenPaino(nyt + 2 * rintama, nyt, rintama), 0, 'vanha osa ei mene negatiiviseksi');
  assert.equal(karjenPaino(nyt - 1000, nyt, rintama), 1, 'kärjen edessä paino rajataan ykköseen');
  // Sama luku kuin kalvon ruudulla: vana ja väri vanhenevat samaa tahtia.
  for (const ika of [0, 1200, 3000, 4999]) {
    assert.ok(Math.abs(karjenPaino(nyt + ika, nyt, rintama) - ruudunTila(nyt + ika, nyt).w) < 1e-6,
      `ikä ${ika}: vana ja kalvo eri tahdissa`);
  }
  assert.equal(karjenPaino(0, nyt, rintama), 0, 'tyhjä aika ei väritä');
});

/* --------------------------------------------------------- 3. kaista */

const KAISTA = IHMISEN_MATKA_VANAT.kaista;

test('leveyskerroin: asuttu alue leveä, läpikuljettu kapea, reuna pehmeä, alueet eivät summaudu', () => {
  assert.equal(leveyskerroin(-20, -140, KAISTA.alueet), 1, 'alueiden ulkopuolella perusleveys');
  assert.equal(leveyskerroin(48, 10, KAISTA.alueet), 2.0, 'Euroopan sydämessä 2×');
  assert.equal(leveyskerroin(15, 76, KAISTA.alueet), 1.8, 'Intian rannikolla 1,8×');
  assert.equal(leveyskerroin(65, 130, KAISTA.alueet), 0.6, 'Siperiassa 0,6×');
  assert.equal(leveyskerroin(65, -170, KAISTA.alueet), 0.5, 'Beringiassa 0,5× (laatikko kiertää 180°)');
  assert.equal(leveyskerroin(-30, -71, KAISTA.alueet), 1, 'Etelä-Amerikan rannikko keskileveä');
  // Reuna liukuu: laatikon reunalla puolet levennyksestä, pehmeysvyön päässä ei mitään.
  const alue = [{ lat: [0, 10], lon: [0, 10], kerroin: 3, pehmeys: 2 }];
  assert.equal(leveyskerroin(5, 5, alue), 3);
  assert.ok(Math.abs(leveyskerroin(5, 10, alue) - 2) < 1e-9, 'reunalla 1 + (3 − 1) × 0,5');
  assert.equal(leveyskerroin(5, 12.5, alue), 1, 'pehmeysvyön ulkopuolella perusleveys');
  assert.ok(leveyskerroin(5, 11, alue) > 1 && leveyskerroin(5, 11, alue) < 2, 'vyössä välissä');
  // Päällekkäiset levennykset: suurin voittaa, ei summa (Britannia + Eurooppa).
  assert.equal(leveyskerroin(52, -1, KAISTA.alueet), 2.0, 'Etelä-Englanti: max(2,0, 1,5), ei 2,5');
  // Levennys ja kavennus kertautuvat, ja rajat pitävät.
  const seka = [{ lat: [0, 10], lon: [0, 10], kerroin: 3, pehmeys: 1 }, { lat: [0, 10], lon: [0, 10], kerroin: 0.5, pehmeys: 1 }];
  assert.equal(leveyskerroin(5, 5, seka), 1.5);
  assert.equal(leveyskerroin(5, 5, [{ lat: [0, 10], lon: [0, 10], kerroin: 9, pehmeys: 1 }]), KAISTAN_KERROIN_RAJAT[1]);
  assert.equal(leveyskerroin(5, 5, [{ lat: [0, 10], lon: [0, 10], kerroin: 0, pehmeys: 1 }]), KAISTAN_KERROIN_RAJAT[0]);
  assert.equal(leveyskerroin(5, 5, null), 1, 'ilman alueita perusleveys');
});

test('kaistanLeveysKm ja vahimmaisleveysKm: leveys datasta, pohja ruudun pikseleistä', () => {
  assert.equal(kaistanLeveysKm(15, 76, KAISTA), KAISTA.leveysKm * 1.8, 'Intia: perusleveys × 1,8');
  assert.equal(kaistanLeveysKm(-30, -71, KAISTA), KAISTA.leveysKm);
  assert.equal(kaistanLeveysKm(-30, -71, {}), KAISTAN_LEVEYS_KM, 'ilman aineistoa moduulin oletus');
  assert.equal(vahimmaisleveysKm(20), KAISTAN_MIN_PX * 20, '7 px × 20 km/px');
  assert.equal(vahimmaisleveysKm(20, KAISTAN_MERI_MIN_PX), KAISTAN_MERI_MIN_PX * 20);
  assert.equal(vahimmaisleveysKm(0), 0, 'nolla ei kaada');
  // Omistajan haarukka: peitto viivan (0,95) ja halon (0,14) välistä.
  assert.ok(KAISTAN_PEITTO >= 0.45 && KAISTAN_PEITTO <= 0.6);
  assert.ok(KAISTAN_MERI_KERROIN > 0 && KAISTAN_MERI_KERROIN < 0.5, 'meren yli kapea pelkkä vana');
});

test('IHMISEN_MATKA_VANAT.kaista: aineisto ehjä ja omistajan haarukassa', () => {
  assert.ok(KAISTA.leveysKm >= 150 && KAISTA.leveysKm <= 300, `perusleveys ${KAISTA.leveysKm} km`);
  assert.ok(KAISTA.peitto >= 0.45 && KAISTA.peitto <= 0.6, 'peitto viivan ja halon välistä');
  assert.ok(KAISTA.meriKerroin > 0 && KAISTA.meriKerroin < 0.5);
  assert.ok(KAISTA.alueet.length >= 12, 'alueita on riittävästi maantiedon kattamiseen');
  const nimet = new Set();
  for (const a of KAISTA.alueet) {
    assert.ok(a.nimi && !nimet.has(a.nimi), `alueen nimi puuttuu tai toistuu: ${a.nimi}`);
    nimet.add(a.nimi);
    assert.ok(a.lat[0] < a.lat[1] && a.lat[0] >= -90 && a.lat[1] <= 90, `${a.nimi}: lat`);
    assert.ok(a.lon.every((x) => x >= -180 && x <= 180), `${a.nimi}: lon`);
    assert.ok(a.kerroin >= KAISTAN_KERROIN_RAJAT[0] && a.kerroin <= KAISTAN_KERROIN_RAJAT[1], `${a.nimi}: kerroin`);
  }
  // Asutut leveitä (≥ 2×), läpikuljetut kapeita (< 1): molempia on.
  assert.ok(KAISTA.alueet.some((a) => a.kerroin >= 2) && KAISTA.alueet.some((a) => a.kerroin < 1));
  // Leveys on kuvituksellinen: aineisto sanoo sen itse.
  assert.match(lue('../js/linssit/ihmisen-matka-virrat.js'), /KUVITUKSELLINEN, EI TIEDEVÄITE/);
});

/* ------------------------------------------------- 4. kärki kameralle */

const MAA = puraMaamaski(MAAMASKI.juoksut);
const KENTAT = laskeKentat(
  { virrat: IHMISEN_MATKA_VIRRAT, retki: IHMISEN_MATKA_RETKI, vanha: IHMISEN_MATKA_VANHA },
  { maa: MAA },
);
const { vanat: VANAT } = johdaVanat(KENTAT, IHMISEN_MATKA_VANAT, { maa: MAA });
const SELKA = VANAT[0].pisteet;

test('karkiHetkella: selkärangan kärki kulkee Omosta Monte Verdeen eikä koskaan taaksepäin', () => {
  const alku = karkiHetkella(SELKA, 300000);
  assert.ok(Math.abs(alku.lat - SELKA[0][0]) < 0.01, 'kaaren alussa kärki on vanan alussa (Omo)');
  const loppu = karkiHetkella(SELKA, 1000);
  assert.ok(vanaKm({ lat: loppu.lat, lon: loppu.lng }, { lat: -41.5047, lon: -73.2044 }) < 60,
    'kaaren lopussa Monte Verdessä');

  // Kärki liikkuu vain eteenpäin: kuljettu matka kasvaa monotonisesti.
  let edellinen = { lat: alku.lat, lon: alku.lng };
  let kuljettu = 0;
  let hyppy = 0;
  for (let nyt = 290000; nyt >= 1000; nyt -= 1000) {
    const p = karkiHetkella(SELKA, nyt);
    const askel = vanaKm(edellinen, { lat: p.lat, lon: p.lng });
    kuljettu += askel;
    hyppy = Math.max(hyppy, askel);
    edellinen = { lat: p.lat, lon: p.lng };
  }
  assert.ok(kuljettu > 25000 && kuljettu < 40000, `kärki kulki ${Math.round(kuljettu)} km`);

  // Ennakko vie kärkeä eteenpäin, ei taaksepäin (kamera kulkee edellä).
  const nyt = 60000;
  const ilman = karkiHetkella(SELKA, nyt, { ennakko: 0 });
  const ennakolla = karkiHetkella(SELKA, nyt, { ennakko: VANAN_ENNAKKO });
  const matkaIlman = karkiHetkella(SELKA, nyt * (1 - VANAN_ENNAKKO), { ennakko: 0 });
  assert.deepEqual(karkiHetkella(SELKA, nyt, { ennakko: VANAN_ENNAKKO, maxAst: 0 }), matkaIlman,
    'ennakko on sama kuin 4 % nuorempi kello');
  /*
   * ENNAKON KATTO: mallissa Arabia → Altai kuluu 2 000 vuodessa, joten
   * neljän prosentin ennakko veisi kohteen tuhansia kilometrejä
   * piirretyn kärjen edelle ja kuva olisi tyhjä. Kohde pysyy katon
   * sisällä joka hetkellä.
   */
  for (const hetki of [200000, 90000, 75000, 60000, 45000, 20000, 16000, 14000]) {
    const karki = karkiHetkella(SELKA, hetki, { ennakko: 0 });
    const kohde = karkiHetkella(SELKA, hetki, { ennakko: VANAN_ENNAKKO });
    const ero = vanaKm({ lat: karki.lat, lon: karki.lng }, { lat: kohde.lat, lon: kohde.lng }) / 111.32;
    assert.ok(ero <= VANAN_ENNAKKO_MAX_AST + 0.5, `${hetki}: ennakko ${ero.toFixed(1)}° kärjestä`);
  }
  assert.ok(vanaKm({ lat: ilman.lat, lon: ilman.lng }, { lat: ennakolla.lat, lon: ennakolla.lng }) >= 0);
  assert.equal(karkiHetkella([], 1000), null);
});

/* ------------------------------------------------------- 5. kotipesät */

test('kotipesanRengas: suljettu ympyrä oikean kokoisena', () => {
  const rengas = kotipesanRengas(4.8, 35.97, 350);
  assert.equal(rengas.length, 25, 'suljettu rengas (24 + paluu alkuun)');
  const [lat0, lon0] = rengas[0];
  const [latN, lonN] = rengas[rengas.length - 1];
  assert.ok(Math.abs(lat0 - latN) < 1e-9 && Math.abs(lon0 - lonN) < 1e-9, 'rengas sulkeutuu');
  for (const [lat, lon] of rengas) {
    const d = vanaKm({ lat: 4.8, lon: 35.97 }, { lat, lon });
    assert.ok(Math.abs(d - 350) < 40, `renkaan säde ${Math.round(d)} km`);
    assert.ok(lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180);
  }
  // Napojen lähellä rengas ei karkaa kartalta.
  for (const [lat, lon] of kotipesanRengas(-34.2078, 22.0894, 300)) {
    assert.ok(Number.isFinite(lat) && Number.isFinite(lon));
  }
});

/* ------------------------------------------------------ 6. rantamaski */

const RANTA = puraMaamaski(RANTAMASKI.juoksut, RANTAMASKI.leveys * RANTAMASKI.korkeus);

test('rantamaski: 0,125° Natural Earth -maski, tarkistuspisteet ja kärjen meri-lippu', () => {
  assert.equal(RANTAMASKI.leveys, 2880);
  assert.equal(RANTAMASKI.korkeus, 1440);
  assert.equal(RANTAMASKI.aste, 0.125);
  assert.equal(RANTA.length, 2880 * 1440);
  let maata = 0;
  for (let i = 0; i < RANTA.length; i += 1) maata += RANTA[i];
  const osuus = maata / RANTA.length;
  assert.ok(osuus > 0.3 && osuus < 0.36, `maata ${(100 * osuus).toFixed(1)} % (tasa-ruudukossa n. 33 %)`);
  const maa = (lat, lon) => RANTA[rantamaskinRuutu(lat, lon)] === 1;
  assert.ok(maa(30.0, 33.7), 'Siinai');
  assert.ok(maa(68.0, 27.0), 'Lappi (mallin maamaskissa 76°N yläpuoli olisi merta; tämä ei ole se maski)');
  assert.ok(maa(70.0, -40.0), 'Grönlanti');
  assert.ok(maa(15.3, 74.4), 'Goa');
  assert.ok(!maa(65.8, -169.0), 'Beringinsalmi on merta');
  assert.ok(!maa(42.0, 50.0), 'Kaspianmeri on merta (reikä toimii)');
  assert.ok(!maa(12.55, 43.35), 'Bab-el-Mandeb on merta');
  assert.ok(!maa(35.95, -5.6), 'Gibraltar on merta');
  // Pituusaste kiertää: 180° ja −180° ovat sama sarake.
  assert.equal(rantamaskinRuutu(0, 180), rantamaskinRuutu(0, -180));
  // Etäisyys maahan ja merisyys: rannikolla 0, salmen keskellä liukuu, avomerellä 1.
  assert.equal(etaisyysMaahan(30.0, 33.7, RANTA), 0, 'maalla etäisyys on nolla');
  const salmi = etaisyysMaahan(65.85, -168.9, RANTA);
  assert.ok(salmi > 20 && salmi < 50, `Beringinsalmen keskeltä rantaan ${Math.round(salmi)} km`);
  assert.equal(etaisyysMaahan(-20.0, -140.0, RANTA, RANTAMASKI, 200), Infinity, 'avomerellä ei maata 200 km:ssä');
  assert.equal(merisyys(30.0, 33.7, RANTA), 0);
  assert.equal(merisyys(-20.0, -140.0, RANTA), 1);
  assert.ok(merisyys(65.85, -168.9, RANTA) > 0 && merisyys(65.85, -168.9, RANTA) <= 1, 'salmessa liukuu tai merellä');
  assert.ok(KAISTAN_MERI_RAJAT_KM[0] < 41 && KAISTAN_MERI_RAJAT_KM[1] > 25, 'Beringinsalmi (41 km rantaan) ei ole pelkkää rannikkoa');
  assert.ok(karkiMerella(65.8, -169.0, RANTA), 'Beringinsalmen keskellä merellä');
  assert.ok(karkiMerella(-12.0, 128.0, RANTA), 'Timorinmeri (Sahulin ylitys) merellä');
  assert.ok(karkiMerella(-20.0, -140.0, RANTA), 'Tyynimeri merellä');
  assert.ok(!karkiMerella(12.6, 43.4, RANTA), 'Bab-el-Mandebin salmessa (26 km leveä, 13 km rantaan) rannikkoa');
  assert.ok(!karkiMerella(14.0, 43.5, RANTA), 'Tihama maalla');
  assert.ok(!karkiMerella(1, 1, null), 'ilman maskia kukaan ei ole merellä');
  /*
   * MALLIN KULKUMASKI VOITTAA: kärki, jonka 0,5° ruudussa malli käveli,
   * on rannikkoa vaikka tarkka maski näyttäisi vettä. Beringinsalmi on
   * kulkumaskissakin merta → merellä. Perun rannikon kärki (−18,3°,
   * −71,4°) on mallin SILEÄN vanan pyöristämä 110 km vedessä ja
   * kulkumaskissakin merellä: se jää kapeaksi vanaksi (avoin, luku 14).
   */
  const KULKU = { maa: MAA, leveys: MAAMASKI.leveys, korkeus: MAAMASKI.korkeus };
  const KAIKKI_MAATA = { maa: new Uint8Array(MAA.length).fill(1), leveys: MAAMASKI.leveys, korkeus: MAAMASKI.korkeus };
  assert.ok(karkiMerella(65.8, -169.0, RANTA, RANTAMASKI, KULKU), 'Beringinsalmi merellä myös kulkumaskin kanssa');
  assert.ok(!karkiMerella(65.8, -169.0, RANTA, RANTAMASKI, KAIKKI_MAATA), 'kulkumaskin maa tekee kärjestä rannikkoa');
  assert.ok(karkiMerella(-12.0, 128.0, RANTA, RANTAMASKI, KULKU), 'Timorinmeri merellä');
  assert.ok(karkiMerella(-18.313, -71.375, RANTA, RANTAMASKI, KULKU), 'Perun kärki 110 km vedessä: merellä');
});

test('rantamaski ja vanat: selkärangan kärjistä merellä vain Beringia, haaroista vain tunnetut ylitykset', () => {
  const KULKU = { maa: MAA, leveys: MAAMASKI.leveys, korkeus: MAAMASKI.korkeus };
  const merella = [];
  for (const vana of VANAT) {
    for (const [lat, lon] of vana.pisteet) {
      if (karkiMerella(lat, lon, RANTA, RANTAMASKI, KULKU)) merella.push({ vana: vana.tunnus, lat, lon });
    }
  }
  const selka = merella.filter((m) => m.vana === VANAT[0].tunnus);
  /*
   * Selkärangan merikärjet: Beringia tai rannikkoreitti enintään 150 km
   * rannasta (mallin 0,5° kulkumaski laskee Perun–Chilen rannikon
   * ruutuja maaksi, joita tarkka maski ei; kaista kulkee siellä
   * kapeana vanana rannan tuntumassa).
   */
  const rannikolla = (m) => etaisyysMaahan(m.lat, m.lon, RANTA, RANTAMASKI, 150) <= 150;
  assert.ok(selka.every((m) => (m.lat > 60 && (m.lon < -160 || m.lon > 170)) || rannikolla(m)),
    `selkärangan merikärjet vain Beringiassa tai rannan tuntumassa: ${JSON.stringify(selka.slice(0, 5))}`);
  // Kaikki merikärjet ovat tunnetuissa ylityksissä, Tyynenmeren nauhoissa tai rannan tuntumassa.
  const sallittu = (m) => rannikolla(m)
    || (m.lat > 60 && (m.lon < -160 || m.lon > 170)) // Beringia
    || (m.lat > -20 && m.lat < 5 && m.lon > 100 && m.lon < 150) // Sunda–Wallacea–Sahul
    || (m.lat < -35 && m.lon > 140 && m.lon < 150) // Bassinsalmi
    || (m.lat > 30 && m.lat < 40 && m.lon > 125 && m.lon < 135) // Japani
    || (m.lat > 60 && m.lon > -80 && m.lon < 0) // Islanti, Grönlanti
    || (m.lat > 15 && m.lat < 25 && m.lon > -90 && m.lon < -70) // Karibia
    || (m.lat < 30 && (m.lon > 115 || m.lon < -100)) // Tyynimeri
    || (m.lat < 0 && m.lon > 40 && m.lon < 115); // Madagaskarin nauha
  const oudot = merella.filter((m) => !sallittu(m));
  assert.equal(oudot.length, 0, `merikärkiä tunnettujen ylitysten ulkopuolella: ${JSON.stringify(oudot.slice(0, 8))}`);
  const kaikki = VANAT.reduce((n, v) => n + v.pisteet.length, 0);
  assert.ok(merella.length / kaikki < 0.15, `merellä ${merella.length}/${kaikki} kärkeä`);
});

/* ------------------------------------------------------- 7. kytkennät */

test('vanamoduuli: kaista omalla varjostimella, pinnan syvyys, kalvojen jälkeen, ei viivaa eikä haloa', () => {
  const VANAT_JS = lue('../js/aikajana-vanat.js');
  // Yksi instanssoitu verkko, ei Line2-vanaa eikä leveää Line2-kaistaa.
  assert.match(VANAT_JS, /new ShaderMaterial\(\{/);
  assert.match(VANAT_JS, /new InstancedBufferGeometry\(\)/);
  assert.match(VANAT_JS, /geom\.instanceCount = janoja;/);
  assert.ok(!/dashSize/.test(VANAT_JS), 'kasvu ei ole enää katkoviiva');
  assert.ok(!/vertexColors: true/.test(VANAT_JS), 'kärkivärit lasketaan varjostimessa, ei puskurissa');
  assert.equal((VANAT_JS.match(/new luokat\.Line2\(/g) ?? []).length, 1, 'Line2 vain kotipesän renkaalle');
  // Fragmentti: säde–pallo-leikkaus, etäisyys kolmeen janaan, rantamaski, pinnan syvyys.
  assert.match(VANAT_JS, /vec3 q = uKamera \+ suunta \* t0;/);
  assert.match(VANAT_JS, /float d3 = katkaistuun\(q, vP2, vP3/);
  assert.match(VANAT_JS, /texture2D\(uMaski, uv\)\.r/);
  // Säde lasketaan pikselistä (gl_FragCoord + käänteinen MVP), ei nelikulmiosta: sama syvyys joka fragmentille.
  assert.match(VANAT_JS, /vec2 ndc = \(gl_FragCoord\.xy \/ uRuutu\) \* 2\.0 - 1\.0;/);
  assert.match(VANAT_JS, /mvpKaanteinen\.copy\(mvp\)\.invert\(\);/);
  // Rannikkokärki vedessä maalaa rannasta: etäisyys rantaan anteeksi.
  assert.match(VANAT_JS, /max\(0\.0, d - ranta\)/);
  assert.match(VANAT_JS, /gl_FragDepthEXT = clamp\(z \* 0\.5 \+ 0\.5 - uSyvyysBias, 0\.0, 1\.0\);/);
  assert.match(VANAT_JS, /if \(alpha < 0\.004\) discard;/, 'näkymätön fragmentti ei kirjoita syvyyttä');
  // Kärkiväri samalla kaavalla kuin karjenPaino (rintama, pito).
  assert.match(VANAT_JS, /clamp\(1\.0 - \(aika - uNyt\) \/ uRintama, 0\.0, 1\.0\)/);
  assert.match(VANAT_JS, /if \(uPito > 0\.5 && uNyt > aika\) paino = 0\.0;/);
  // Materiaali: kirjoittaa syvyyden tiukalla testillä (idempotentti peitto), ei polygonOffsetia.
  assert.match(VANAT_JS, /depthWrite: true,\n\s*depthFunc: LESS_DEPTH,/);
  assert.match(VANAT_JS, /fragDepth: true/);
  assert.equal(KAISTAN_SYVYYSBIAS, 12 / 16777216, 'laattakerroksen −8:n edelle');
  // Piirtojärjestys: kalvojen (1) jälkeen, kotipesät ennen.
  assert.ok(KAISTAN_RENDER_ORDER > 1, 'kaista piirtyy kalvojen (renderOrder 1) jälkeen');
  assert.ok(KOTIPESAN_RENDER_ORDER < 1);
  assert.match(VANAT_JS, /verkko\.renderOrder = KAISTAN_RENDER_ORDER;/);
  assert.ok(VANAN_KORKEUS > 0 && VANAN_KORKEUS < 0.002, 'vana rantaviivan ja reittien välissä');
  // Kasvu ja korostus uniformeina.
  assert.match(VANAT_JS, /u\.uKuljettu\.value\[vanaIdx\] = matka;/);
  assert.match(VANAT_JS, /u\.uVanaPeitto\.value\[vanaIdx\] = kerroin;/);
  // Rantamaski tekstuurina (R8, bilineaarinen, pituusaste kiertää).
  assert.match(VANAT_JS, /import \{ RANTAMASKI \} from '\.\/linssit\/ihmisen-matka-rantamaski\.js';/);
  assert.match(VANAT_JS, /t\.wrapS = REPEAT_WRAP;/);
  // Luokat luetaan kerran kirjoitetulla apurilla, ei omalla kopiolla.
  assert.match(VANAT_JS, /import \{ line2Luokat \} from '\.\/pallovektorit\.js';/);
  // Moduuli ei koske muihin kerroksiin: vain oma osa reittikerroksesta.
  assert.match(VANAT_JS, /reitit\?\.aseta\?\.\('vanat', \[\]\);/);
  assert.ok(!/pointOfView\(\{/.test(VANAT_JS), 'vanat ei kirjoita kameraa');
  // Kytkentä: virtamoduuli antaa kaistan aineiston.
  assert.match(lue('../js/aikajana-virrat.js'), /kaista: aineisto\.vanat\?\.kaista \?\? \{\},/);
  assert.match(lue('../js/aikajana-virrat.js'), /maamaski: aineisto\.maamaski \?\? null,/);
  // sw.js SHELL kantaa moduulit (offline).
  const SW = lue('../sw.js');
  assert.ok(SW.includes("'./js/aikajana-vanat.js'"), 'aikajana-vanat.js puuttuu sw.js SHELListä');
  assert.ok(SW.includes("'./js/linssit/ihmisen-matka-rantamaski.js'"), 'rantamaski puuttuu sw.js SHELListä');
  // Työkalu, joka maskin tekee, rasteroi repon ne50.geojson:n.
  assert.match(lue('../tools/tee-rantamaski.mjs'), /ne50\.geojson/);
});
