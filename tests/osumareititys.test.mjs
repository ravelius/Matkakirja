/*
 * OSUMAREITITYS: VIHJEPISTE EI OLE KAUPUNGIN MERKIN ALLA.
 *
 * Rootin havainto 13.9.2026: kaupungin vihjepiste (kohtaamispiste) jää
 * kaupungin merkin alle, ja keskustanapautus avaa kaupungin tietoruudun
 * vihjeen sijaan.
 *
 * TÄMÄ TESTI MITTAA RUUTUA, EI LAUTAA. Vanha sääntö (js/fokuspiste.js
 * fokuspisteenSiirto) on kynnysfunktio LAUDAN YKSIKÖISSÄ, ja juuri se
 * oli vika: pallolla kaupungin merkki ei ole laudan kohdassaan vaan
 * omassa pallopisteessään (js/pallo.js pallonOmatPisteet), ja laudan
 * yksikkö muuttuu asteiksi, joista vasta kamera tekee pikseleitä.
 * Testin mitta on siksi PIKSELI: paljonko merkkien välillä on ruudulla
 * eroa kahdella zoomitasolla.
 *
 * MITTAMALLI. Ruutuero lasketaan pelin omista funktioista:
 * korkeusLeveydesta + leveysKorkeudesta + asteetLeveydesta antavat
 * näkymän leveyden asteina, ja ruudun leveys jaettuna sillä antaa
 * px/aste. Lähellä ruudun keskipistettä (jossa kaupunki saapumisen
 * jälkeen on) tämä on pallon projektion tarkka mitta muutaman prosentin
 * tarkkuudella. Oikea selainmittaus tehdään savukkeella
 * (tools/savukkeet/savuke-osumareititys.mjs) — tämä testi vartioi
 * SÄÄNTÖÄ, savuke vartioi TOTEUTUSTA.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import { pallonOmatPisteet, laudanPisteenAvain, PALLO_LAUTA } from '../js/pallo.js';
import { laudaltaAsteiksi } from '../js/fokusmitat.js';
import {
  FOKUSPISTE_ERO_MIN_AST, FOKUSPISTE_MUSTE_R_PX, FOKUSPISTE_SIIRTO_AST,
  fokuspisteenAsteet, fokuspisteenSiirto,
} from '../js/fokuspiste.js';
import {
  PALLOLAUDAN_LAHIN_LEVEYS, PALLOLAUDAN_SAAPUMISLEVEYS,
  asteetLeveydesta, korkeusLeveydesta, leveysKorkeudesta,
} from '../js/pallolauta/kamera.js';
import {
  LAPUN_KOSKETUSVARA_PX, laatikonEtaisyys, musteenVoittaja,
} from '../js/pallolauta/lauta.js';

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');

/* ---------------- mittavälineet ---------------- */

/** Omistajan mittaruutu, sama profiili kuin savukkeilla. */
const RUUTU = { w: 390, h: 844 };

/** Ruudun pikseliä yhtä kaaren astetta kohti, kun näkymä on `leveysYks`. */
function pxPerAste(leveysYks) {
  const kuvasuhde = RUUTU.w / RUUTU.h;
  const korkeus = korkeusLeveydesta(leveysYks, { kuvasuhde });
  const nakyvaYks = leveysKorkeudesta(korkeus, { kuvasuhde });
  return RUUTU.w / asteetLeveydesta(nakyvaYks);
}

/** Kaksi zoomitasoa: saapumisnäkymä ja lähin sallittu nipistys. */
const ZOOMIT = [
  { nimi: 'saapuminen', yks: PALLOLAUDAN_SAAPUMISLEVEYS },
  { nimi: 'lähizoomi', yks: PALLOLAUDAN_LAHIN_LEVEYS },
];

/** Ruutuero asteina: pituusasteen osuus kutistuu kosinilla, kuten ruudulla. */
function ruutueroAsteina(a, b) {
  return Math.hypot(b.lat - a.lat, (b.lon - a.lon) * Math.cos((a.lat * Math.PI) / 180));
}

const { pisteet: omatPisteet } = pallonOmatPisteet(MAAILMANKARTTA);
const kaupunki = (id) => MAAILMANKARTTA.cities.find((c) => c.id === id);
const kohtaamispiste = (id) => FOKUSVIRRAT[id]?.kohtaamispiste?.laudat?.[PALLO_LAUTA];

/** Kaupungin PIIRRETTY pallopiste (sama, jonka merkki saa). */
function kaupunginAsteet(c) {
  return omatPisteet.get(laudanPisteenAvain(c.x, c.y)) ?? laudaltaAsteiksi(PALLO_LAUTA, c.x, c.y);
}

/** VANHA reitti: sivusiirto laudan yksiköissä, sitten asteiksi. */
function vanhaPisteenAsteet(c, p) {
  const s = fokuspisteenSiirto(c, p);
  return laudaltaAsteiksi(PALLO_LAUTA, p.x + s.x, p.y + s.y);
}

/** UUSI reitti: js/pallolauta/nostot.js kutsuu tismalleen tätä. */
function uusiPisteenAsteet(c, p) {
  return fokuspisteenAsteet(kaupunginAsteet(c), laudaltaAsteiksi(PALLO_LAUTA, p.x, p.y));
}

/*
 * MITATUT KAUPUNGIT. Budapest on rootin ilmoittama vika, Ateena, Sofia
 * ja Pariisi omistajan 6.9.2026 hienosäädön kohteet. Barcelona,
 * Marseille ja Helsinki löytyivät samalla mittauksella samasta viasta.
 */
const VIALLISET = ['budapest', 'barcelona', 'marseille', 'helsinki'];
const HIENOSAADETYT = ['ateena', 'sofia', 'pariisi'];

/*
 * VÄHIN RUUTUERO. Omistaja hyväksyi 6.9.2026 Ateenan eron (0,4125° eli
 * 22,4 px saapumisnäkymässä); uusi sääntö antaa sen jokaiselle
 * kaupungille. Vartija on hieman alle mitatun, jotta se kertoo
 * säännöstä eikä pyöristyksestä.
 */
const VAHIN_ERO_PX = { saapuminen: 20, 'lähizoomi': 80 };

/* ---------------- 1. juurisyy: vanha sääntö mittasi laudan yksikköjä ---- */

test('vanha sääntö jätti neljä pistettä kaupungin merkin alle (juurisyy)', () => {
  const px = pxPerAste(PALLOLAUDAN_SAAPUMISLEVEYS);
  for (const id of VIALLISET) {
    const c = kaupunki(id);
    const p = kohtaamispiste(id);
    assert.ok(c && p, `${id}: kaupunki ja kohtaamispiste löytyvät`);
    // Laudalla piste on kaukana kynnyksestä (14), joten siirtoa ei tullut…
    assert.deepEqual(fokuspisteenSiirto(c, p), { x: 0, y: 0 },
      `${id}: laudan kynnys ei antanut siirtoa`);
    // …mutta pallolla merkit olivat samassa pikselissä.
    const ero = ruutueroAsteina(kaupunginAsteet(c), vanhaPisteenAsteet(c, p)) * px;
    assert.ok(ero < 2, `${id}: vanha ruutuero ${ero.toFixed(2)} px oli alle 2 px`);
  }
});

/* ---------------- 2. korjaus: ruutuero riittää kahdella zoomilla ------- */

for (const { nimi, yks } of ZOOMIT) {
  test(`kohtaamispiste erottuu kaupungin merkistä ruudulla (${nimi})`, () => {
    const px = pxPerAste(yks);
    for (const id of [...VIALLISET, ...HIENOSAADETYT]) {
      const c = kaupunki(id);
      const p = kohtaamispiste(id);
      const ero = ruutueroAsteina(kaupunginAsteet(c), uusiPisteenAsteet(c, p)) * px;
      assert.ok(ero >= VAHIN_ERO_PX[nimi],
        `${id} (${nimi}): ruutuero ${ero.toFixed(1)} px < ${VAHIN_ERO_PX[nimi]} px`);
    }
  });
}

test('ruutuero on sama joka leveysasteella (kosini jakaa pituusasteen)', () => {
  const px = pxPerAste(PALLOLAUDAN_SAAPUMISLEVEYS);
  const erot = [...VIALLISET, ...HIENOSAADETYT].map((id) => {
    const c = kaupunki(id);
    return ruutueroAsteina(kaupunginAsteet(c), uusiPisteenAsteet(c, kohtaamispiste(id))) * px;
  });
  const hajonta = Math.max(...erot) - Math.min(...erot);
  assert.ok(hajonta < 0.5, `ruutuerojen hajonta ${hajonta.toFixed(2)} px (Helsinki 60° N … Ateena 38° N)`);
  /*
   * VANHA sääntö vaihteli leveysasteen mukaan: sama 14 yksikköä oli
   * Ateenassa 22,4 px ja Helsingissä 15,3 px. Sama vertailu kolmella
   * hienosäädetyllä kaupungilla näyttää sen.
   */
  const vanhat = HIENOSAADETYT.map((id) => {
    const c = kaupunki(id);
    return ruutueroAsteina(kaupunginAsteet(c), vanhaPisteenAsteet(c, kohtaamispiste(id))) * px;
  });
  assert.ok(Math.max(...vanhat) - Math.min(...vanhat) > 1.5, 'vanha sääntö vaihteli leveysasteen mukaan');
});

test('kauas sijoitettua pistettä ei siirretä (Oslo, Riika)', () => {
  for (const id of ['oslo', 'riika']) {
    const c = kaupunki(id);
    const p = kohtaamispiste(id);
    const puhdas = laudaltaAsteiksi(PALLO_LAUTA, p.x, p.y);
    assert.deepEqual(uusiPisteenAsteet(c, p), puhdas,
      `${id}: datan koordinaatit kelpaavat sellaisenaan`);
    assert.ok(ruutueroAsteina(kaupunginAsteet(c), puhdas) >= FOKUSPISTE_ERO_MIN_AST,
      `${id}: piste on kynnyksen ulkopuolella`);
  }
});

test('fokuspisteenAsteet: koilliseen, kosinilla, ilman dataa ei kaadu', () => {
  const kaupunkiAst = { lat: 38, lon: 23 };
  const siirretty = fokuspisteenAsteet(kaupunkiAst, { lat: 38.0001, lon: 23.0001 });
  assert.ok(siirretty.lat > kaupunkiAst.lat, 'pohjoiseen');
  assert.ok(siirretty.lon > kaupunkiAst.lon, 'itään');
  assert.equal(siirretty.lat, kaupunkiAst.lat + FOKUSPISTE_SIIRTO_AST.lat);
  // Pituusaste jaetaan kosinilla: pohjoisessa asteita tulee enemmän.
  const pohjoinen = fokuspisteenAsteet({ lat: 65, lon: 23 }, { lat: 65, lon: 23 });
  assert.ok(pohjoinen.lon - 23 > siirretty.lon - 23, 'kosini kasvattaa pituusastesiirtoa pohjoisessa');
  // Napa-alueella kosinilla on lattia: siirto ei karkaa rajatta.
  const napa = fokuspisteenAsteet({ lat: 89, lon: 0 }, { lat: 89, lon: 0 });
  assert.ok(napa.lon <= FOKUSPISTE_SIIRTO_AST.lon / 0.25 + 1e-9, 'kosinilattia pitää');
  // Puuttuva data ei kaada eikä keksi paikkaa.
  assert.equal(fokuspisteenAsteet(kaupunkiAst, null), null);
  assert.deepEqual(fokuspisteenAsteet(null, { lat: 1, lon: 2 }), { lat: 1, lon: 2 });
});

/* ---------------- 3. osumakilpailu: sormi pisteen päällä --------------- */

test('kohtaamispiste voittaa osumakilpailun, kun sormi on pisteen päällä', () => {
  const px = pxPerAste(PALLOLAUDAN_SAAPUMISLEVEYS);
  for (const id of [...VIALLISET, ...HIENOSAADETYT]) {
    const c = kaupunki(id);
    const kaupunkiAst = kaupunginAsteet(c);
    const pisteAst = uusiPisteenAsteet(c, kohtaamispiste(id));
    // Sormi pisteen päällä: etäisyys pisteeseen 0, kaupunkiin koko ruutuero.
    const kaupunkiinPx = ruutueroAsteina(pisteAst, kaupunkiAst) * px;
    assert.ok(kaupunkiinPx > 0, `${id}: kaupunki ei ole samassa pikselissä`);
    // lahin() valitsee pienimmän etäisyyden → piste (0 px) voittaa.
    assert.ok(0 < kaupunkiinPx, `${id}: piste on lähempänä kuin kaupunki`);
    // Ja sormi on pisteen oman musteen sisällä, joten etuoikeussääntökin pitää.
    assert.ok(FOKUSPISTE_MUSTE_R_PX > 0 && kaupunkiinPx > FOKUSPISTE_MUSTE_R_PX,
      `${id}: kaupunki on pisteen musteen (${FOKUSPISTE_MUSTE_R_PX} px) ulkopuolella`);
  }
});

test('lahinMerkki ratkaisee kohtaamispisteen ENNEN kaupunkipisteen omaa mustetta', () => {
  const lauta = lue('../js/pallolauta/lauta.js');
  assert.match(lauta, /import \{ FOKUSPISTE_MUSTE_R_PX \} from '\.\.\/fokuspiste\.js';/);
  const pisteSaanto = lauta.indexOf(
    ".find((e) => e.o?.perhe === 'piste' && edessa(e.lat, e.lng));",
  );
  const pisteOsuma = lauta.indexOf(
    'if (kohtaamispiste && lahella(lat, lng, kohtaamispiste, FOKUSPISTE_MUSTE_R_PX))',
  );
  const kaupunkiSaanto = lauta.indexOf(
    "const pisteenPx = voittaja?.laji === 'kaupunki' ? piirrettyHalkaisijaPx(voittaja.k) : 0;",
  );
  assert.ok(pisteSaanto > 0 && pisteOsuma > 0 && kaupunkiSaanto > 0, 'kaikki kolme sääntöä löytyvät');
  assert.ok(pisteSaanto < kaupunkiSaanto && pisteOsuma < kaupunkiSaanto,
    'kohtaamispisteen etuoikeus on ennen kaupunkipisteen omaa mustetta');
  /*
   * Turisti-infon oma sääntö säilyy — mutta se on 14.9.2026 alkaen
   * myönnytys vain KAUPUNGIN nimimusteen yli, ei noston oman musteen
   * yli (js/pallolauta/lauta.js lahinMerkki, "MUTTA VAIN KAUPUNGIN
   * NIMIMUSTEEN YLI"): saapumisnäkymässä info oli usein lähin merkki
   * 44 px:n sisällä ja vei napautuksen toisen noston nimiön päältä.
   */
  assert.match(lauta,
    /if \(voittaja\?\.laji === 'turistiinfo' && muste\?\.laji !== 'nosto'\) return voittaja;/);
  const infoSaanto = lauta.indexOf("voittaja?.laji === 'turistiinfo' && muste?.laji !== 'nosto'");
  assert.ok(infoSaanto > kaupunkiSaanto, 'turisti-infon sääntö on yhä kaupunkisäännön jäljessä');
  // Kaupungin oma myönnytys säilyy: sormi kaupunkipisteen halkaisijan sisällä.
  assert.match(lauta, /if \(voittaja\?\.laji === 'kaupunki' && lahella\(lat, lng, voittaja, pisteenPx \/ 2\)\)/);
});

/*
 * KYLTTI VOITTAA KOSKETUSVARAN, NOSTON OMA MUSTE VOITTAA KYLTIN
 * (omistaja 17.9.2026 klo 03.30 UTC, Raamattu KARTTAUUDISTUKSEN
 * PAATOKSET 31 TARKENNUS 2 kohta 4, kortti *"Kyltti voittaa
 * kosketusvaran"*).
 *
 * TÄMÄ TESTI LASKEE SÄÄNNÖN KAHDELLA MITALLA, ei lue vain lähdettä:
 * sama napautus ajetaan `musteenVoittaja`n läpi kosketusvaralla ja
 * ilman. Luvut ovat 16.9.2026 Pariisin lähizoomista mitatut — kyltin
 * piirretty ala 211,8…309,3 × 392,6…413,9 px ja Guimardin metron
 * merkki 16,4 px kyltin ankkurista.
 */
test('kyltin muste voittaa noston kosketusvaran, mutta ei noston omaa mustetta', () => {
  // Kyltin piirretty ala (js/pallolauta/merkit.js laatikot + turistiInfonPiirros).
  const kyltti = { x0: 211.8, y0: 392.6, x1: 309.3, y1: 413.9 };
  // Naapurinoston lappu: sormi EI ole sen musteella, mutta on 16 px:n varan sisällä.
  const naapuri = { r: { x0: 232, y0: 414, x1: 300, y1: 425 }, voittaja: { laji: 'nosto' } };
  // Sormi kyltin keskellä.
  const sormi = { x: (kyltti.x0 + kyltti.x1) / 2, y: (kyltti.y0 + kyltti.y1) / 2 };
  assert.equal(laatikonEtaisyys(sormi, kyltti), 0, 'sormi on kyltin omalla musteella');
  const varanSisalla = laatikonEtaisyys(sormi, naapuri.r);
  assert.ok(varanSisalla > 0 && varanSisalla <= LAPUN_KOSKETUSVARA_PX,
    `naapuri on pelkän varan päässä (${varanSisalla.toFixed(1)} px)`);
  // Vanha sääntö: kosketusvaralla naapurinosto vei napautuksen kyltiltä.
  assert.equal(musteenVoittaja(sormi, [naapuri])?.laji, 'nosto');
  // Uusi sääntö mittaa saman napautuksen ILMAN varaa: nosto ei voita enää.
  assert.equal(musteenVoittaja(sormi, [naapuri], 0), null);
  // Chambord säilyy: kun sormi on noston OMALLA musteella, nosto voittaa myös varatta.
  const musteella = { x: 266, y: 420 };
  assert.equal(laatikonEtaisyys(musteella, naapuri.r), 0);
  assert.equal(musteenVoittaja(musteella, [naapuri], 0)?.laji, 'nosto');
});

test('lahinMerkki kysyy kyltin mustetta ennen vanhaa turisti-info-sääntöä', () => {
  const lauta = lue('../js/pallolauta/lauta.js');
  // Kosketusvara on nyt musteeseenOsunut-funktion parametri (0 = pelkkä muste).
  assert.match(lauta,
    /const musteeseenOsunut = \(lat, lng, vara = LAPUN_KOSKETUSVARA_PX\) => \{/);
  assert.match(lauta, /return musteenVoittaja\(kohta, ehdokkaat, vara\);/);
  // Kyltin oma muste mitataan sen PIIRRETYSTÄ laatikosta ilman kosketusvaraa.
  assert.match(lauta,
    /if \(!kyltinLaatikot\(\)\.some\(\(r\) => laatikonEtaisyys\(kohta, r\) <= 0\)\) return null;/);
  const uusi = lauta.indexOf("const kyltti = kyltinMusteella(lat, lng);");
  const vanha = lauta.indexOf("voittaja?.laji === 'turistiinfo' && muste?.laji !== 'nosto'");
  assert.ok(uusi > 0 && vanha > uusi,
    'kyltin oman musteen sääntö ratkaistaan ennen vanhaa myönnytystä');
  // Vastakoe on koodissa, ei vain raportissa.
  assert.match(lauta, /if \(pallonSaantoKaytossa\('kylttiosuma'\)\) \{/);
  assert.match(lauta,
    /if \(kyltti && musteeseenOsunut\(lat, lng, 0\)\?\.laji !== 'nosto'\) return kyltti;/);
});

test('tasokartan oma sääntö säilyi ennallaan (laudan yksiköt)', () => {
  const c = { x: 6624, y: 1882 };
  assert.deepEqual(fokuspisteenSiirto(c, { x: c.x + 0.2, y: c.y - 0.1 }), { x: 14, y: -10 });
  assert.deepEqual(fokuspisteenSiirto(c, { x: c.x + 14, y: c.y }), { x: 0, y: 0 });
  const fokuspiste = lue('../js/fokuspiste.js');
  assert.match(fokuspiste, /const \{ x: sx, y: sy \} = fokuspisteenSiirto\(city, piste\);/);
});
