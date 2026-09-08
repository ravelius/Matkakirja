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
 * ja "IHMISEN MATKA: YKSI PALKKI, EI KARUSELLIA, KAIKKIIN NOSTOIHIN
 * KUVA, LINSSI MUISTAA PAIKKANSA" (7.9.2026 klo 17.40):
 *
 *   5. Yksi nostomalli: löytöpaikalla ja lisänostolla sama kortti, ja
 *      jokaisella nostolla vähintään yksi kuva (tai sen varapaikka).
 *   6. Yksi palkki: Matkakirjan yläpalkki piiloon, palkissa nimi,
 *      kello, viisi virtaa ja ✕; karusellia ei ole.
 *   7. Muisti: sulun yli tallennettu tila tarkistetaan puhtaasti.
 *
 * Selaimen puoli (hehku, napit, kortti, kysymys chattiin, palkki,
 * muisti) on savukkeessa tools/savukkeet/savuke-ihmisen-tutkimus.mjs.
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
import { lyhytAjoitus, nostokuvanOsoite, NOSTOKUVAN_JUURI } from '../js/linssit/ihmisen-matka-kortti.js';
import {
  kelvollinenMuisti, muistinAvain, MUISTIN_VERSIO, MUISTIN_IKA_MAX_MS,
} from '../js/linssit/ihmisen-matka-muisti.js';

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');
const CSS = lue('../css/ihmisen-tutkimus.css');
const AIKAJANA_CSS = lue('../css/aikajana.css');
const MODUULI = lue('../js/linssit/ihmisen-matka-tutkimus.js');
const KORTTI = lue('../js/linssit/ihmisen-matka-kortti.js');
/** Lähdekoodi ilman kommentteja (proosa ei laukaise sanavartioita). */
const koodi = (teksti) => teksti.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
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
  // Löytöpaikalla on Tiedeliitteen juttu ("Lue lisää") ja sivun indeksi.
  assert.equal(jebel.juttu, true);
  assert.equal(PYSAKIT[jebel.indeksi].tunnus, 'jebel-irhoud');
  /*
   * KAIKISSA NOSTOISSA VÄHINTÄÄN YKSI KUVA (omistaja 7.9.2026):
   * lisänoston kuvituskuva haetaan ämpäristä polusta
   * aikajana/ihmisen-matka/nosto/<tunnus>.jpg (kuvaputken erä tulossa;
   * kortti näyttää varapaikan, kunnes kuva on perillä). Esinettä ei ole.
   */
  assert.match(NOSTOKUVAN_JUURI, /\/aikajana\/ihmisen-matka\/nosto$/);
  for (const n of nostot.filter((x) => x.laji === 'lisanosto')) {
    assert.equal(n.kuva, nostokuvanOsoite(n.tunnus));
    assert.match(n.kuva, /^https:\/\/media\.matkakirja\.app\/aikajana\/ihmisen-matka\/nosto\/[a-z0-9-]+\.jpg$/);
    assert.equal(n.esine, null);
    assert.equal(n.juttu, false);
    // Aito kuva on valinnainen kenttä kummallakin lajilla — ei pakko.
    assert.ok(n.kuvaAito === null || typeof n.kuvaAito === 'string');
  }
});

test('lyhyt ajoitus sisällykseen ja varakuvaan', () => {
  assert.equal(lyhytAjoitus({ vuosiaSitten: 230000 }), '230\u00a0000\u00a0v.');
  assert.equal(lyhytAjoitus({ vuosiaSitten: 800 }), '800\u00a0v.');
  assert.equal(lyhytAjoitus({ ajoitus: 'jääkausien aikana' }), 'jääkausien aikana');
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
    '.ihmisen-nostokysymys', '.ihmisen-nostokortti-varakuva', '.ihmisen-nostokortti-lue',
    '.ihmisen-nostokortti-kuvakehys',
  ]) {
    assert.ok(CSS.includes(luokka), `css:stä puuttuu ${luokka}`);
  }
  // Kerros ei saa napata napautuksia kartalta.
  assert.match(CSS, /\.ihmisen-tutkimus\s*\{[^}]*pointer-events:\s*none/,
    'tutkimuskerros nappaisi kartan napautukset');
  // Puhelimella napit yhdelle riville lyhennettyinä (palkin alla).
  assert.match(CSS, /@media \(max-width: 600px\)/);
  assert.match(CSS, /\.aikajana\.kertomus\.tutkimusvaihe \.ihmisen-vananappi-lyhyt \{ display: inline; \}/);
  // Legenda esityksen aikana: himmeä, ei toimintoa.
  assert.match(CSS, /\.ihmisen-vananapit\.legenda \.ihmisen-vananappi/);
  // Varapaikka ei ole nimikirjainlaatta: vanan sävy ja ajoitus.
  assert.match(CSS, /\.ihmisen-nostokortti-varakuva-ajoitus/);
  assert.ok(!/monogrammi/.test(CSS) && !/nimikirjai/.test(koodi(KORTTI)),
    'varapaikka ei saa olla nimikirjainlaatta');
  // Syke seisoo, jos liikettä on vähennetty.
  assert.match(CSS, /prefers-reduced-motion/);
});

/* ==================== yksi palkki, ei karusellia ==================== */

test('kertomuskaari saa yhden palkin yläpalkin tilalle eikä karusellia', () => {
  const aikajana = lue('../js/aikajana.js');
  // Palkki rakennetaan vain kertomuskaarelle (keksinnöt ennallaan).
  assert.match(aikajana, /if \(this\.kaari\.kertomus\?\.length\) this\.rakennaPalkki\(ylarivi, ohjaimet\);/);
  const palkki = aikajana.match(/rakennaPalkki\(ylarivi, ohjaimet\) \{[\s\S]*?\n  \}/)[0];
  assert.match(palkki, /this\.juuri\.classList\.add\('kertomus'\);/);
  assert.match(palkki, /luoVirtanapit\(virrat, \{ legenda: true \}\)/);
  // ✕ siirtyy palkkiin, Aloita alusta sen viereen.
  assert.match(palkki, /ohjaimet\.append\(this\.alustaNappi, this\.suljeNappi\);/);
  // Yläpalkin korkeus mitataan ennen piilotusta ja annetaan muuttujana.
  assert.match(palkki, /document\.querySelector\('\.topbar'\)/);
  assert.match(palkki, /--aikajana-palkki-korkeus/);
  assert.match(palkki, /document\.body\.classList\.add\('aikajana-palkki-auki'\);/);
  // Purku palauttaa yläpalkin.
  assert.match(aikajana, /document\.body\.classList\.remove\('aikajana-palkki-auki'\);/);
  // CSS: yläpalkki piiloon, palkki yläpalkin korkuinen, karuselli pois.
  /*
   * EI display: none (mitattu 7.9.2026): sovellus on ruudukko
   * (css/styles.css .app grid-template-rows: auto minmax(0, 1fr)), ja
   * ruudukosta kadonnut yläpalkki pudotti kartta-alueen riville 1 ja
   * auto-korkeuteen — kartta kutistui neliöksi (834 × 814). Yläpalkki
   * jää ruudukkoon nollan korkuisena ja näkymättömänä.
   */
  assert.match(AIKAJANA_CSS, /body\.aikajana-palkki-auki \.topbar \{[\s\S]{0,200}visibility: hidden;[\s\S]{0,200}height: 0;/);
  assert.ok(!/body\.aikajana-palkki-auki \.topbar \{ display: none/.test(AIKAJANA_CSS),
    'display: none pudottaisi kartan ruudukosta');
  assert.match(AIKAJANA_CSS, /\.aikajana\.kertomus \.aikajana-ylarivi \{[\s\S]{0,400}height: var\(--aikajana-palkki-korkeus, 3\.4rem\);/);
  assert.match(AIKAJANA_CSS, /\.aikajana\.kertomus \.aikajana-nauha \{ display: none; \}/);
  assert.match(AIKAJANA_CSS, /\.aikajana\.kertomus \.aikajana-sulje \{\n\s*position: static;/);
  // Tutkimusvaihe ei enää käsittele nauhaa lainkaan.
  assert.ok(!/nauha/.test(koodi(MODUULI)), 'tutkimusvaihe viittaa yhä karuselliin');
  assert.ok(!/--tutkimus-nauha/.test(CSS), 'lapun korkeus laskettiin karusellista');
});

test('aikaselain vie alalaidan: kortti ja pergamenttilappu väistävät (7.9.2026)', () => {
  /*
   * Raamattu "LINSSIEN AIKASELAIN ALAREUNAAN": nauha on ruudun
   * alalaidassa koko linssin ajan, myös tutkimusvaiheessa. Kaikki
   * alalaitaan kelluva nousee sen yläpuolelle — sama kuvio kuin
   * aikoinaan karusellin kanssa, mutta yhden luvun
   * (--aikaselain-korkeus) varassa.
   */
  assert.match(AIKAJANA_CSS, /body\.aikaselain-auki \{ --aikaselain-korkeus: \d+px; \}/);
  assert.match(CSS, /body\.aikaselain-auki \.ihmisen-vanalappu \{\n\s*bottom: calc\(var\(--aikaselain-korkeus/,
    'pergamenttilappu jää nauhan alle');
  assert.match(CSS, /body\.aikaselain-auki \.ihmisen-nostokortti \{\n\s*max-height: calc\([\s\S]{0,160}--aikaselain-korkeus/,
    'noston kortti ulottuu nauhan alle');
  // Sääntö on body-luokan takana: ilman nauhaa mitat ovat entiset.
  assert.match(CSS, /\.ihmisen-vanalappu \{[\s\S]{0,200}bottom: 1rem;/,
    'lapun oma perusmitta on kadonnut');
  // Tutkimusvaiheen moduuli ei tunne nauhaa: kytkentä on moottorissa.
  assert.ok(!/aikaselain/.test(koodi(MODUULI)),
    'tutkimusvaihe kytkee nauhan itse — kytkentä kuuluu moottoriin (js/aikajana.js)');
});

/* ==================== muisti ==================== */

test('muisti tarkistetaan puhtaasti: vaihe, jakso, kamera, kortti ja virta', () => {
  assert.equal(muistinAvain('ihmisen-matka'), 'matkakirja-linssimuisti-ihmisen-matka');
  const nyt = 1_800_000_000_000;
  const ehdot = { jaksot: ['avaus', 'ranta'], nostot: ['toba', 'jebel-irhoud'], virrat: ['siperia'], nyt };
  const hyva = kelvollinenMuisti({
    versio: MUISTIN_VERSIO, vaihe: 'esitys', jakso: 'ranta', kulunut: 4200, pitoMin: 164000,
    kamera: { lat: -30, lng: 22, altitude: 0.8 }, kortti: 'toba', virta: 'siperia', aika: nyt - 1000,
  }, ehdot);
  assert.deepEqual(hyva, {
    versio: MUISTIN_VERSIO, vaihe: 'esitys', jakso: 'ranta', kulunut: 4200, pitoMin: 164000,
    kamera: { lat: -30, lng: 22, altitude: 0.8 }, kortti: 'toba', virta: 'siperia', aika: nyt - 1000,
  });
  // Tuntematon jakso ei kelpaa esitykseen; tutkimusvaihe kelpaa ilman jaksoa.
  assert.equal(kelvollinenMuisti({ versio: MUISTIN_VERSIO, vaihe: 'esitys', jakso: 'x', aika: nyt }, ehdot), null);
  const tutkimus = kelvollinenMuisti({
    versio: MUISTIN_VERSIO, vaihe: 'tutkimus', kortti: 'ei-ole', virta: 'siperia', aika: nyt,
  }, ehdot);
  assert.equal(tutkimus.vaihe, 'tutkimus');
  assert.equal(tutkimus.kortti, null, 'tuntematon kortti pudotetaan');
  assert.equal(tutkimus.virta, 'siperia');
  assert.equal(tutkimus.kamera, null);
  // Vanha versio, vanhentunut ja rikkinäinen ohitetaan.
  assert.equal(kelvollinenMuisti({ versio: MUISTIN_VERSIO + 1, vaihe: 'tutkimus', aika: nyt }, ehdot), null);
  assert.equal(kelvollinenMuisti({
    versio: MUISTIN_VERSIO, vaihe: 'tutkimus', aika: nyt - MUISTIN_IKA_MAX_MS - 1,
  }, ehdot), null);
  assert.equal(kelvollinenMuisti('roska', ehdot), null);
  assert.equal(kelvollinenMuisti(null, ehdot), null);
  // Moottori: tallennus purussa ennen kortin sulkua, jatko ilman avausta,
  // Aloita alusta tyhjentää.
  const aikajana = lue('../js/aikajana.js');
  assert.match(aikajana, /pura\(\) \{\n    this\.pysayta\(\);[\s\S]{0,400}this\.tallennaMuisti\(\);\n    this\.muistiLukittu = true;/);
  assert.match(aikajana, /const muisti = this\.esitys \? this\.lueLinssimuisti\(\) : null;\n\s*if \(muisti\) \{\n\s*this\.jatkaMuistista\(muisti\);\n\s*return true;\n\s*\}\n\s*this\.avaaAvausjakso\(\);/);
  assert.match(aikajana, /aloitaAlusta\(\) \{[\s\S]{0,300}tyhjennaMuisti\(this\.linssi\.tunnus\);/);
  // Musta alku ei ole muistettava paikka: ensimmäinen avaus on aina
  // avausjakso, vaikka pelaaja sulkisi linssin heti pimeässä.
  assert.match(aikajana, /tallennaMuisti\(\) \{[\s\S]{0,900}if \(e\.pimea\) return false;/);
  // Tutkimusvaihe palauttaa virran ilman kameran kääntöä ja kortin.
  assert.match(MODUULI, /valitseVana\(virta, \{ kamera: false \}\)/);
  assert.match(MODUULI, /if \(muisti\?\.kortti && kortti && kortti\.auki\(\) !== muisti\.kortti\) kortti\.avaa\(muisti\.kortti\);/);
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
  assert.match(aikajana, /pura\(\) \{\n    this\.pysayta\(\);[\s\S]{0,1400}this\.ui\.tutkimusvaihe\?\.pura\?\.\(\);/,
    'tutkimusvaihe ei purkaudu linssin sulkeutuessa');
  // Chatin portti aukeaa tutkimusvaiheessa (kysymysnapit).
  const apurit = lue('../js/ui-apurit.js');
  assert.match(apurit, /aikajana-tutkimus-auki/);
  // Nostokortti purkautuu samassa ja chatin portti tuntee sen.
  assert.match(aikajana, /this\.ui\.nostokortti\?\.pura\?\.\(\);/);
  assert.match(apurit, /aikajana-nostokortti-auki/);
  // Hehku ja lamppu avaavat saman kortin.
  assert.match(MODUULI, /napautus: \(\) => kortti\?\.avaa\(nosto\.tunnus\),/);
  // Tiedeliite avataan kortista moottorin kautta sisällys yhtenä listana.
  assert.match(KORTTI, /ajo\.avaaNostonJuttu\(nosto\.indeksi\)/);
  assert.match(aikajana, /avaaNostonJuttu\(i\) \{[\s\S]{0,600}sisallys: \{\n\s*lista: true,/);
  const tiedeliite = lue('../js/tiedeliite.js');
  assert.match(tiedeliite, /if \(sisallysAsetus\?\.lista\) sisallys\.classList\.add\('lista'\);/);
  /*
   * PALSTOITUS PURETAAN, EI RAJATA YHTEEN. Korkeudeltaan rajattu
   * palstalaatikko luo ylivuotopalstoja myös arvolla `column-count: 1`:
   * mitattu 7.9.2026, kaksikymmentä riviä katkesi yhdennentoista
   * kohdalta ja loput piirtyivät laatikon oikealle puolelle ruudun
   * ulkopuolelle. `columns: auto` tekee listasta tavallisen pystyvirran.
   */
  assert.match(AIKAJANA_CSS, /\.tiedeliite-sisallys\.lista \{ columns: auto;/);
  assert.ok(!/\.tiedeliite-sisallys\.lista \{ column-count: 1/.test(AIKAJANA_CSS),
    'column-count: 1 jättäisi ylivuotopalstat');
  // Merkit ovat oma laudan osansa, jottei aikajanan purku vie niitä.
  assert.match(MODUULI, /TUTKIMUKSEN_OSA = 'ihmisen-tutkimus'/);
});
