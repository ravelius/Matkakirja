import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

/*
 * KOHDEKAUPUNKI ON SELVÄSTI SUUREMPI KUIN KOHDEMERKIT (omistaja
 * 8.9.2026, iPad-kaappaus Riiasta).
 *
 * OMISTAJA, SANATARKASTI: *"Miksi kohdekaupunki näkyy noin pienenä
 * pallona? Se saisi olla selvästi suurempi."* — ja klo 15.45 lisäys:
 * *"tee samoin myös kohdekaupungin tekstille joka jää lähellä liian
 * pieneksi."*
 *
 * MITATTU ENNEN (omistajan kaappaus, iPad 834 x 1210 css, dpr 2,
 * pikselitasolla): kaupunkipiste 7,0 css-px, kohdemerkki 11,0 css-px,
 * poltettu kohdenimiö 16,4 css-px, kaupungin nimi 13,5 css-px. Kaupunki
 * — se, johon matkustetaan — oli kartan pienin merkki, ja lähikuvassa
 * myös sen nimi jäi kohteiden nimien alle.
 *
 * SÄÄNTÖ (js/pallolauta/lauta.js kohdekaupunginMitat): kaupungin piste
 * ja nimi saavat LATTIAN, joka mitataan kartan omista kohdemerkeistä.
 * Lattia ei koskaan pienennä mitään — yleisnäkymässä piste on entinen
 * 7 px ja nimi entinen 13,5 px.
 *
 * Nämä vartijat pitävät molemmat päät kiinni: lattia on olemassa ja
 * riittävän korkea, EIKÄ kaukonäkymä muutu.
 *
 * ── ILLAN KAKSI KORJAUSTA 8.9.2026 (Mac-kaappaukset) ──────────────
 *
 * 1. *"tällä zoom tasolla kaupunki pallot jäävät liian isoiksi"*
 *    (koko Eurooppa ruudulla, Fogg Kiovassa). Lattia oli laskettu
 *    kerran näkymästä ja kirjoitettu kaikille 261 pisteelle; Ukrainan
 *    levyinen lehti avasi portin jo koko Euroopan zoomilla (mitattu
 *    Chromium 1419 x 821 css, korkeus 0,42: lehdenOsuus 0,82, jokainen
 *    piste 17,2 px, kun 7,0 px oli oikea). Nyt lattia koskee VAIN
 *    pelaajan kaupunkia (kaupunkipisteenHalkaisijaPx); mitattu jälkeen
 *    Kiova 16,3–17,0 px ja muut 6,8 px (perspektiivi syö vajaan
 *    kymmenyksen 7 px:stä).
 * 2. *"kaupunkien pisteet eivät myöskään pysy paikallaan, vaan
 *    liikkuvat panoroitaessa."* Levy oli 0,3 yksikköä pinnan
 *    yläpuolella pintanormaalin suuntaan, ja parallaksi siirsi sitä
 *    ruudulla ulospäin 4,2 % etäisyydestä keskustaan (mitattu Chromium
 *    1440 x 900 css dpr 2, korkeus 0,08: 197 px keskustasta -> 8,3 px,
 *    294 px -> 12,3 px). Nyt levy siirretään KATSESÄTEELLE
 *    (katsesateenPaikka); mitattu jälkeen 0,00 px kaikissa neljässä
 *    näkymässä.
 */

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const {
  KAUPUNKIPISTEEN_HALKAISIJA_PX, KOHDEKAUPUNGIN_NIMI_SUHDE,
  KOHDEKAUPUNGIN_PISTE_SUHDE, OMAN_KAUPUNGIN_KERROIN, katsesateenPaikka,
  kaupunkipisteenHalkaisijaPx, kaupunkipisteenSade,
  kohdekaupunginMitat, poltetunMusteenSuurennus,
} = await import('../js/pallolauta/lauta.js');
const { KOHDEMERKIN_RUUTU_PX } = await import('../js/pallolauta/nostot.js');
const { KARTTANIMI_KOOT, ladoRuutunimet } = await import('../js/karttanimet.js');
const { PALLON_SALLITTU_VENYTYS } = await import('../js/pallolauta/kamera.js');

/* ================================================================== *
 * 1. PISTEEN LATTIA: >= 1,5 x KOHDEMERKKI
 * ================================================================== */
/* ================================================================== *
 * 1. YKSI SÄÄNTÖ: PISTE ON KARTAN MITASSA (omistaja 12.9.2026)
 *
 * *"Kaupunkien pistekoko muuttuu vielä lähemmillä zoom tasoilla"* ja
 * aiemmin samana päivänä *"koko oli minusta ennen sidottu kartan zoom
 * tasoon niin että ne pienentyvät ulos zoomatessa kartan mukana"*.
 *
 * Sääntöjä oli neljä neljällä zoomivälillä: 7 px:n ruutuvakio (7.9.),
 * lehden osuudesta liukuva lattia (8.9.), kameran mittakaavasta
 * liukuva lähizoomi (9.9.) ja kartan mittakaava vasta korkeudesta 0,37
 * ulospäin (12.9. ensimmäinen yritys). Nyt niitä on yksi, ja tämän
 * tiedoston 8.9. ja 9.9. mitoitukset elävät sen KATTONA ja
 * KERTOIMENA — ks. tests/pallopiste.test.mjs, jossa säännön oma
 * vartija on.
 * ================================================================== */

test('pelaajan oma kaupunki on 8.9.2026 mitoituksen verran suurempi', () => {
  assert.ok(KOHDEKAUPUNGIN_PISTE_SUHDE >= 1.5,
    `suhde ${KOHDEKAUPUNGIN_PISTE_SUHDE} < 1,5`);
  const oma = kaupunkipisteenHalkaisijaPx({ id: 'kiova' }, 'kiova');
  // 8.9.2026 mitattu lattia 17,16 px on nyt kerroin, ei oma ruutumitta.
  assert.ok(Math.abs(oma - KOHDEKAUPUNGIN_PISTE_SUHDE * KOHDEMERKIN_RUUTU_PX) < 1e-9,
    `oma ${oma.toFixed(2)} != 1,5 x ${KOHDEMERKIN_RUUTU_PX.toFixed(2)}`);
  assert.ok(oma >= KOHDEMERKIN_RUUTU_PX, 'oma kaupunki ei saa jäädä kohdemerkkiä pienemmäksi');
  assert.ok(Math.abs(OMAN_KAUPUNGIN_KERROIN - oma / KAUPUNKIPISTEEN_HALKAISIJA_PX) < 1e-9);
  // Jokainen muu on perusmitta, myös lähikuvassa — kerroin ei vuoda.
  for (const id of ['venetsia', 'lontoo', 'ateena', 'berliini']) {
    assert.equal(kaupunkipisteenHalkaisijaPx({ id }, 'kiova'), KAUPUNKIPISTEEN_HALKAISIJA_PX, id);
  }
  // Pelaaja reitillä (ei kaupunkia) ja tunnukseton piste: perusmitta.
  assert.equal(kaupunkipisteenHalkaisijaPx({ id: 'kiova' }, null), KAUPUNKIPISTEEN_HALKAISIJA_PX);
  assert.equal(kaupunkipisteenHalkaisijaPx({ laji: 'helmi' }, 'kiova'), KAUPUNKIPISTEEN_HALKAISIJA_PX);
});

test('pelaajan siirtyessä korostus siirtyy uuteen kaupunkiin', () => {
  const kiova = { id: 'kiova' };
  const venetsia = { id: 'venetsia' };
  const iso = KAUPUNKIPISTEEN_HALKAISIJA_PX * OMAN_KAUPUNGIN_KERROIN;
  assert.equal(kaupunkipisteenHalkaisijaPx(kiova, 'kiova'), iso);
  assert.equal(kaupunkipisteenHalkaisijaPx(venetsia, 'kiova'), KAUPUNKIPISTEEN_HALKAISIJA_PX);
  // Sama piste, uusi pelaajan kaupunki: vanha palaa perusmittaan.
  assert.equal(kaupunkipisteenHalkaisijaPx(kiova, 'venetsia'), KAUPUNKIPISTEEN_HALKAISIJA_PX);
  assert.equal(kaupunkipisteenHalkaisijaPx(venetsia, 'venetsia'), iso);
});

/* ================================================================== *
 * 2. KAUKONÄKYMÄ: NIMI EI MUUTU
 * ================================================================== */

test('yleisnäkymässä nimi on entisellään ja 7 px on yhä perusmitta', () => {
  assert.equal(kohdekaupunginMitat({ suurennus: 1 }).nimiKerroin, 1);
  // Omistajan 7.9.2026 mitta on yhä se, josta sääntö lähtee.
  assert.equal(KAUPUNKIPISTEEN_HALKAISIJA_PX, 7);
});

test('poltetun musteen suurennus on 1 kaukaa ja katossa lähinnä', () => {
  // Koko pallo ruudulla: laatta on pienennettynä, ei venytettynä.
  assert.equal(poltetunMusteenSuurennus({ leveysPx: 834, dpr: 2, leveysYks: 12000 }), 1);
  // iPad lähimmässä näkymässä: venytys 1,93 (tests/pallo.test.mjs) ja
  // poltto olettaa dpr 2 → suurennus 1,93; poltettu 8,5 px:n nimiö on
  // ruudulla 16,4 css-px, aivan kuten omistajan kaappauksesta mitattiin.
  const ipad = poltetunMusteenSuurennus({ leveysPx: 834, dpr: 2, leveysYks: 60 });
  assert.ok(Math.abs(ipad - 1.93) < 0.06, `iPadin suurennus ${ipad.toFixed(3)}`);
  // Katto on laattojen oma sallittu venytys — sumu ei kasvata merkkejä.
  const tyopoyta = poltetunMusteenSuurennus({ leveysPx: 1440, dpr: 2, leveysYks: 60 });
  assert.equal(tyopoyta, PALLON_SALLITTU_VENYTYS);
  // Puhelimen tiheä ruutu näyttää poltetun pienempänä: lattia on 1.
  assert.equal(poltetunMusteenSuurennus({ leveysPx: 390, dpr: 3, leveysYks: 60 }), 1);
});

/* ================================================================== *
 * 3. NIMEN LATTIA: >= 1,3 x KOHTEEN NIMI RUUDULLA
 * ================================================================== */

test('lähikuvassa kaupungin nimi on vähintään 1,3 x kohdenimiö', () => {
  assert.ok(KOHDEKAUPUNGIN_NIMI_SUHDE >= 1.3);
  for (const suurennus of [1, 1.3, 1.6, 1.93, PALLON_SALLITTU_VENYTYS]) {
    const { nimiKerroin } = kohdekaupunginMitat({ osuus: 1, suurennus });
    const nimiPx = KARTTANIMI_KOOT.kaupunki * nimiKerroin;
    const kohdePx = KARTTANIMI_KOOT.kohde * suurennus;
    assert.ok(nimiPx >= 1.3 * kohdePx - 1e-9,
      `suurennus ${suurennus}: nimi ${nimiPx.toFixed(2)} < 1,3 x ${kohdePx.toFixed(2)}`);
    assert.ok(nimiPx >= KARTTANIMI_KOOT.kaupunki - 1e-9, 'nimi ei saa pienetä');
  }
  // iPadin lähikuva: 13,5 -> 21,3 px, kun poltettu nimiö on 16,4 px.
  const ipad = kohdekaupunginMitat({ osuus: 1, suurennus: 1.93 });
  assert.ok(Math.abs(KARTTANIMI_KOOT.kaupunki * ipad.nimiKerroin - 21.3) < 0.5);
});

test('ladonta latoo nimen ja varaa pisteen lattian mitassa', () => {
  const c = {
    id: 'riika', nimi: 'Riika', iso: false, lx: 20, ly: 5, la: 'start',
  };
  const ehdokkaat = [{ c, x: 200, y: 200 }];
  const perus = ladoRuutunimet(ehdokkaat, { katto: 5 });
  const iso = ladoRuutunimet(ehdokkaat, { katto: 5, kokoKerroin: 1.6, pisteSade: 8.6 });
  assert.equal(perus.nimiot.length, 1);
  assert.equal(iso.nimiot.length, 1);
  assert.ok(iso.nimiot[0].koko > perus.nimiot[0].koko * 1.5,
    `koko ${iso.nimiot[0].koko} vs ${perus.nimiot[0].koko}`);
  // Nimi väistää suurempaa pistettä: laatikko ei jää pisteen päälle.
  const r = iso.nimiot[0].r;
  const paallakkain = r.x0 < 208.6 && r.x1 > 191.4 && r.y0 < 208.6 && r.y1 > 191.4;
  assert.equal(paallakkain, false, `nimi pisteen päällä: ${JSON.stringify(r)}`);
});

test('pisteen säde noudattaa annettua ruutuhalkaisijaa', () => {
  const perus = kaupunkipisteenSade(0.08, 1210);
  const iso = kaupunkipisteenSade(0.08, 1210, { halkaisijaPx: 17.16 });
  assert.ok(Math.abs(iso / perus - 17.16 / KAUPUNKIPISTEEN_HALKAISIJA_PX) < 1e-6);
});


/* ================================================================== *
 * 4. KYTKENNÄT: YKSI SÄÄNTÖ ON OIKEASSA POLUSSA
 * ================================================================== */

test('piste, ladonta ja osuma lukevat saman yhden säännön', () => {
  const lauta = lue('../js/pallolauta/lauta.js');
  // Yksi funktio antaa piirretyn halkaisijan, ja kaikki lukevat sen.
  assert.match(lauta, /const piirrettyHalkaisijaPx = \(d\) => kartanMittakaavanHalkaisija\(/);
  assert.match(lauta, /const pisteenSade = \(d\) => sadeRuudulta\(piirrettyHalkaisijaPx\(d\)\);/);
  assert.match(lauta, /return pisteenSade\(d\);/);
  assert.match(lauta, /const pelaajanKaupunki = \(\) => ui\.game\?\.cityOf\?\.\(\)\?\.id \?\? null;/);
  assert.match(lauta, /kokoKerroin: kaupunginMitat\.nimiKerroin/);
  assert.match(lauta, /pisteSade: piirrettyHalkaisijaPx\(/);
  assert.match(lauta, /const pisteenPx = voittaja\?\.laji === 'kaupunki' \? piirrettyHalkaisijaPx\(voittaja\.k\) : 0;/);
  // Zoomiliukuja ei saa palata: pisteen koko ei lue lehden osuutta
  // eikä kameran mittakaavaa, vain kameran korkeuden.
  assert.ok(!lauta.includes('lahizoominOsuus'), 'lähizoomin liuku palasi');
  assert.ok(!/kaupunkiMitat = kohdekaupunginMitat\(\{[\s\S]{0,200}osuus:/.test(lauta),
    'lehden osuus palasi pisteen kokoon');
  // Kohdemerkkien oma portti on yhä nostoilla, ei pisteellä.
  const nostot = lue('../js/pallolauta/nostot.js');
  assert.match(nostot, /lehdenOsuus\(pohja, nakyva, pack\.id\) >= LEHDEN_VAHIN_OSUUS/);
  assert.match(nostot, /if \(!pack \|\| ui\.katselu \|\| game\.phase === 'pickstart' \|\| ui\.aloituslentoKesken\) return 0;/);
  assert.match(nostot, /if \(ui\.movingPlayerId != null\) return 0;/);
  // Osuma-alue ei ole sidottu pisteen kokoon (sormen 44 px).
  assert.match(lauta, /NAPAUTUKSEN_SADE_PX = 44/);
});

/* ================================================================== *
 * 6. LEVY KATSESÄTEELLE: PISTE PYSYY KAUPUNKINSA PÄÄLLÄ
 * ================================================================== */

const yks = (v) => {
  const p = Math.hypot(v.x, v.y, v.z);
  return { x: v.x / p, y: v.y / p, z: v.z / p };
};
/** Levyn keskipiste maailmassa: olion paikka + korkeus pintanormaalia. */
const levynPaikka = (paikka, pinta, korkeus) => {
  const n = yks(pinta);
  return { x: paikka.x + korkeus * n.x, y: paikka.y + korkeus * n.y, z: paikka.z + korkeus * n.z };
};

test('levy asettuu katsesäteelle: projektio osuu pinnan pisteeseen', () => {
  const R = 100;
  const pinta = { x: 12.3, y: 45.6, z: Math.sqrt(R * R - 12.3 ** 2 - 45.6 ** 2) };
  const korkeus = 0.3;
  // Kamera lähikuvassa (korkeus 0,08) hieman sivussa kaupungista.
  for (const kamera of [
    { x: 0, y: 0, z: 108 },
    { x: 20, y: 50, z: 92 },
    { x: -30, y: 60, z: 80 },
    { x: 0, y: 250, z: 0 },
  ]) {
    const paikka = katsesateenPaikka(pinta, kamera, korkeus);
    const levy = levynPaikka(paikka, pinta, korkeus);
    // Levy on kameran ja pinnan pisteen välisellä janalla…
    const suunta = yks({ x: kamera.x - pinta.x, y: kamera.y - pinta.y, z: kamera.z - pinta.z });
    const ero = { x: levy.x - pinta.x, y: levy.y - pinta.y, z: levy.z - pinta.z };
    const matka = Math.hypot(ero.x, ero.y, ero.z);
    assert.ok(Math.abs(matka - korkeus) < 1e-9, `levy ${matka} yksikköä pinnasta`);
    // …eli täsmälleen katsesäteen suunnassa: ristitulo on nolla.
    const risti = Math.hypot(
      ero.y * suunta.z - ero.z * suunta.y,
      ero.z * suunta.x - ero.x * suunta.z,
      ero.x * suunta.y - ero.y * suunta.x,
    );
    assert.ok(risti < 1e-9, `levy ei ole katsesäteellä (ristitulo ${risti})`);
  }
});

test('katsesäde ei kasaa siirtoa eikä kaadu vajailla arvoilla', () => {
  const pinta = { x: 0, y: 0, z: 100 };
  const kamera = { x: 8, y: 0, z: 106 };
  // Sama lasku samasta pinnan pisteestä antaa aina saman paikan
  // (lauta laskee aina datumin asteista, ei olion nykyisestä paikasta).
  const a = katsesateenPaikka(pinta, kamera, 0.3);
  const b = katsesateenPaikka(pinta, kamera, 0.3);
  assert.deepEqual(a, b);
  // Vajaat arvot palauttavat pinnan pisteen sellaisenaan.
  assert.equal(katsesateenPaikka(pinta, kamera, 0), pinta);
  assert.equal(katsesateenPaikka(pinta, null, 0.3), pinta);
  assert.equal(katsesateenPaikka(null, kamera, 0.3), null);
});

test('parallaksi on poissa: mitattu 4,2 % -> 0,00 px (Chromium 1440 x 900)', () => {
  /*
   * Sama laskenta kuin selainmittauksessa: pinnan piste ja levyn
   * keskipiste projisoituna samalla kameralla. Kamera on korkeudella
   * 0,08 (R = 100) ja kaupunki 197 px ruudun keskustasta, jolloin
   * ennen korjausta siirto oli 8,3 px (4,2 %).
   */
  const R = 100;
  const korkeus = 0.3;
  const kamera = { x: 0, y: 0, z: R * 1.08 };
  const f = 900 / (2 * Math.tan((50 / 2) * (Math.PI / 180)));
  const ruudulle = (p) => ({ x: (f * p.x) / (kamera.z - p.z), y: (f * p.y) / (kamera.z - p.z) });
  const theta = 0.0376; // ~197 px keskustasta tällä ruudulla
  const pinta = { x: R * Math.sin(theta), y: 0, z: R * Math.cos(theta) };
  const pintaRuudulla = ruudulle(pinta);
  // ENNEN: levy pintanormaalin suunnassa.
  const n = yks(pinta);
  const ennen = ruudulle({ x: pinta.x + korkeus * n.x, y: 0, z: pinta.z + korkeus * n.z });
  const siirtoEnnen = Math.abs(ennen.x - pintaRuudulla.x);
  assert.ok(siirtoEnnen / Math.abs(pintaRuudulla.x) > 0.03,
    `ennen-parallaksi ${(100 * siirtoEnnen) / Math.abs(pintaRuudulla.x)} % — vika ei toistu`);
  // JÄLKEEN: levy katsesäteellä.
  const levy = levynPaikka(katsesateenPaikka(pinta, kamera, korkeus), pinta, korkeus);
  const jalkeen = ruudulle(levy);
  assert.ok(Math.abs(jalkeen.x - pintaRuudulla.x) < 1e-9,
    `jäännösparallaksi ${Math.abs(jalkeen.x - pintaRuudulla.x)} px`);
});

test('katsesäde kirjoitetaan kameran liikkeestä, ladonnasta ja siirtymän jälkeen', () => {
  const lauta = lue('../js/pallolauta/lauta.js');
  // Paikka lasketaan datumin asteista, ei olion nykyisestä paikasta.
  assert.match(lauta, /katsesateenPaikka\(\s*\n?\s*pallonPiste\(d\.lat, d\.lon, pallonSade\), kameranPaikka, o\.scale\.z,/);
  // Kamera-tapahtuma ja ladonta ajavat saman tahdistuksen kuin ennen.
  assert.match(lauta, /ohjaimet\.addEventListener\('change', tahdistaPisteidenKoko\)/);
  // Kirjaston siirtymä ja herätys korjataan jälkikäteen.
  assert.match(lauta, /tahdistaSiirtymanJalkeen = \(\) => \{/);
  assert.match(lauta, /siirtymaAjastin = setTimeout\(tahdistaPisteidenKoko, PISTEIDEN_SIIRTYMA_MS \+ 50\);/);
  assert.match(lauta, /clearTimeout\(siirtymaAjastin\);/);
});
