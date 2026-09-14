/*
 * PELAAJAN MAAN RAJA VAHVEMMALLA (omistaja 11.9.2026, sanatarkasti:
 * *"Peli voisi piirtää vahvemmalla aina kyseisen valtion rajat jossa
 * pelaaja on"*).
 *
 * Testit vartioivat NELJÄÄ ehtoa, joiden varassa korostus toimii:
 *
 *   1. AINEISTON MUOTO JA AVAIMET. Korostus lukee saman tiedoston kuin
 *      tasokartan vahvistettu ääriviiva (assets/data/maapolygonit.json,
 *      ISO A3 -avaimet) — uutta aineistoa ei tehty, koska sama Natural
 *      Earthin 10m -lähde on jo repossa (js/maanaariviivat.js).
 *   2. VALINTA SEURAA PELAAJAA. Sama maa ei tee työtä, uusi maa latoo
 *      viivan, ja maa voi myös poistua (lento, lähtövalinta).
 *   3. TYYLIN VAHVUUS. Korostus on selvästi tavallista rajaa vahvempi
 *      joka etäisyydellä, mutta samaa 1873-atlaksen mustetta — ei
 *      neonväriä eikä toista kerrosta.
 *   4. PUUTTUVA MAA ON TURVALLINEN. Maa, jota aineistossa ei ole, ei
 *      kaada mitään eikä jätä tyhjää viivaa.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  lataaMaapolygonit, maanRenkaatAsteina, nollaaPallonMaakorostus,
  paivitaPallonMaakorostus, puraMaanRenkaat, rengasAsteiksi,
} from '../js/maanaariviivat.js';
import {
  KOROSTUS_MUSTE, KOROSTUS_PEITTO, RAJA_MUSTE, RAJA_PEITTO, RANTA_PEITTO,
  korostuksenMuste,
  VEKTORIT_KOROSTUS_LEVEYS_CSS, VEKTORIT_KOROSTUS_RENDER_ORDER, VEKTORIT_LEVEYDET,
  VEKTORIT_LEVEYS_CSS, VEKTORIT_RAJA_LEVEYS_CSS, VEKTORIT_RENDER_ORDER,
  viivanLeveysCss,
} from '../js/pallovektorit.js';
import { PALLO_LAUTA } from '../js/pallo.js';
import { laudaltaAsteiksi } from '../js/fokusmitat.js';

const JUURI = new URL('..', import.meta.url).pathname;
const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const data = JSON.parse(readFileSync(`${JUURI}assets/data/maapolygonit.json`, 'utf8'));

/** Sama käännös kuin pallolaudalla (js/pallolauta/lauta.js pallonAsteet). */
const asteet = ({ x, y }) => laudaltaAsteiksi(PALLO_LAUTA, x, y);

/* ---------------------------------------------- 1. aineisto ja avaimet */

test('aineisto on ISO A3 -avaimellinen ja purkautuu renkaiksi', () => {
  assert.ok(data.tarkkuus > 0, 'tarkkuus puuttuu — purku jakaa sillä');
  assert.match(data.lahde, /Natural Earth/i);
  const avaimet = Object.keys(data.maat);
  assert.ok(avaimet.length > 100, `maita vain ${avaimet.length}`);
  for (const iso of avaimet) assert.match(iso, /^[A-Z]{3}$/, `${iso} ei ole ISO A3`);
  // Pelin peruskolmikko: lähtömaa, ensimmäinen kohde ja iso naapuri.
  for (const iso of ['GBR', 'GRC', 'FRA']) {
    assert.ok(data.maat[iso]?.length, `${iso} puuttuu aineistosta`);
  }
});

test('renkaat purkautuvat laudan yksiköihin ja asteiksi', () => {
  const laudalla = puraMaanRenkaat(data, 'GRC');
  assert.ok(laudalla.length > 0, 'Kreikalta ei tullut yhtään rengasta');
  for (const r of laudalla) {
    assert.ok(r.length >= 3, 'rengas on liian lyhyt');
    for (const [x, y] of r) {
      assert.ok(Number.isFinite(x) && Number.isFinite(y), 'piste ei ole luku');
    }
  }
  const asteina = maanRenkaatAsteina(data, 'GRC', asteet);
  assert.equal(asteina.length, laudalla.length, 'renkaita katosi käännöksessä');
  for (const r of asteina) {
    assert.deepEqual(r[0], r[r.length - 1], 'rengas ei ole suljettu');
    for (const [lon, lat] of r) {
      assert.ok(lon >= -540 && lon <= 540, `pituusaste karkasi: ${lon}`);
      assert.ok(lat >= -90 && lat <= 90, `leveysaste karkasi: ${lat}`);
    }
  }
  // Kreikka on siellä missä pitääkin (19–29 °E, 34–42 °N).
  const kaikki = asteina.flat();
  const lon = kaikki.map(([a]) => a);
  const lat = kaikki.map(([, b]) => b);
  assert.ok(Math.min(...lon) > 18 && Math.max(...lon) < 30, 'Kreikka ei ole Egeanmerellä');
  assert.ok(Math.min(...lat) > 33 && Math.max(...lat) < 42.5);
});

test('sauman yli kulkeva rengas pysyy ehjänä (ei vyötä maailman ympäri)', () => {
  // Keinotekoinen rengas päivämäärärajan yli: laudan reuna ja alku.
  const leveys = data.lauta.leveys;
  const rengas = [
    [leveys - 20, 1000], [leveys - 5, 1000], [5, 1010], [20, 1010], [leveys - 20, 1000],
  ];
  const asteina = rengasAsteiksi(rengas, asteet);
  assert.ok(asteina, 'rengas hävisi');
  for (let i = 1; i < asteina.length; i += 1) {
    assert.ok(Math.abs(asteina[i][0] - asteina[i - 1][0]) < 180,
      'renkaan sivu ylitti 180 astetta — viiva kiertäisi maailman ympäri');
  }
});

/* --------------------------------------- 2. valinta seuraa pelaajaa */

/** Kerroksen kaksoisolento: kirjaa mitä `korostaMaa` sai. */
function tekoVektorit() {
  const kutsut = [];
  return {
    kutsut,
    korostaMaa(iso, renkaat) { kutsut.push({ iso, renkaat }); return true; },
  };
}

test('korostus vaihtuu pelaajan maan mukana eikä tee työtä samalla maalla', async () => {
  nollaaPallonMaakorostus();
  const vektorit = tekoVektorit();
  const lataa = () => Promise.resolve(data);
  assert.equal(paivitaPallonMaakorostus({
    vektorit, iso: 'GRC', asteet, lataa,
  }), true);
  await new Promise((ok) => { setTimeout(ok, 0); });
  assert.equal(vektorit.kutsut.length, 1);
  assert.equal(vektorit.kutsut[0].iso, 'GRC');
  assert.ok(vektorit.kutsut[0].renkaat.length > 0, 'Kreikka jäi ilman renkaita');
  // Sama maa uudestaan: ei kutsua, ei työtä.
  assert.equal(paivitaPallonMaakorostus({
    vektorit, iso: 'GRC', asteet, lataa,
  }), false);
  await new Promise((ok) => { setTimeout(ok, 0); });
  assert.equal(vektorit.kutsut.length, 1, 'sama maa latoi viivan uudestaan');
  // Uusi maa: uusi viiva.
  paivitaPallonMaakorostus({
    vektorit, iso: 'ITA', asteet, lataa,
  });
  await new Promise((ok) => { setTimeout(ok, 0); });
  assert.equal(vektorit.kutsut.at(-1).iso, 'ITA');
  assert.ok(vektorit.kutsut.at(-1).renkaat.length > 0);
  // Maa poistui (avauslento, lähtövalinta): kerros tyhjenee heti.
  paivitaPallonMaakorostus({
    vektorit, iso: null, asteet, lataa,
  });
  assert.equal(vektorit.kutsut.at(-1).iso, null);
  assert.equal(vektorit.kutsut.at(-1).renkaat, null);
  nollaaPallonMaakorostus();
});

test('pallolauta kysyy korostuksen pelaajan maasta joka päivityksessä', () => {
  const lauta = lue('../js/pallolauta/lauta.js');
  assert.match(lauta, /paivitaPallonMaakorostus\(\{/, 'kytkentä puuttuu laudalta');
  // Maa luetaan YHTEEN muuttujaan ja siitä sekä kehälle, väritasolle
  // että uloszoomauksen rajalle (erät 1b ja 2): kolme päättelyä
  // samasta maasta ehtisi olla eri mieltä.
  assert.match(lauta, /const korostusIso = lento \? null : kohteidenNykyinenIso\(ui\);/,
    'maa ei tule laudan omasta kaupunki–maa-taulusta');
  assert.match(lauta, /iso: korostusIso,/, 'kehä ei lue samaa maata');
  assert.match(lauta, /asetaVaritasonMaa\(korostusIso\)/, 'väritaso ei lue samaa maata');
  assert.match(lauta, /nollaaPallonMaakorostus\(\);/, 'purku ei nollaa korostusta');
});

/* ------------------------------------------- 3. tyylin vahvuus */

test('korostus on selvästi tavallista rajaa vahvempi', () => {
  assert.equal(VEKTORIT_LEVEYDET.korostus, VEKTORIT_KOROSTUS_LEVEYS_CSS);
  assert.equal(VEKTORIT_LEVEYDET.rajat, VEKTORIT_RAJA_LEVEYS_CSS);
  assert.equal(VEKTORIT_LEVEYDET.rannikko, VEKTORIT_LEVEYS_CSS);
  // Leveys joka etäisyydellä: yleiskuvasta lähikuvaan.
  for (const tiheys of [0, 25, 60, 150, 250, 600]) {
    const korostus = viivanLeveysCss(tiheys, VEKTORIT_KOROSTUS_LEVEYS_CSS);
    const raja = viivanLeveysCss(tiheys, VEKTORIT_RAJA_LEVEYS_CSS);
    const ranta = viivanLeveysCss(tiheys, VEKTORIT_LEVEYS_CSS);
    assert.ok(korostus >= raja * 2, `tiheys ${tiheys}: korostus ${korostus} vs raja ${raja}`);
    assert.ok(korostus > ranta * 1.5, `tiheys ${tiheys}: korostus ei erotu rantaviivasta`);
  }
  // Muste: korostus on peittävämpi kuin tavallinen raja.
  assert.ok(KOROSTUS_PEITTO > RAJA_PEITTO * 1.5, 'korostus ei ole rajaa peittävämpi');
  assert.ok(KOROSTUS_PEITTO > RANTA_PEITTO, 'korostus ei erotu rantaviivasta');
  /*
   * PEITTO ON TÄYSI (karttauudistuksen PÄÄTÖKSET 1, 13.9.2026). Tässä
   * oli aiemmin ehto `< 1` perusteella *"täysi peitto olisi tussi,
   * eikä kaiverrus"*; se kirjoitettiin seepiakartalle, jossa kehä
   * erottui ruskeasta ruskeana. Kohdemaan sisus on nyt VÄRILLINEN, ja
   * himmeä punainen luki värikartalla ruskeana — sama perustelu kuin
   * tasokartalla (css/styles.css .maatummennus-viiva).
   */
  assert.equal(KOROSTUS_PEITTO, 1, 'kohdemaan kehä piirretään täydellä peitolla');
});

/*
 * KOHDEMAAN KEHÄ ON MUSTEEN SININEN, EI PUNAINEN EIKÄ RUSKEA
 * (omistaja 14.9.2026, karttauudistuksen PÄÄTÖKSET 14 kohta 2:
 * *"vaihda samalla kartan reuna musteen siniseksi"*).
 *
 * Ehto ei ole lieventynyt vaan VAIHTUNUT kolmannen kerran: ruskea →
 * paletin punainen (13.9.) → murrettu punainen (14.9. aamu) →
 * musteen sininen. Joka kerta sävy on sidottu YHTEEN paletin arvoon,
 * ei mihin tahansa sen sukuiseen väriin.
 */
test('kohdemaan kehä on paletin --raja-muste eikä oma heksaluku', () => {
  const osat = (v) => [1, 3, 5].map((i) => parseInt(v.slice(i, i + 2), 16));
  const [r, g, b] = osat(KOROSTUS_MUSTE);
  const [rr, rg, rb] = osat(RAJA_MUSTE);
  // Tavallinen raja on yhä ruskeaa mustetta: korostus on poikkeus.
  assert.ok(rr > rg && rg > rb, 'maiden raja ei ole ruskea');
  // Sininen: sinikanava selvästi suurin eikä sävy ole lämpimällä puolella.
  assert.ok(b > r * 2 && b > g, `${KOROSTUS_MUSTE} ei ole sininen`);
  // ARVO ON SAMA KUIN PALETISSA. Kaksi heksalukua eriytyisi
  // ensimmäisessä sävynmuutoksessa (suunnitelman riski 4.3).
  const css = lue('../css/styles.css');
  const kehanVari = css.match(/--raja-muste:\s*(#[0-9a-fA-F]{6})/)?.[1] ?? null;
  assert.equal(KOROSTUS_MUSTE.toLowerCase(), kehanVari?.toLowerCase(),
    'pallon korostus ja paletin --raja-muste ovat eri väri');
  /*
   * TUMMA JA MURRETTU, EI KIRKAS (omistajan sanat: *"vanhan kartan
   * musteen suuntaan"*). Kirkas taivaansini olisi sama muoto mutta
   * väärä kartta, joten kylläisyydelle ja vaaleudelle on katto.
   */
  const hsl = (v) => {
    const [r2, g2, b2] = osat(v).map((x) => x / 255);
    const mx = Math.max(r2, g2, b2); const mn = Math.min(r2, g2, b2);
    const l = (mx + mn) / 2;
    return { s: mx === mn ? 0 : (mx - mn) / (1 - Math.abs(2 * l - 1)), l };
  };
  assert.ok(hsl(KOROSTUS_MUSTE).l < 0.35, 'kehä ei ole tumma');
  assert.ok(hsl(KOROSTUS_MUSTE).s < 0.7, 'kehä on kirkas, ei murrettu muste');
  /*
   * KONTRASTI ON MITATTU, EI ARVATTU (omistaja: *"kontrasti
   * seepiapaperiin ja värilliseen maahan ≥ 4,5 mitattuna"*).
   */
  const lin = (c) => (c / 255 <= 0.03928 ? c / 255 / 12.92 : (((c / 255) + 0.055) / 1.055) ** 2.4);
  const lum = ([r2, g2, b2]) => 0.2126 * lin(r2) + 0.7152 * lin(g2) + 0.0722 * lin(b2);
  const kontrasti = (a, bb) => {
    const l1 = lum(a); const l2 = lum(bb);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };
  const paperi = css.match(/--paper:\s*(#[0-9a-fA-F]{6})/)?.[1] ?? null;
  assert.ok(kontrasti(osat(KOROSTUS_MUSTE), osat(paperi)) >= 4.5,
    'kontrasti seepiapaperiin alle 4,5');
  // Värillinen maa: kohdemaan vaalein maastosävy (fokuskartan kerma).
  assert.ok(kontrasti(osat(KOROSTUS_MUSTE), [230, 219, 172]) >= 4.5,
    'kontrasti värilliseen maahan alle 4,5');
  // `--mark` jää kartan muille merkinnöille eikä ole sama väri.
  const mark = css.match(/--mark:\s*(#[0-9a-fA-F]{6})/)?.[1] ?? null;
  assert.notEqual(KOROSTUS_MUSTE.toLowerCase(), mark?.toLowerCase(),
    'kehä ja kartan merkinnät ovat sama väri');
  // Tasokartan kehä lukee saman muuttujan eikä kovakoodattua arvoa.
  assert.match(css, /\.maatummennus-viiva \{[^}]*stroke: var\(--raja-muste\)/);
});

test('pallon korostus lukee sävyn --raja-muste-muuttujasta ajossa', () => {
  // Ilman dokumenttia (testit, niputus ennen CSS:ää) vara on vakio.
  assert.equal(korostuksenMuste(null), KOROSTUS_MUSTE);
  // Dokumentin kanssa arvo tulee muuttujasta: tässä tynkä, joka
  // vastaa CSS-muuttujaan toisella sävyllä.
  const vanhaDoc = globalThis.document;
  const vanhaTyyli = globalThis.getComputedStyle;
  globalThis.document = { documentElement: {} };
  globalThis.getComputedStyle = () => ({ getPropertyValue: () => ' #123456 ' });
  try {
    assert.equal(korostuksenMuste(), '#123456');
  } finally {
    globalThis.document = vanhaDoc;
    globalThis.getComputedStyle = vanhaTyyli;
  }
  // Materiaali rakennetaan funktiosta eikä vakiosta.
  assert.match(lue('../js/pallovektorit.js'), /color: korostuksenMuste\(\), opacity: KOROSTUS_PEITTO/);
});

test('korostus piirtyy tavallisen rajan jälkeen mutta samassa kerroksessa', () => {
  // Suurempi renderOrder = piirtyy myöhemmin eli päälle; ero pidetään
  // pienenä, jottei korostus nouse reittien tai kalvojen tasolle (0 ja 1).
  assert.ok(VEKTORIT_KOROSTUS_RENDER_ORDER > VEKTORIT_RENDER_ORDER);
  assert.ok(VEKTORIT_KOROSTUS_RENDER_ORDER < 0);
  const lahde = lue('../js/pallovektorit.js');
  // Sama pinta, sama syvyyssiirto, sama harvennus kuin muilla vektoreilla.
  assert.match(lahde, /const olio = new luokat\.LineSegments2\(geometria, materiaalit\.korostus\)/);
  assert.match(lahde, /harvennaViivat\(renkaat, harvennus\)/);
  assert.match(lahde, /vektorijanat\(viivat, sade\(\)\)/);
  // Korostus on jaetussa materiaalitaulussa eikä oma kerroksensa.
  assert.match(lahde, /return \{ rannikko: ranta, rajat: raja, korostus: korostusMateriaali \};/);
});

/* ------------------------------------------ 4. puuttuva maa */

test('tuntematon maa ei kaada mitään eikä jätä tyhjää viivaa', async () => {
  nollaaPallonMaakorostus();
  assert.deepEqual(puraMaanRenkaat(data, 'XXX'), []);
  assert.deepEqual(puraMaanRenkaat(null, 'GRC'), []);
  assert.deepEqual(maanRenkaatAsteina(data, 'XXX', asteet), []);
  assert.deepEqual(maanRenkaatAsteina(data, 'GRC', null), []);
  const vektorit = tekoVektorit();
  paivitaPallonMaakorostus({
    vektorit, iso: 'XXX', asteet, lataa: () => Promise.resolve(data),
  });
  await new Promise((ok) => { setTimeout(ok, 0); });
  assert.equal(vektorit.kutsut.at(-1).iso, 'XXX');
  assert.deepEqual(vektorit.kutsut.at(-1).renkaat, [], 'tyhjä lista pyyhkii korostuksen');
  nollaaPallonMaakorostus();
});

test('aineistoton peli toimii kuten ennen', async () => {
  nollaaPallonMaakorostus();
  const vektorit = tekoVektorit();
  // Yhden tiedoston versio ja verkoton käynnistys: haku palauttaa null.
  paivitaPallonMaakorostus({
    vektorit, iso: 'GRC', asteet, lataa: () => Promise.resolve(null),
  });
  await new Promise((ok) => { setTimeout(ok, 0); });
  assert.deepEqual(vektorit.kutsut.at(-1).renkaat, []);
  // Kaatunut haku ei saa heittää kutsujalle asti.
  nollaaPallonMaakorostus();
  paivitaPallonMaakorostus({
    vektorit, iso: 'ITA', asteet, lataa: () => Promise.reject(new Error('verkko')),
  });
  await new Promise((ok) => { setTimeout(ok, 0); });
  // Ilman kerrosta (?vektorit=0) kutsu on hiljainen ei-mitään.
  assert.equal(paivitaPallonMaakorostus({
    vektorit: null, iso: 'GRC', asteet, lataa: () => Promise.resolve(data),
  }), false);
  nollaaPallonMaakorostus();
});

test('kerros ja hakija ovat yhdessä paikassa (ei kahta aineistoa)', () => {
  assert.equal(typeof lataaMaapolygonit, 'function');
  const tummennus = lue('../js/maatummennus.js');
  // Tasokartta lukee saman jaetun lupauksen.
  assert.match(tummennus, /import \{ lataaMaapolygonit \} from '\.\/maanaariviivat\.js';/);
  // Eikä repoon ole ilmestynyt toista maiden ääriviivasettiä.
  const aariviivat = lue('../js/maanaariviivat.js');
  assert.match(aariviivat, /assets\/data\/maapolygonit\.json/);
});

test('tasokartta korostaa pelaajan maan myös ilman maan ikkunaa', () => {
  const tummennus = lue('../js/maatummennus.js');
  assert.match(tummennus, /ui\.fokuskarttaAvain \|\| kohteidenNykyinenIso\(ui\)/,
    'ikkunaton maa jäisi ilman korostusta');
  assert.match(tummennus, /if \(ui\.aloituslentoKesken\) return null;/,
    'avauslennon niukkuus rikkoutuisi');
});
