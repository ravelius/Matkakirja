/*
 * TYÖHUONEEN VALIKKO KAHTEEN NAPPIIN (omistaja 11.9.2026).
 *
 * Sanatarkasti: *"saisiko kuvan otsikot yhdistettyä niin että
 * jäljelle jäisi vain raamattu sekä kehittäjä lehti, minkä alle
 * tulisi nuo kaikki muut jutut mitkä jäävät raamatun ulkopuolelle"*
 * ja samana päivänä *"samalla raamatun ja kehittäjälehden voisi
 * siirtää hammasratas valikon alle. näin hampurilainen pysyisi
 * muuttumattomana riippumatta siitä onko kehittäjä tila päällä vai
 * ei."*
 *
 * Kolme asiaa, jotka eivät näy diffistä:
 *
 *   1. HAMPURILAINEN ON SAMA KEHITTÄJÄTILASSA JA ILMAN. #kehittaja-
 *      kotelo on poissa index.html:stä kokonaan, eikä siellä ole enää
 *      yhtäkään poistettua nappi-id:tä.
 *   2. KAKSI NAPPIA RATTAASSA. #kehittaja-valikon sisällä ovat
 *      #raamattu-lehti-btn ja #kehittajalehti-btn, ja js/main.js
 *      kytkee molemmat omaan avaukseensa.
 *   3. SEITSEMÄN RIVIÄ AVAA OIKEAN LEHDEN. Kehittäjälehden rivit
 *      piirretään pienellä DOM-mallilla (sama tapa kuin
 *      tests/etsi-aarre-nappi.test.mjs) ja jokaista napautetaan:
 *      rivin on kutsuttava täsmälleen omaa avaustaan.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const lue = (polku) => readFileSync(new URL(`../${polku}`, import.meta.url), 'utf8');

/* ---------------------------------------------------------------- */
/* Pieni DOM-malli (vain se, mitä rivien piirto koskee)              */
/* ---------------------------------------------------------------- */

class Elementti {
  constructor(nimi) {
    this.nodeName = String(nimi).toUpperCase();
    this.childNodes = [];
    this.luokat = [];
    this.attrs = {};
    this.kuuntelijat = new Map();
    this.style = {};
    this.teksti = '';
  }

  get className() { return this.luokat.join(' '); }

  set className(arvo) { this.luokat = String(arvo).split(/\s+/).filter(Boolean); }

  get textContent() {
    return this.teksti + this.childNodes.map((n) => n.textContent).join('');
  }

  set textContent(arvo) {
    this.childNodes = [];
    this.teksti = arvo == null ? '' : String(arvo);
  }

  appendChild(solmu) { this.childNodes.push(solmu); return solmu; }

  setAttribute(nimi, arvo) { this.attrs[nimi] = String(arvo); }

  getAttribute(nimi) { return this.attrs[nimi] ?? null; }

  addEventListener(laji, kasittelija) {
    if (!this.kuuntelijat.has(laji)) this.kuuntelijat.set(laji, []);
    this.kuuntelijat.get(laji).push(kasittelija);
  }

  dispatch(laji) {
    [...(this.kuuntelijat.get(laji) ?? [])].forEach((k) => k({ type: laji, target: this }));
  }

  * jalkelaiset() {
    for (const lapsi of this.childNodes) {
      if (!(lapsi instanceof Elementti)) continue;
      yield lapsi;
      yield* lapsi.jalkelaiset();
    }
  }

  etsiLuokalla(luokka) {
    return [...this.jalkelaiset()].filter((el) => el.luokat.includes(luokka));
  }
}

globalThis.document = {
  createElement: (nimi) => new Elementti(nimi),
  createElementNS: (_ns, nimi) => new Elementti(nimi),
  getElementById: () => null,
  addEventListener() {},
};

const {
  KEHITTAJALEHDEN_RIVIT, kehittajalehdenSivut, piirraKehittajalehdenRivit,
} = await import('../js/tyohuone-kehittajalehti.js');

/* ---------------------------------------------------------------- */
/* 1. Hampurilainen on sama kehittäjätilassa ja ilman                */
/* ---------------------------------------------------------------- */

/** Poistetut napit: nämä id:t eivät saa palata mihinkään. */
const POISTETUT = [
  'tilanne-lehti-btn', 'poiminnat-lehti-btn', 'tilastot-lehti-btn',
  'grafiikka-lehti-btn', 'lukijoilta-lehti-btn', 'musiikki-lehti-btn',
  'puhe-saadin-btn',
];

test('hampurilaisvalikossa ei ole enää kehittäjän koteloa', () => {
  const html = lue('index.html');
  assert.ok(!html.includes('id="kehittaja-kotelo"'),
    '#kehittaja-kotelo pitää olla poistettu — hampurilainen on sama '
    + 'kehittäjätilassa ja ilman (omistaja 11.9.2026)');
  for (const id of POISTETUT) {
    assert.ok(!html.includes(`id="${id}"`), `poistettu nappi ${id} on yhä index.html:ssä`);
  }
  const main = lue('js/main.js');
  for (const id of POISTETUT) {
    assert.ok(!main.includes(`'${id}'`), `js/main.js kytkee yhä poistettua nappia ${id}`);
  }
});

/* ---------------------------------------------------------------- */
/* 2. Kaksi nappia hammasratasvalikossa                              */
/* ---------------------------------------------------------------- */

test('hammasratasvalikossa on Raamattu ja Kehittäjälehti', () => {
  const html = lue('index.html');
  const alku = html.indexOf('id="kehittaja-valikko"');
  const loppu = html.indexOf('id="paavalikko"');
  assert.ok(alku > 0 && loppu > alku, 'kehittäjävalikkoa ei löydy index.html:stä');
  const valikko = html.slice(alku, loppu);
  assert.ok(valikko.includes('id="raamattu-lehti-btn"'), 'Raamattu-nappi puuttuu rattaasta');
  assert.ok(valikko.includes('id="kehittajalehti-btn"'), 'Kehittäjälehti-nappi puuttuu rattaasta');
  assert.match(valikko, /<p class="valikko-otsikko">Työhuone<\/p>/);
  // Molemmat ovat samaa viivaikoninappityyliä kuin ennen.
  const napit = [...valikko.matchAll(/id="(raamattu-lehti-btn|kehittajalehti-btn)"[^>]*class="([^"]+)"/g)];
  assert.equal(napit.length, 2, 'nappien luokkia ei löytynyt');
  for (const [, id, luokat] of napit) {
    assert.ok(luokat.includes('tyohuone-nappi'), `${id}: työhuoneen nappityyli puuttuu`);
  }

  const main = lue('js/main.js');
  assert.match(main, /getElementById\('raamattu-lehti-btn'\)[\s\S]{0,200}avaaRaamattuLehti\(\)/);
  assert.match(main, /getElementById\('kehittajalehti-btn'\)[\s\S]{0,200}avaaKehittajalehti\(\)/);
});

/* ---------------------------------------------------------------- */
/* 3. Kehittäjälehden seitsemän riviä                                */
/* ---------------------------------------------------------------- */

test('Kehittäjälehdessä on seitsemän riviä oikeassa järjestyksessä', () => {
  assert.deepEqual(KEHITTAJALEHDEN_RIVIT.map((r) => r.nimi), [
    'Tilannelehti', 'Poiminnat', 'Tilastot', 'Grafiikka', 'Lukijoilta',
    'Musiikki', 'Lukijaääni',
  ]);
  for (const rivi of KEHITTAJALEHDEN_RIVIT) {
    assert.ok(rivi.ikoni?.length, `${rivi.nimi}: viivaikoni puuttuu`);
    assert.ok(rivi.kuvaus?.length, `${rivi.nimi}: selite puuttuu`);
  }
});

test('jokainen rivi kutsuu omaa avaustaan — eikä mitään muuta', () => {
  const kutsut = [];
  const avaa = Object.fromEntries(KEHITTAJALEHDEN_RIVIT
    .map((r) => [r.tunnus, () => kutsut.push(r.tunnus)]));
  const kohde = new Elementti('div');
  piirraKehittajalehdenRivit(kohde, avaa);
  const napit = kohde.etsiLuokalla('kehittajalehti-rivi');
  assert.equal(napit.length, 7, 'rivejä pitää olla seitsemän');
  napit.forEach((nappi, i) => {
    nappi.dispatch('click');
    assert.deepEqual(kutsut, KEHITTAJALEHDEN_RIVIT.slice(0, i + 1).map((r) => r.tunnus),
      `rivi ${i} avasi väärän lehden`);
  });
});

test('Lukijaäänen rivi voidaan piilottaa samalla ehdolla kuin entinen nappi', () => {
  const kohde = new Elementti('div');
  piirraKehittajalehdenRivit(kohde, {}, { piilota: ['lukijaaani'] });
  const nimet = kohde.etsiLuokalla('kehittajalehti-nimi').map((el) => el.textContent);
  assert.ok(!nimet.includes('Lukijaääni'), 'piilotettu rivi piirtyi silti');
  assert.equal(nimet.length, 6);

  // js/lehti.js piilottaa sen kehittäjätilan mukaan ja js/main.js
  // tarkistaa saman ehdon vielä dialogin avauksessa.
  const lehti = lue('js/lehti.js');
  assert.match(lehti, /kehittajaTilaPaalla\(\) \? \[\] : \['lukijaaani'\]/);
  const main = lue('js/main.js');
  assert.match(main, /avaaLukijaaani: \(\) => \{\s*\n\s*if \(!kehittajaTilaPaalla\(\)\) return;/);
});

test('Kehittäjälehti on yhden sivun lehti', () => {
  const sivut = kehittajalehdenSivut({});
  assert.equal(sivut.length, 1);
  assert.equal(sivut[0].nimi, 'Kehittäjälehti');
  assert.equal(typeof sivut[0].rakenna, 'function');
});

/* ---------------------------------------------------------------- */
/* 4. Moduuli on esiladattu ja niputettu                             */
/* ---------------------------------------------------------------- */

test('uudet työhuonemoduulit ovat sw.js:n SHELLissä ja niputuksessa', () => {
  const sw = lue('sw.js');
  const nippu = lue('tools/build-standalone.mjs');
  for (const moduuli of ['js/tyohuone-kehittajalehti.js', 'js/tyohuone-raamattu-muokkaus.js']) {
    assert.ok(sw.includes(`'./${moduuli}'`), `${moduuli} puuttuu sw.js:n SHELListä`);
    assert.ok(nippu.includes(`'${moduuli}'`), `${moduuli} puuttuu MODULES-listalta`);
  }
});
