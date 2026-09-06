import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  SIVUNKAANTO_AVAIN, SIVUNKAANTO_KIRJASTO, SIVUNKAANTO_KYNNYS, SIVUNKAANTO_VERSIO,
  asetaSivunkaanto, kaannaSivu, aloitaSivunVeto, lataaSivunkaanto,
  sivunkaantoMahdollinen, sivunkaantoPaalla, sivunkaantoValmis, sivunkaantoDistVersio,
  SIVUNKAANTO_VARJO,
} from '../js/sivunkaanto.js';

/*
 * SIVUNKÄÄNTÖ (omistaja 5.9.2026 sanatarkasti "Tee 2. Ensin"; Raamattu
 * VALMIIT KIRJASTOT: STPAGEFLIP ENSIN). Säännöt, joita nämä testit
 * vartioivat: 1) kirjasto ämpärin vendor/-polusta, ei CDN:stä
 * tuotantokoodissa; 2) laiska lataus ja virhehaara — puuttuva kirjasto
 * palauttaa vanhan pinon; 3) lisenssi lähdesivulla; 4) reduced motion
 * sammuttaa; 6) yhden tiedoston versio jää ilman kirjastoa. Lisäksi
 * lukijan koukku: kääntö piirtää sivun samalla funktiolla kuin ennen.
 */

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

/** localStorage-tynkä Nodeen: testi asettaa ja lukee lippua kuten selain. */
function muistiTynka() {
  const m = new Map();
  return {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k),
  };
}

test('kirjasto tulee pelin ämpäristä vendor/-polusta, ei reposta eikä CDN:stä', () => {
  assert.match(SIVUNKAANTO_KIRJASTO, /^https:\/\/(?:media\.matkakirja\.app|pub-[a-z0-9]+\.r2\.dev)\/vendor\/page-flip-\d+\.\d+\.\d+\.browser\.js$/);
  assert.equal(SIVUNKAANTO_VERSIO, '2.0.7');
  assert.ok(SIVUNKAANTO_KIRJASTO.includes(`page-flip-${SIVUNKAANTO_VERSIO}`));
  // Tuotantokoodissa ei ole CDN-osoitetta (sääntö 1) — vain savuke
  // saa proksata, ja sekin ämpäriä.
  for (const polku of ['../js/sivunkaanto.js', '../js/lehti.js', '../sw.js']) {
    const lahde = lue(polku);
    assert.ok(!/jsdelivr|cdnjs|unpkg/.test(lahde), `${polku}: CDN-osoite tuotantokoodissa`);
  }
  // Kirjastoa ei ole repossa.
  assert.throws(() => readFileSync(new URL('../vendor/page-flip-2.0.7.browser.js', import.meta.url)));
});

test('lippu: oletus päällä, "0" palauttaa vanhan pinon', () => {
  const alkuperainen = globalThis.localStorage;
  globalThis.localStorage = muistiTynka();
  try {
    assert.equal(sivunkaantoPaalla(), true, 'puuttuva avain = päällä');
    asetaSivunkaanto(false);
    assert.equal(globalThis.localStorage.getItem(SIVUNKAANTO_AVAIN), '0');
    assert.equal(sivunkaantoPaalla(), false);
    asetaSivunkaanto(true);
    assert.equal(globalThis.localStorage.getItem(SIVUNKAANTO_AVAIN), null, 'päällä = avain poistuu');
    assert.equal(sivunkaantoPaalla(), true);
  } finally {
    if (alkuperainen === undefined) delete globalThis.localStorage;
    else globalThis.localStorage = alkuperainen;
  }
  // Avain on pelin oma nimiavaruus kuten muut kytkimet.
  assert.match(SIVUNKAANTO_AVAIN, /^matkakirja-/);
});

test('yhden tiedoston versio ja reduced motion sammuttavat käännön', () => {
  const manifestilla = { querySelector: (v) => (v === 'link[rel="manifest"]' ? {} : null) };
  const ilman = { querySelector: () => null };
  assert.equal(sivunkaantoDistVersio(ilman), true, 'ei manifestia = dist');
  assert.equal(sivunkaantoDistVersio(manifestilla), false);
  assert.equal(sivunkaantoDistVersio(undefined), true, 'ilman dokumenttia ei kääntöä');
  const liikkuva = { matchMedia: () => ({ matches: false }) };
  const rauhallinen = { matchMedia: () => ({ matches: true }) };
  assert.equal(sivunkaantoMahdollinen({ doc: manifestilla, win: liikkuva, paalla: true }), true);
  assert.equal(sivunkaantoMahdollinen({ doc: manifestilla, win: rauhallinen, paalla: true }), false, 'reduced motion');
  assert.equal(sivunkaantoMahdollinen({ doc: ilman, win: liikkuva, paalla: true }), false, 'dist');
  assert.equal(sivunkaantoMahdollinen({ doc: manifestilla, win: liikkuva, paalla: false }), false, 'lippu pois');
  // Yhden tiedoston kokoaja niputtaa teatterin (lehti tuo sen) muttei kirjastoa.
  const modules = lue('../tools/build-standalone.mjs');
  assert.ok(modules.indexOf("'js/sivunkaanto.js'") < modules.indexOf("'js/lehti.js'"),
    'sivunkaanto.js on MODULES-listalla ennen lehti.js:ää');
  assert.ok(!/page-flip-\d|\.browser\.js/.test(modules), 'kirjasto ei kuulu niputukseen');
});

test('laiska lataus: virhehaara palauttaa null eikä jää muistiin, onnistunut lataus antaa luokan', async () => {
  const skriptit = [];
  const doc = {
    createElement: () => {
      const s = { kuuntelijat: {}, addEventListener(n, f) { this.kuuntelijat[n] = f; }, remove() { this.poistettu = true; } };
      skriptit.push(s);
      return s;
    },
    head: { appendChild: () => {} },
  };
  assert.equal(sivunkaantoValmis({}), null);
  // Ilman dokumenttia (Node) lataus ei kaadu vaan antaa null.
  assert.equal(await lataaSivunkaanto(null), null);
  const eka = lataaSivunkaanto(doc);
  const toka = lataaSivunkaanto(doc);
  assert.equal(eka, toka, 'sama lupaus kesken latauksen (memoisoitu)');
  assert.equal(skriptit.length, 1);
  assert.equal(skriptit[0].src, SIVUNKAANTO_KIRJASTO);
  assert.equal(skriptit[0].async, true);
  skriptit[0].kuuntelijat.error();
  assert.equal(await eka, null, 'virhehaara → null (vanha pino jää käyttöön)');
  assert.equal(skriptit[0].poistettu, true, 'epäonnistunut skripti siivotaan');
  // Uusi yritys seuraavalla avauksella: lupaus ei jäänyt muistiin.
  const kolmas = lataaSivunkaanto(doc);
  assert.notEqual(kolmas, eka);
  assert.equal(skriptit.length, 2);
  // Onnistunut lataus: globaali St.PageFlip ilmestyy ennen load-tapahtumaa.
  const PageFlip = class {};
  globalThis.St = { PageFlip };
  try {
    skriptit[1].kuuntelijat.load();
    assert.equal(await kolmas, PageFlip);
    assert.equal(sivunkaantoValmis(), PageFlip);
    assert.equal(await lataaSivunkaanto(doc), PageFlip, 'valmis kirjasto ei lataa uudelleen');
    assert.equal(skriptit.length, 2);
  } finally {
    delete globalThis.St;
  }
});

test('ilman kirjastoa kääntö ja veto kieltäytyvät — kutsuja käyttää vanhaa pinoa', () => {
  assert.equal(sivunkaantoValmis(), null);
  let piirretty = 0;
  const kortti = { offsetWidth: 390, offsetHeight: 800, scrollTop: 0, cloneNode: () => ({}) };
  const dialogi = { ownerDocument: null, appendChild() {}, addEventListener() {} };
  assert.equal(kaannaSivu({ dialogi, kortti, suunta: 1, piirra: () => { piirretty += 1; }, peru: () => {} }), false);
  assert.equal(aloitaSivunVeto({ dialogi, kortti, suunta: -1, piirra: () => { piirretty += 1; }, peru: () => {}, clientX: 0, clientY: 0 }), null);
  assert.equal(piirretty, 0, 'kieltäytyvä teatteri ei piirrä mitään — lehti piirtää itse');
  assert.ok(SIVUNKAANTO_KYNNYS > 0.2 && SIVUNKAANTO_KYNNYS < 0.6, 'irrotuksen kynnys on osa sivun leveydestä');
});

test('lehti: kääre valitsee teatterin, sivun piirto ja lukijan koukku ovat ennallaan', () => {
  const lehti = lue('../js/lehti.js');
  // naytaTutkiSivu on kääre: teatteri saa käännön vain kun suunta on annettu
  // eikä heti; piirto tapahtuu aina piirraTutkiSivussa.
  assert.match(lehti, /export function naytaTutkiSivu\(ui, indeksi, \{ heti = false, suunta = 0 \} = \{\}\) \{[\s\S]*?if \(!heti && suunta\) \{[\s\S]*?kaannaSivu\(\{[\s\S]*?piirra: \(\) => piirraTutkiSivu\(ui, kohde, \{ heti: true \}\)/);
  assert.match(lehti, /piirraTutkiSivu\(ui, indeksi, \{ heti, suunta \}\);\n\}/, 'ilman teatteria piirretään kuten ennen (liuku)');
  // Lukijan koukku (kaiutin otsikkoriviin, jatkuva luenta) asuu piirrossa —
  // sama polku kääntyi sivu teatterissa tai ei.
  const piirto = lehti.slice(lehti.indexOf('export function piirraTutkiSivu('), lehti.indexOf('export function esilataaViereisetSivut('));
  assert.match(piirto, /pysaytaLukija\(\);/);
  assert.match(piirto, /varustaLukija\(ui, ui\.arrivalDialog,[\s\S]*?jatko: \(\) => jatkaLehdenLuentaa\(ui\)/);
  assert.match(piirto, /sijoitaLehtiKaiutin\(ui, kaiutin\);/);
  assert.match(piirto, /esilataaViereisetSivut\(ui, i\);/);
  // Suunta luetaan sivunumeroista: sisällysvalikon +1 taaksepäin on käännös taaksepäin.
  assert.match(lehti, /suunta: Math\.sign\(kohde - nykyinen\) \|\| suunta/);
  // Peruuntunut kääntö piirtää lähtösivun takaisin vierityskohtineen.
  assert.match(lehti, /peru: \(\) => \{\n\s+piirraTutkiSivu\(ui, nykyinen, \{ heti: true \}\);\n\s+kortti\.scrollTop = vieritys;/);
  // Sormiveto: vanha 60 px:n pyyhkäisy jää varapoluksi.
  assert.match(lehti, /const veto = aloitaSivunVeto\(\{/);
  assert.match(lehti, /if \(Math\.abs\(dx\) < 60 \|\| Math\.abs\(dx\) < Math\.abs\(dy\) \* 2\) return;/);
  // Lataus käynnistyy lehden avautuessa, mutta vain kun kääntö on mahdollinen.
  assert.match(lehti, /if \(sivunkaantoMahdollinen\(\)\) void lataaSivunkaanto\(\);/);
});

test('teatteri ei koske lukijaan, eleeseen eikä kirjaston omiin kuuntelijoihin', () => {
  const lahde = lue('../js/sivunkaanto.js');
  assert.match(lahde, /useMouseEvents: false/, 'ele on pelin oma');
  assert.match(lahde, /disableFlipByClick: true/);
  assert.match(lahde, /showCover: false/, 'pehmeä paperi, ei kovakantinen');
  assert.match(lahde, /usePortrait: true/);
  assert.ok(!/from '\.\/lukija\.js'|from '\.\/lehti\.js'/.test(lahde), 'teatteri ei tuo lehteä eikä lukijaa (ei sykliä)');
  // Teatteri on kortin JÄLKEEN dialogissa: kloonien id:t eivät voita oikeaa korttia.
  assert.match(lahde, /dialogi\.appendChild\(this\.juuri\)/);
  assert.match(lahde, /this\.juuri\.inert = true/);
  // Lepotilan portti: rAF-silmukan piirto vain käännön aikana.
  assert.match(lahde, /render\.render = \(aika\) => \{ if \(this\.kaanto\) piirra\.call\(render, aika\); \}/);
});

test('lähdesivu ja README mainitsevat kirjaston lisensseineen (pilari 5)', async () => {
  const { LAHTEET } = await import('../js/lahteet.js');
  const ryhma = LAHTEET.find((r) => r.otsikko === 'Ohjelmakirjastot');
  assert.ok(ryhma, 'Ohjelmakirjastot-ryhmä puuttuu js/lahteet.js:stä');
  const stpageflip = ryhma.rivit.find((r) => /StPageFlip 2\.0\.7/.test(r.nimi));
  const globe = ryhma.rivit.find((r) => /Globe\.gl 2\.46\.2/.test(r.nimi));
  assert.ok(stpageflip && stpageflip.lisenssi === 'MIT' && /Nodlik/.test(stpageflip.tekija));
  assert.ok(globe && globe.lisenssi === 'MIT' && /vasturiano/.test(globe.tekija));
  const readme = lue('../README.md');
  assert.match(readme, /StPageFlip 2\.0\.7/);
  assert.match(readme, /Globe\.gl 2\.46\.2/);
  // Ämpärin tiedostonimi seuraa versiovakiota, ja SHELL kantaa teatterin.
  assert.match(lue('../sw.js'), /'\.\/js\/sivunkaanto\.js'/);
});

test('sivu kääntyy tasaisena arkkina, ei nurkasta (omistaja 5.9.2026)', () => {
  const lahde = readFileSync(new URL('../js/sivunkaanto.js', import.meta.url), 'utf8');
  // Sormen korkeutta ei syötetä kirjastolle: taite on aina alareunassa → pystysuora.
  assert.match(lahde, /taiteenY\(\) \{\n\s+return this\.koko\.h - 2;/);
  const veto = lahde.slice(lahde.indexOf('  tartu(clientX, clientY) {'), lahde.indexOf('  /** rAF-ajuri'));
  assert.doesNotMatch(veto, /y: p\.y/, 'sormen pystypaikka ei saa ohjata taitetta');
  assert.match(veto, /this\.kaanto\.kulma = 'ala';/);
});

test('taitteen varjo on hento, ei kiiltävä (omistaja 5.9.2026: "Saako tästä vähemmän kiiltävän?")', () => {
  assert.ok(SIVUNKAANTO_VARJO > 0 && SIVUNKAANTO_VARJO <= 0.25, String(SIVUNKAANTO_VARJO));
  const lahde = readFileSync(new URL('../js/sivunkaanto.js', import.meta.url), 'utf8');
  assert.match(lahde, /maxShadowOpacity: SIVUNKAANTO_VARJO/);
});
