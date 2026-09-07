/*
 * IHMISEN MATKA — TUTKIMUSVAIHE (js/linssit/ihmisen-matka-tutkimus.js,
 * js/linssit/ihmisen-matka-data.js IHMISEN_MATKA_LISANOSTOT).
 *
 * Mitä tässä vartioidaan (omistaja 7.9.2026 ilta, Raamattu "IHMISEN
 * MATKA: KAARI HYVAKSYTTY, TUTKIMUSVAIHE, VIISI NAPPIA"):
 *
 *   1. Nostoja on paljon ja jokaisella on teksti, ajoitus, paikka,
 *      lähde ja valmiit kysymykset pululle.
 *   2. Viidellä vanalla on summaava teksti (napin lappu).
 *   3. Rajaus kestää antimeridiaanin — Tyynenmeren nappi ei saa
 *      kääntää palloa Afrikkaan.
 *   4. Pulun repliikkiä ei toisteta: se on kertomuksen kaanonia.
 *
 * Selaimen puoli (hehku, napit, kortti, kysymys chattiin) on
 * savukkeessa tools/savukkeet/savuke-ihmisen-tutkimus.mjs.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  IHMISEN_MATKA, IHMISEN_MATKA_LISANOSTOT, IHMISEN_MATKA_KYSYMYKSET,
} from '../js/linssit/ihmisen-matka-data.js';
import { IHMISEN_MATKA_VIRRAT } from '../js/linssit/ihmisen-matka-virrat.js';
import { PYSAKIT } from '../js/linssit/ihmisen-matka.js';
import {
  kokoaNostot, nostonVirta, nostonKonteksti, vananRajaus, rajauksenLeveys, heksaRgb, kierraLon,
} from '../js/linssit/ihmisen-matka-tutkimus.js';

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');
const CSS = lue('../css/ihmisen-tutkimus.css');
const MODUULI = lue('../js/linssit/ihmisen-matka-tutkimus.js');
const VIRTATUNNUKSET = new Set(IHMISEN_MATKA_VIRRAT.map((v) => v.tunnus));

/* ==================== aineisto ==================== */

test('lisänostoja on kymmenkunta ja jokainen on kokonainen', () => {
  assert.ok(IHMISEN_MATKA_LISANOSTOT.length >= 10,
    `lisänostoja vain ${IHMISEN_MATKA_LISANOSTOT.length} — omistaja pyysi 10–20`);
  assert.ok(IHMISEN_MATKA_LISANOSTOT.length <= 25, 'lisänostoja epäilyttävän monta');
  for (const n of IHMISEN_MATKA_LISANOSTOT) {
    assert.ok(n.tunnus && /^[a-z0-9-]+$/.test(n.tunnus), `tunnus puuttuu tai on outo: ${n.tunnus}`);
    assert.ok(n.otsikko?.length > 4, `otsikko puuttuu: ${n.tunnus}`);
    assert.ok(n.ajoitus?.length > 2, `ajoitus puuttuu: ${n.tunnus}`);
    assert.ok(Number.isFinite(n.vuosiaSitten) && n.vuosiaSitten > 0, `vuosiaSitten puuttuu: ${n.tunnus}`);
    assert.ok(Number.isFinite(n.lat) && Math.abs(n.lat) <= 90, `lat pielessä: ${n.tunnus}`);
    assert.ok(Number.isFinite(n.lon) && Math.abs(n.lon) <= 180, `lon pielessä: ${n.tunnus}`);
    // Kaksi–kolme lausetta: alaraja pitää tekstin oikeana tekstinä,
    // yläraja pitää sen kortilla eikä artikkelina.
    assert.ok(n.teksti.length >= 140 && n.teksti.length <= 700,
      `${n.tunnus}: tekstin pituus ${n.teksti.length}`);
    assert.match(n.lahde, /^en-Wikipedia "/, `${n.tunnus}: lähde ei ole en-Wikipedia`);
    assert.ok(VIRTATUNNUKSET.has(n.virta), `${n.tunnus}: tuntematon virta ${n.virta}`);
    assert.ok(n.kysymykset.length >= 2 && n.kysymykset.length <= 3,
      `${n.tunnus}: kysymyksiä ${n.kysymykset.length}`);
    for (const k of n.kysymykset) assert.match(k, /\?$/, `${n.tunnus}: kysymys ilman kysymysmerkkiä`);
  }
});

test('lisänostot eivät ole kaaren pysäkkejä eivätkä toistu', () => {
  const pysakit = new Set(IHMISEN_MATKA.map((t) => t.tunnus));
  const nahdyt = new Set();
  for (const n of IHMISEN_MATKA_LISANOSTOT) {
    assert.ok(!pysakit.has(n.tunnus), `${n.tunnus} on jo kaaren pysäkki`);
    assert.ok(!nahdyt.has(n.tunnus), `${n.tunnus} kahdesti`);
    nahdyt.add(n.tunnus);
  }
});

test('jokaisella kaaren löytöpaikalla on 2–3 valmista kysymystä', () => {
  for (const t of IHMISEN_MATKA) {
    assert.ok(Array.isArray(t.kysymykset), `${t.tunnus}: kysymykset puuttuvat`);
    assert.ok(t.kysymykset.length >= 2 && t.kysymykset.length <= 3,
      `${t.tunnus}: kysymyksiä ${t.kysymykset.length}`);
  }
  // Taulussa ei saa olla avaimia, joita mikään pysäkki ei lue.
  const tunnukset = new Set(IHMISEN_MATKA.map((t) => t.tunnus));
  for (const avain of Object.keys(IHMISEN_MATKA_KYSYMYKSET)) {
    assert.ok(tunnukset.has(avain), `kysymystaulussa tuntematon pysäkki ${avain}`);
  }
});

test('viidellä vanalla on summaava teksti napin lappua varten', () => {
  assert.equal(IHMISEN_MATKA_VIRRAT.length, 5, 'nappeja on viisi, joten virtoja on viisi');
  for (const v of IHMISEN_MATKA_VIRRAT) {
    assert.ok(v.nimi?.length > 2, `${v.tunnus}: nimi puuttuu`);
    assert.ok(v.vari?.rintama, `${v.tunnus}: väri puuttuu`);
    assert.ok(v.yhteenveto?.length >= 150 && v.yhteenveto.length <= 500,
      `${v.tunnus}: yhteenvedon pituus ${v.yhteenveto?.length}`);
    const lauseita = v.yhteenveto.split(/[.!?]\s/).length;
    assert.ok(lauseita >= 2 && lauseita <= 5, `${v.tunnus}: lauseita ${lauseita} (2–4 pyydettiin)`);
  }
});

/* ==================== kokoaminen ==================== */

test('kartalle tulee vähintään kolmekymmentä nostoa', () => {
  const nostot = kokoaNostot(PYSAKIT, IHMISEN_MATKA_LISANOSTOT);
  assert.ok(nostot.length >= 30, `nostoja vain ${nostot.length}`);
  assert.equal(nostot.length, PYSAKIT.length + IHMISEN_MATKA_LISANOSTOT.length);
  // Myös esityksestä pois jääneet löytöpaikat ovat mukana.
  for (const tunnus of ['lake-mungo', 'tianyuan', 'niah']) {
    assert.ok(nostot.some((n) => n.tunnus === tunnus), `${tunnus} puuttuu tutkimusvaiheesta`);
  }
  for (const n of nostot) {
    assert.ok(Number.isFinite(n.lat) && Number.isFinite(n.lon), `${n.tunnus}: koordinaatti puuttuu`);
    assert.ok(n.teksti.length > 60, `${n.tunnus}: kortin teksti liian lyhyt`);
    assert.ok(n.kysymykset.length >= 2, `${n.tunnus}: kysymyksiä liian vähän`);
  }
  // Löytöpaikan kortti saa löytökuvan ja esineen (kuvat ovat ämpärissä).
  const jebel = nostot.find((n) => n.tunnus === 'jebel-irhoud');
  assert.ok(jebel.kuva?.includes('jebel-irhoud'), 'havainnekuva puuttuu kortilta');
  assert.ok(jebel.esine?.includes('jebel-irhoud'), 'esinekuva puuttuu kortilta');
  // Lisänostoille ei ole kuvia (kuvatilaukset erikseen) — eikä saa olla
  // rikkinäisiä osoitteita.
  for (const n of nostot.filter((x) => x.laji === 'lisanosto')) {
    assert.equal(n.kuva, null);
    assert.equal(n.esine, null);
  }
});

test('kysymyksen konteksti kantaa noston tekstin ja lähteen', () => {
  const nostot = kokoaNostot(PYSAKIT, IHMISEN_MATKA_LISANOSTOT);
  const toba = nostot.find((n) => n.tunnus === 'toba');
  const konteksti = nostonKonteksti(toba);
  assert.match(konteksti.nimi, /Tulivuori/);
  assert.match(konteksti.teksti, /Sumatran Toba/);
  assert.match(konteksti.teksti, /Lähde: en-Wikipedia "Toba eruption"/);
});

/* ==================== rajaus ja sävyt ==================== */

test('vanan rajaus kestää antimeridiaanin', () => {
  // Tyynenmeren kaari: Taiwan 121 I → Rapa Nui 109 L. Suora min/max
  // antaisi keskipisteeksi Afrikan ja 230 asteen laatikon.
  const rajaus = vananRajaus([[23.5, 121], [-17.8, 178], [-21.2, -175], [-27.1, -109.3]]);
  assert.ok(rajaus.lon > 120 || rajaus.lon < -160,
    `keskipiste karkasi Tyyneltämereltä: ${rajaus.lon}`);
  assert.ok(rajaus.leveysAst < 140, `laatikko liian leveä: ${rajaus.leveysAst}`);

  // Tavallinen kaari kulkee kuten ennenkin.
  const eurooppa = vananRajaus([[42.9, 25.4], [48.9, 2.3], [38.7, -9.1]]);
  assert.ok(Math.abs(eurooppa.lon - 8.15) < 0.5, `Euroopan keskipiste ${eurooppa.lon}`);
  assert.equal(vananRajaus([]), null);
});

test('rajauksen leveys pysyy laudan rajoissa', () => {
  const koko = rajauksenLeveys({ lat: 0, lon: 0, leveysAst: 300, korkeusAst: 120 }, 1.5);
  assert.equal(koko, 12000, 'koko maailman rajaus ei saa ylittää lautaa');
  const pieni = rajauksenLeveys({ lat: 0, lon: 0, leveysAst: 1, korkeusAst: 1 }, 1.5);
  assert.ok(pieni >= 900, `kapein rajaus ${pieni}`);
  // Korkea ja kapea vana (Siperia–Beringia) rajataan korkeuden mukaan.
  const korkea = rajauksenLeveys({ lat: 60, lon: 100, leveysAst: 10, korkeusAst: 40 }, 2);
  assert.ok(korkea > 10 * (12000 / 360), 'korkeusehto ei vaikuttanut');
  assert.equal(rajauksenLeveys(null), null);
});

test('noston sävy tulee datasta tai lähimmästä vanasta', () => {
  const vanat = [
    { tunnus: 'selkaranka', virta: 'amerikat', virrat: ['paavirta', 'siperia'], pisteet: [[5, 36, 200000], [51, 84, 48000]] },
    { tunnus: 'tyynimeri-1', virta: 'tyynimeri', virrat: null, pisteet: [[-21, -175, 2850]] },
  ];
  assert.equal(nostonVirta({ virta: 'eurooppa', lat: 0, lon: 0 }, vanat), 'eurooppa');
  assert.equal(nostonVirta({ lat: 6, lon: 37 }, vanat), 'paavirta');
  assert.equal(nostonVirta({ lat: 50, lon: 85 }, vanat), 'siperia');
  assert.equal(nostonVirta({ lat: -20, lon: -174 }, vanat), 'tyynimeri');
  assert.equal(nostonVirta({ lat: 0, lon: 0 }, []), null);
});

test('heksaväri kääntyy css-muuttujaksi', () => {
  assert.equal(heksaRgb('#FFB347'), '255, 179, 71');
  assert.equal(heksaRgb('9BE8E0'), '155, 232, 224');
  assert.equal(heksaRgb(null), '212, 175, 90');
  assert.equal(heksaRgb('punainen'), '212, 175, 90');
  assert.equal(kierraLon(200), -160);
  assert.equal(kierraLon(-190), 170);
});

/* ==================== pinta ==================== */

test('tyylit kattavat hehkun, napit, lapun ja kortin', () => {
  for (const luokka of [
    '.ihmisen-tutkimus', '.ihmisen-vananapit', '.ihmisen-vananappi',
    '.ihmisen-vanalappu', '.ihmisen-nosto', '.ihmisen-nostokortti',
    '.ihmisen-nostokysymys',
  ]) {
    assert.ok(CSS.includes(luokka), `css:stä puuttuu ${luokka}`);
  }
  // Kerros ei saa napata napautuksia kartalta.
  assert.match(CSS, /\.ihmisen-tutkimus\s*\{[^}]*pointer-events:\s*none/,
    'tutkimuskerros nappaisi kartan napautukset');
  // Puhelimella napit yhdelle riville lyhennettyinä.
  assert.match(CSS, /@media \(max-width: 700px\)/);
  assert.match(CSS, /\.ihmisen-vananappi-nimi \{ display: none; \}/);
  // Syke seisoo, jos liikettä on vähennetty.
  assert.match(CSS, /prefers-reduced-motion/);
});

test('pulun repliikkiä ei toisteta tutkimusvaiheessa', () => {
  // "Kartta on sinun…" on kertomuksen kaanonia (jakson loppu pulu-kenttä),
  // ja sen soittaa kertomusmoottori. Kupla kahdesti olisi virhe.
  const repliikki = 'Kysy vain, jos löydät jotain kiinnostavaa';
  const koodi = MODUULI.split('*/').slice(1).join('*/');
  assert.ok(!koodi.includes(repliikki), 'tutkimusvaihe toistaisi pulun repliikin');
  assert.ok(!MODUULI.includes('polloLinssikupla'), 'tutkimusvaihe ei saa avata omaa kuplaa');
});

test('tutkimusvaihe kytketään aikajanan avaukseen ja sulkuun', () => {
  const aikajana = lue('../js/aikajana.js');
  assert.match(aikajana, /ui\.aloitaTutkimusvaihe = \(\) =>/,
    'ui.aloitaTutkimusvaihe puuttuu (kertomusmoottori kutsuu sitä)');
  // Purku on ajon pura()-metodissa: "Sulje", Esc ja linssinappi
  // kulkevat js/ui.js:n pysaytaAikajanan kautta, joka kutsuu pura():a
  // suoraan — moduulin omaan pysaytaAikajanaan jätetty koukku ei
  // laukeaisi pelissä kertaakaan (sama oppi kuin kuplajonolla).
  assert.match(aikajana, /pura\(\) \{\n    this\.pysayta\(\);[\s\S]{0,700}this\.ui\.tutkimusvaihe\?\.pura\?\.\(\);/,
    'tutkimusvaihe ei purkaudu linssin sulkeutuessa');
  // Chatin portti aukeaa tutkimusvaiheessa (kysymysnapit).
  const apurit = lue('../js/ui-apurit.js');
  assert.match(apurit, /aikajana-tutkimus-auki/);
  // Merkit ovat oma laudan osansa, jottei aikajanan purku vie niitä.
  assert.match(MODUULI, /TUTKIMUKSEN_OSA = 'ihmisen-tutkimus'/);
});
