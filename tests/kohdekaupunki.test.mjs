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
 */

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const {
  KAUPUNKIPISTEEN_HALKAISIJA_PX, KOHDEKAUPUNGIN_NIMI_SUHDE,
  KOHDEKAUPUNGIN_PISTE_SUHDE, KOHDEKAUPUNGIN_TAYSI_OSUUS, kaupunkipisteenSade,
  kohdekaupunginMitat, poltetunMusteenSuurennus,
} = await import('../js/pallolauta/lauta.js');
const { KOHDEMERKIN_RUUTU_PX } = await import('../js/pallolauta/nostot.js');
const { LEHDEN_VAHIN_OSUUS } = await import('../js/fokuskohteet.js');
const { KARTTANIMI_KOOT, ladoRuutunimet } = await import('../js/karttanimet.js');
const { PALLON_SALLITTU_VENYTYS } = await import('../js/pallolauta/kamera.js');

/* ================================================================== *
 * 1. PISTEEN LATTIA: >= 1,5 x KOHDEMERKKI
 * ================================================================== */

test('lähikuvassa kaupunkipiste on vähintään 1,5 x kohdemerkki', () => {
  const { halkaisijaPx } = kohdekaupunginMitat({ osuus: 1, suurennus: 1 });
  assert.ok(KOHDEKAUPUNGIN_PISTE_SUHDE >= 1.5,
    `suhde ${KOHDEKAUPUNGIN_PISTE_SUHDE} < 1,5`);
  assert.ok(halkaisijaPx >= 1.5 * KOHDEMERKIN_RUUTU_PX,
    `piste ${halkaisijaPx.toFixed(2)} px < 1,5 x ${KOHDEMERKIN_RUUTU_PX.toFixed(2)} px`);
  // ...eikä koskaan kohdemerkkiä pienempi, missään portin asennossa.
  for (let osuus = LEHDEN_VAHIN_OSUUS; osuus <= 3; osuus += 0.05) {
    const m = kohdekaupunginMitat({ osuus, suurennus: 1 });
    assert.ok(m.halkaisijaPx >= KAUPUNKIPISTEEN_HALKAISIJA_PX);
    if (osuus >= KOHDEKAUPUNGIN_TAYSI_OSUUS) {
      assert.ok(m.halkaisijaPx >= KOHDEMERKIN_RUUTU_PX,
        `osuus ${osuus.toFixed(2)}: piste ${m.halkaisijaPx.toFixed(2)} < merkki`);
    }
  }
});

test('lattia kasvaa jatkuvasti eikä hyppää portilla', () => {
  let edellinen = kohdekaupunginMitat({ osuus: 0 }).halkaisijaPx;
  for (let osuus = 0; osuus <= 1.2; osuus += 0.01) {
    const nyt = kohdekaupunginMitat({ osuus }).halkaisijaPx;
    assert.ok(nyt >= edellinen - 1e-9, 'lattia ei saa pienetä lähennettäessä');
    assert.ok(nyt - edellinen < 1.5, `hyppy ${(nyt - edellinen).toFixed(2)} px osuudella ${osuus}`);
    edellinen = nyt;
  }
});

/* ================================================================== *
 * 2. KAUKONÄKYMÄ EI MUUTU
 * ================================================================== */

test('yleisnäkymässä piste ja nimi ovat entisellään', () => {
  for (const osuus of [0, 0.1, 0.3, LEHDEN_VAHIN_OSUUS - 0.01]) {
    const m = kohdekaupunginMitat({ osuus, suurennus: 1 });
    assert.equal(m.halkaisijaPx, KAUPUNKIPISTEEN_HALKAISIJA_PX,
      `osuus ${osuus}: piste ${m.halkaisijaPx}`);
    assert.equal(m.nimiKerroin, 1, `osuus ${osuus}: nimi ${m.nimiKerroin}`);
  }
  // Omistajan 7.9.2026 mitta on yhä se, joka yleisnäkymästä luetaan.
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

/* ================================================================== *
 * 4. KYTKENNÄT: LATTIA ON OIKEASSA POLUSSA
 * ================================================================== */

test('piste ja ladonta lukevat saman lattian', () => {
  const lauta = lue('../js/pallolauta/lauta.js');
  assert.match(lauta, /const kohdekaupunki = \(\) => \{/);
  assert.match(lauta, /halkaisijaPx: kohdekaupunki\(\)\.halkaisijaPx/);
  assert.match(lauta, /kokoKerroin: kaupunginMitat\.nimiKerroin/);
  assert.match(lauta, /pisteSade: kaupunginMitat\.halkaisijaPx \/ 2/);
  // Portti on sama luku kuin kohdemerkeillä itsellään.
  assert.match(lauta, /nostot\.lehdenOsuus\(nakyva\)/);
  const nostot = lue('../js/pallolauta/nostot.js');
  assert.match(nostot, /lehdenOsuus\(pohja, nakyva, pack\.id\) >= LEHDEN_VAHIN_OSUUS/);
  // Osuma-alue ei ole sidottu pisteen kokoon (sormen 44 px).
  assert.match(lauta, /NAPAUTUKSEN_SADE_PX = 44/);
});

test('pisteen säde noudattaa annettua ruutuhalkaisijaa', () => {
  const perus = kaupunkipisteenSade(0.08, 1210);
  const iso = kaupunkipisteenSade(0.08, 1210, { halkaisijaPx: 17.16 });
  assert.ok(Math.abs(iso / perus - 17.16 / KAUPUNKIPISTEEN_HALKAISIJA_PX) < 1e-6);
});
