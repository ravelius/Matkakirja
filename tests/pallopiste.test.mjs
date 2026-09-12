/*
 * PALLON PISTEET: kaupunkipiste on levy, ei tappi, ja aarrepiste ei jää
 * nappulan alle (omistaja 6.9.2026 ilta, iPhone, sanatarkasti: "piste
 * venyy kun karttaa panoroi" ja "aarteen piste syttyy liian lähelle
 * ateenaa, ei pysty painamaan" … "sama ongelma myös sofiassa").
 *
 * 1. LEVY. Globe.gl piirtää pointsDatan lieriönä pinnasta korkeuteen;
 *    kaupunkipiste oli 0,3 yksikköä korkea ja 0,105 leveä, ja ruudun
 *    laidalla vaippa näkyi kapselina (mitattu 6.9.2026: 22 × 50
 *    laitepikseliä, pääakselien suhde 2,2, kun keskellä 22 × 22).
 *    Levy on pelkkä lieriön kansi yläpäässä (paikallinen z = −1),
 *    normaali ulospäin, kolmiot vastapäivään ulkoa katsottuna.
 * 2. SIIRTO. Tasokartan sivusiirto (js/fokuspiste.js) on yksi sääntö,
 *    jonka pallo (js/pallolauta/nostot.js) lukee samasta funktiosta —
 *    merkki ja osuma siirtyvät, data ei.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  KAUPUNKIPISTEEN_HALKAISIJA_PX, KAUPUNKIPISTEEN_MITTAKAAVA_KORKEUS,
  KAUPUNKIPISTEEN_VAHIN_PX, LADONNAN_LEPOVIIVE_MS, LADONNAN_TAHTI_MS,
  PISTELEVYN_SIVUT, kartanMittakaavanHalkaisija, kaupunkipisteenSade,
  ladonnanAjoitus, luoPisteidenLitistaja, pistelevyGeometria, pistelevynPuskurit,
} from '../js/pallolauta/lauta.js';
import { fokuspisteenSiirto } from '../js/fokuspiste.js';

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');

/* ---- kirjaston luokkien jäljitelmät (BufferGeometry ← CylinderGeometry) ---- */
class Attribuutti {
  constructor(taulukko, koko) { this.array = taulukko; this.itemSize = koko; this.count = taulukko.length / koko; }
}
class Geometria {
  constructor() { this.attributes = {}; this.index = null; this.userData = {}; this.purettu = false; }
  setAttribute(nimi, a) { this.attributes[nimi] = a; return this; }
  setIndex(i) { this.index = i; return this; }
  dispose() { this.purettu = true; }
}
class Lierio extends Geometria {
  constructor() {
    super();
    this.type = 'CylinderGeometry';
    this.setAttribute('position', new Attribuutti(new Float32Array(3 * 6), 3));
  }
}

test('levyn kärjet ovat lieriön yläpäässä (z = −1), normaali ulospäin ja kolmiot ulkoa vastapäivään', () => {
  const { paikat, normaalit, indeksit } = pistelevynPuskurit();
  assert.equal(paikat.length, (PISTELEVYN_SIVUT + 1) * 3);
  for (let i = 0; i < paikat.length; i += 3) {
    assert.equal(paikat[i + 2], -1, `kärki ${i / 3}: z`);
    assert.deepEqual([normaalit[i], normaalit[i + 1], normaalit[i + 2]], [0, 0, -1], `kärki ${i / 3}: normaali`);
  }
  // Keskipiste origossa, kehä säteellä 1.
  assert.deepEqual([paikat[0], paikat[1]], [0, 0]);
  for (let i = 1; i <= PISTELEVYN_SIVUT; i += 1) {
    assert.ok(Math.abs(Math.hypot(paikat[i * 3], paikat[i * 3 + 1]) - 1) < 1e-6, `kehän kärki ${i} säteellä 1`);
  }
  assert.equal(indeksit.length, PISTELEVYN_SIVUT * 3, 'yksi kolmio per sivu');
  // Kolmion kiertosuunta: +z:sta katsottuna myötäpäivään (ristitulon z < 0)
  // on −z:sta eli pinnasta ulospäin katsottuna vastapäivään — FrontSide.
  for (let t = 0; t < indeksit.length; t += 3) {
    const [a, b, c] = [indeksit[t], indeksit[t + 1], indeksit[t + 2]].map((k) => [paikat[k * 3], paikat[k * 3 + 1]]);
    const z = (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
    assert.ok(z < 0, `kolmio ${t / 3}: kiertosuunta`);
    assert.equal(indeksit[t], 0, 'viuhka keskipisteestä');
  }
  const kaytetyt = new Set(indeksit);
  assert.equal(kaytetyt.size, PISTELEVYN_SIVUT + 1, 'jokainen kärki käytössä');
});

test('levygeometria rakennetaan kirjaston omilla luokilla mallilieriöstä', () => {
  const levy = pistelevyGeometria(new Lierio());
  assert.ok(levy instanceof Geometria && !(levy instanceof Lierio), 'kantaluokka, ei lieriö');
  assert.ok(levy.attributes.position instanceof Attribuutti);
  assert.equal(levy.attributes.position.count, PISTELEVYN_SIVUT + 1);
  assert.equal(levy.attributes.normal.itemSize, 3);
  assert.equal(levy.index.length, PISTELEVYN_SIVUT * 3);
  assert.equal(levy.userData.pistelevy, true);
  // Vieras muoto → null, piste jää lieriöksi (ei kaatumista).
  assert.equal(pistelevyGeometria(null), null);
  assert.equal(pistelevyGeometria({ constructor: Object, attributes: {} }), null);
});

test('litistäjä vaihtaa lieriön yhteiseen levyyn kerran per olio ja purkaa sen laudan mukana', () => {
  const l = luoPisteidenLitistaja();
  const a = { id: 'ateena', __threeObjPoint: { geometry: new Lierio() } };
  const b = { id: 'sofia', __threeObjPoint: { geometry: new Lierio() } };
  assert.equal(l.litista({ id: 'ei-oliota' }), false, 'ilman oliota ei mitään');
  assert.equal(l.litista(a), true);
  assert.equal(l.litista(a), false, 'toinen luenta ei vaihda uudestaan');
  assert.equal(l.litista(b), true);
  assert.equal(a.__threeObjPoint.geometry, b.__threeObjPoint.geometry, 'yksi jaettu levy');
  assert.equal(a.__threeObjPoint.geometry.userData.pistelevy, true);
  const levy = l.levy();
  l.pura();
  assert.equal(levy.purettu, true);
  assert.equal(l.levy(), null);
  // Purun jälkeen uusi olio saa uuden levyn.
  const c = { id: 'rooma', __threeObjPoint: { geometry: new Lierio() } };
  assert.equal(l.litista(c), true);
  assert.notEqual(c.__threeObjPoint.geometry, levy);
});

test('lauta litistää pisteet säteen luennassa ja purkaa levyn purussa', () => {
  const lauta = lue('../js/pallolauta/lauta.js');
  assert.match(lauta, /const litistaja = luoPisteidenLitistaja\(\);\n\s*pallo\n\s*\.pointsData\(\[\]\)/);
  assert.match(lauta, /\.pointRadius\(\(d\) => \{\n(?:\s*\/\/.*\n)*\s*litistaja\.litista\(d\);/);
  assert.match(lauta, /litistaja\.pura\(\);/);
});

/* ---- aarrepiste (kohtaamispiste) pois nappulan alta ---- */

test('kohtaamispisteen sivusiirto: laatan vieressä koilliseen, kaukana ei siirtoa', () => {
  const city = { x: 6624, y: 1882 };
  const lahella = fokuspisteenSiirto(city, { x: 6624.2, y: 1881.9 });
  assert.ok(lahella.x > 0 && lahella.y < 0, `oikealle ja ylös: ${JSON.stringify(lahella)}`);
  assert.deepEqual(fokuspisteenSiirto(city, { x: 6700, y: 1900 }), { x: 0, y: 0 });
  // Rajalla: alle kynnyksen siirtyy, kynnyksen päällä ei.
  assert.ok(fokuspisteenSiirto(city, { x: city.x + 13.9, y: city.y }).x > 0);
  assert.deepEqual(fokuspisteenSiirto(city, { x: city.x + 14, y: city.y }), { x: 0, y: 0 });
  // Puuttuvat koordinaatit eivät kaada eivätkä siirrä.
  assert.deepEqual(fokuspisteenSiirto({}, { x: 1, y: 1 }), { x: 0, y: 0 });
  assert.deepEqual(fokuspisteenSiirto(city, null), { x: 0, y: 0 });
});

test('tasokartta ja pallo lukevat saman siirron: merkki ja osuma siirtyvät, data ei', () => {
  const fokuspiste = lue('../js/fokuspiste.js');
  assert.match(fokuspiste, /const \{ x: sx, y: sy \} = fokuspisteenSiirto\(city, piste\);/);
  assert.match(fokuspiste, /x: x \+ sx, y: piste\.y \+ sy/);
  const nostot = lue('../js/pallolauta/nostot.js');
  assert.match(nostot, /import \{ avaaFokuspiste, fokuspisteKuvio, fokuspisteenSiirto \} from '\.\.\/fokuspiste\.js';/);
  assert.match(nostot, /const siirto = fokuspisteenSiirto\(city, piste\);\n\s*const a = asteet\(\{ x: piste\.x \+ siirto\.x, y: piste\.y \+ siirto\.y \}\);/);
  // Pallon osumatesti lukee saman rivin lat/lng:n (lahinMerkki → nostot.osumat()).
  assert.match(nostot, /lat: a\.lat,\n\s*lng: a\.lon,/);
  const lauta = lue('../js/pallolauta/lauta.js');
  assert.match(lauta, /for \(const o of nostot\.osumat\(\)\) ehdokkaat\.push\(\{ laji: 'nosto', lat: o\.lat, lng: o\.lng, o \}\);/);
});

/* ---- pisteen paikka tulee piirrosta, ei tapahtumasta ---- */

/*
 * VARTIJA (omistajan vikailmoitus 12.9.2026, sanatarkasti: *"kaupunkien
 * ja kohteiden pallot liikkuvat hieman panoroitaessa ja hyppäävät
 * hieman kun kartan liike loppuu"*).
 *
 * Kaupunkipisteen levy siirretään katsesäteelle (LEVY KATSESÄTEELLE).
 * Jos se tehdään OrbitControlsin `change`-tapahtumassa, paikka on
 * oikea vain niillä kehyksillä, joilla `change` sattuu laukeamaan —
 * kirjaston oma pistesiirtymä kirjoittaa paikan takaisin pinnalle
 * JOKA kehyksellä, ja `pointOfView(pov, 0)` siirtää kameran kirjaston
 * ohi. Sama vika, sama lääke kuin v1649:ssä laattakerroksella ja
 * vektoriviivoilla: mitta tulee piirrosta (js/pallo.js
 * kytkePallonKehys).
 *
 * Testi kaatuu, jos paikka palaa tapahtumaan TAI jos piirtokoukkuun
 * lipsahtaa työtä, joka kasvaa merkkien mukana (ladonta, nostot,
 * nimet, asettelun luenta) — kehysbudjetti ei saa riippua siitä,
 * montako nostoa kartalla sattuu olemaan.
 */
test('kaupunkipisteiden paikka kirjoitetaan piirtokoukussa, ei change-tapahtumassa', () => {
  const lauta = lue('../js/pallolauta/lauta.js');
  // 1. Koukku on kytketty ja puretaan laudan mukana.
  assert.match(lauta, /const kehyspurku = kytkePallonKehys\(pallo, kotelo, pisteetKehyksessa\);/);
  assert.match(lauta, /\n\s*kehyspurku\(\);/);
  assert.match(lauta, /\n\s*kytkePallonKehys,\n/, 'kytkePallonKehys on tuotava js/pallo.js:stä');
  // 2. Katsesäteen laskenta on koukun käyttämässä funktiossa.
  const aseta = lauta.match(/const asetaPisteidenPaikat = \(kameranPaikka\) => \{[\s\S]*?\n {2}\};/);
  assert.ok(aseta, 'asetaPisteidenPaikat puuttuu');
  assert.match(aseta[0], /katsesateenPaikka\(/);
  assert.match(aseta[0], /o\.position\.set\(/);
  // 3. Tapahtumavetoinen tahdistaPisteidenKoko EI enää kirjoita paikkaa:
  //    se on kokojen (scale) asia, ja koko saa maksaa tapahtuman verran.
  const tahdista = lauta.match(/const tahdistaPisteidenKoko = \(\) => \{[\s\S]*?\n {2}\};/);
  assert.ok(tahdista, 'tahdistaPisteidenKoko puuttuu');
  assert.doesNotMatch(tahdista[0], /o\.position\.set\(/,
    'paikka ei saa tulla change-tapahtumasta — se jää kehyksiä jälkeen kamerasta');
  assert.doesNotMatch(tahdista[0], /katsesateenPaikka\(/);
  // 4. Koukku pysyy halpana: ei ladontaa eikä asettelun luentaa kehyksessä.
  const koukku = lauta.match(/const pisteetKehyksessa = \(\{[\s\S]*?\n {2}\};/);
  assert.ok(koukku, 'pisteetKehyksessa puuttuu');
  for (const kielletty of [
    'ladoLevossa', 'nostot.paivita', 'nimet.lado', 'kohdekaupunki(',
    'getBoundingClientRect', 'clientWidth', 'clientHeight', 'getScreenCoords',
  ]) {
    assert.ok(!koukku[0].includes(kielletty),
      `piirtokoukku ei saa tehdä työtä, joka kasvaa merkkien mukana: ${kielletty}`);
  }
});

/* ---- ladonta kulkee liikkeen mukana, ei odota sen loppua ---- */

/*
 * VARTIJA (omistaja 12.9.2026, sanatarkasti: *"Pisteet pysyvät nyt
 * paikallaan mutta kun panorointi loppuu kaikki liikkuvat hieman ja
 * hakevat paikkansa uudestaan"*).
 *
 * Levon ladonta oli puhdas VAIMENNUS: joka kameran muutos nollasi
 * ajastimen, joten ladonta ei ajautunut kertaakaan kesken vedon ja
 * purkautui yhtenä nykäyksenä liikkeen päätyttyä. Mitattu selaimessa
 * (390 x 844, 2,0 s panorointi, ohjainten `change` 60 Hz): ladontoja
 * liikkeen aikana 0 ja ladonta oli liikkeen päättyessä 2010 ms vanha.
 * Kurituksella samassa mittauksessa 11 ladontaa ja ikä 1 ms.
 *
 * Testi kaatuu, jos ajoitus palaa vaimennukseksi (ei koskaan `heti`)
 * tai jos tahti kasvaa lepoviivettä suuremmaksi — kummassakin
 * tapauksessa nykäys palaisi.
 */
test('ladonnan ajoitus on kuritus eikä vaimennus: liikkeen aikanakin ladotaan', () => {
  assert.ok(LADONNAN_TAHTI_MS > 0);
  assert.ok(LADONNAN_TAHTI_MS <= LADONNAN_LEPOVIIVE_MS,
    'tahti ei saa olla lepoviivettä pitempi — muuten ladonta odottaisi taas liikkeen loppua');
  // Tahdin täytyttyä ladotaan HETI, kesken liikkeen.
  for (const kulunut of [LADONNAN_TAHTI_MS, LADONNAN_TAHTI_MS + 1, 5000]) {
    assert.equal(ladonnanAjoitus(kulunut).heti, true, `kulunut ${kulunut}`);
  }
  // Tahdin sisällä odotetaan, mutta vain tahdin loppuun — ei nollata.
  assert.deepEqual(ladonnanAjoitus(0), { heti: false, viiveMs: LADONNAN_TAHTI_MS });
  assert.deepEqual(ladonnanAjoitus(120), { heti: false, viiveMs: LADONNAN_TAHTI_MS - 120 });
  // Perälauta on aina olemassa: liikkeen viimeinen kehys saa ladontansa.
  for (const kulunut of [0, 50, 199, 200, 10000]) {
    assert.ok(Number.isFinite(ladonnanAjoitus(kulunut).viiveMs), `kulunut ${kulunut}`);
  }
  // 2 s panorointi 60 Hz: monta ladontaa, ei nollaa.
  let kello = 0; let viimeisin = -Infinity; let ajoja = 0;
  for (let i = 0; i < 120; i += 1) {
    const { heti } = ladonnanAjoitus(kello - viimeisin);
    if (heti) { viimeisin = kello; ajoja += 1; }
    kello += 16.7;
  }
  assert.ok(ajoja >= 9, `2 s panoroinnissa pitää ladota useasti, nyt ${ajoja}`);
  // Ladonnan ikä liikkeen päättyessä on enintään yksi tahti.
  // Kello on yhden askeleen viimeisen tapahtuman jälkeen: ikä mitataan siitä.
  assert.ok(kello - 16.7 - viimeisin <= LADONNAN_TAHTI_MS,
    `ladonta saa olla enintään tahdin verran vanha, nyt ${(kello - 16.7 - viimeisin).toFixed(0)} ms`);
});

/* ---- pisteen koko seuraa kartan mittakaavaa ulos zoomatessa ---- */

/*
 * VARTIJA (omistaja 12.9.2026, sanatarkasti: *"kaupunkien pisteiden
 * koko oli minusta ennen sidottu kartan zoom tasoon niin että ne
 * pienentyvät ulos zoomatessa kartan mukana"*).
 *
 * Kaupunkipiste oli 7.9.2026 alkaen RUUDUN vakio joka korkeudella.
 * Nyt ulos zoomattaessa se pienenee kartan mukana lattiaan asti;
 * lähikuvassa mitta on yhä ruudun, joten 7.9. korjaus ("iso musta
 * ympyrä" iPadilla) ei voi palata.
 *
 * Mitattu selaimessa (390 x 844 dpr 2, Ateena, muut kuin pelaajan
 * kaupunki) ennen ja jälkeen:
 *
 *   korkeus 0,12  22,87 px -> 22,87 px   (lähikuva ennallaan)
 *   korkeus 0,37   7,00 px ->  7,00 px   (vertailunäkymä ennallaan)
 *   korkeus 0,60   7,00 px ->  4,32 px
 *   korkeus 1,00   7,00 px ->  3,00 px   (lattia)
 *   korkeus 2,00   7,00 px ->  3,00 px   (lattia)
 *
 * Suhde kartan mittakaavaan (halkaisija / px per lautayksikkö) oli
 * ennen 6,31 -> 32,11 ja on nyt 6,31 -> 5,95 -> 5,96, eli vakio
 * lattiaan asti.
 */
test('pisteen koko seuraa kartan mittakaavaa ulos zoomatessa, lattiaan asti', () => {
  const d = KAUPUNKIPISTEEN_HALKAISIJA_PX;
  const h0 = KAUPUNKIPISTEEN_MITTAKAAVA_KORKEUS;
  // Lähikuva ja vertailunäkymä: ruudun mitta, ei pikseliäkään muutosta.
  for (const korkeus of [0.05, 0.12, 0.2, h0]) {
    assert.equal(kartanMittakaavanHalkaisija(d, korkeus), d, `korkeus ${korkeus}`);
  }
  // Ulos zoomatessa PIENENEE — tämä kaatuu, jos koko palaa ruutuvakioksi.
  const ulos = [0.5, 0.6, 0.8].map((k) => kartanMittakaavanHalkaisija(d, k));
  assert.ok(ulos[0] < d && ulos[1] < ulos[0] && ulos[2] < ulos[1],
    `pisteen on pienennyttävä ulos zoomatessa: ${ulos.join(', ')}`);
  // Suhde on TÄSMÄLLEEN kartan mittakaava (kunnes lattia puree).
  for (const korkeus of [0.5, 0.6, 0.75]) {
    assert.ok(Math.abs(kartanMittakaavanHalkaisija(d, korkeus) - d * (h0 / korkeus)) < 1e-9,
      `korkeus ${korkeus}: kerroin ei ole kartan mittakaava`);
  }
  // Lattia: piste ei katoa yleiskuvassa eikä uloimmalla zoomilla.
  for (const korkeus of [1, 2, 5]) {
    assert.equal(kartanMittakaavanHalkaisija(d, korkeus), KAUPUNKIPISTEEN_VAHIN_PX, `korkeus ${korkeus}`);
  }
  // Lattia ei KASVATA jo pienempää pistettä.
  assert.equal(kartanMittakaavanHalkaisija(2, 5), 2);
  // Rikkinäiset luvut eivät kaada eivätkä muuta mitään.
  assert.equal(kartanMittakaavanHalkaisija(d, 0), d);
  assert.equal(kartanMittakaavanHalkaisija(0, 1), 0);
  // Mitatut ruutuluvut (390 x 844): 0,60 -> 4,32 px ja 1,00 -> 3,00 px.
  assert.ok(Math.abs(kartanMittakaavanHalkaisija(d, 0.6) - 4.32) < 0.01);
  assert.equal(kartanMittakaavanHalkaisija(d, 1), 3);
  // Säde luetaan samasta kutistetusta mitasta kuin piirto.
  const lauta = lue('../js/pallolauta/lauta.js');
  assert.match(lauta, /const piirrettyHalkaisijaPx = \(halkaisijaPx\) => kartanMittakaavanHalkaisija\(/);
  assert.match(lauta, /\{ halkaisijaPx: piirrettyHalkaisijaPx\(halkaisijaPx\) \}/);
});

test('kutistuminen näkyy myös pallon yksiköissä: säde pienenee ulos zoomatessa', () => {
  const H = 844;
  const mitta = (korkeus) => kaupunkipisteenSade(korkeus, H, {
    halkaisijaPx: kartanMittakaavanHalkaisija(KAUPUNKIPISTEEN_HALKAISIJA_PX, korkeus),
  });
  // Ruutuhalkaisija = säde x 2 x 2 pi R / 360 x (H / (2 R h tan(fov/2))):
  // R supistuu, joten riittää verrata sädettä/korkeutta.
  // kaupunkipisteenSade kaanteisesti: d = sade x H / (h x tan(fov/2) x 180/pi)
  const px = (korkeus) => (mitta(korkeus) * H) / (korkeus * Math.tan((50 / 2) * Math.PI / 180) * (180 / Math.PI));
  assert.ok(Math.abs(px(0.37) - KAUPUNKIPISTEEN_HALKAISIJA_PX) < 0.01, `${px(0.37)}`);
  assert.ok(px(1) < px(0.6) && px(0.6) < px(0.37), `${px(1)} < ${px(0.6)} < ${px(0.37)}`);
  assert.ok(Math.abs(px(1) - KAUPUNKIPISTEEN_VAHIN_PX) < 0.01, `${px(1)}`);
});
