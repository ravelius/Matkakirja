// Etusivun reittianimaatio.
//
// Omistaja ei nähnyt animaatiota millään laitteellaan (12.8.2026), vaikka
// jokainen Chromium-mittaus näytti sen toimivan. Omistajan selaimet ovat
// WebKit-pohjaisia, eikä tässä ympäristössä ole WebKit-selainta, joten
// korjaus nojaa tunnettuihin käyttäytymisiin. Nämä testit vartioivat juuri
// niitä oletuksia, joita ei pysty ajamalla toteamaan: ne katsovat
// lähdekoodia ja laskevat samat luvut kuin peli.

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { polunPituus, alkuKehykset, kierraKehykset } from '../js/ui.js';
import { jaaAlku } from '../js/aani-ehdokkaat.js';

const UI = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');
const CSS = readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');
const VIRTA = readFileSync(new URL('../js/ambience-stream.js', import.meta.url), 'utf8');
const EHDOKKAAT = readFileSync(new URL('../js/aani-ehdokkaat.js', import.meta.url), 'utf8');

/** css/styles.css:n säännöt luokalle, koko tiedostosta. */
function saannot(luokka) {
  const osat = [];
  const re = new RegExp(`[^{}]*\\.${luokka}[^{}]*\\{([^}]*)\\}`, 'g');
  for (const osuma of CSS.matchAll(re)) osat.push(osuma[1]);
  return osat.join(' ');
}

test('CSS ei aseta niitä ominaisuuksia, joita SMIL animoi', () => {
  /*
   * Tämä on koko korjauksen kompastuskivi: tyylitiedoston sääntö voittaa
   * SMIL-animaation arvon. Jos joku lisää tänne peittävyyden, säteen tai
   * katkoviivan, animaatio jää paikalleen eikä siitä tule virhettä —
   * ruudulle jää vain liikkumaton piste, aivan kuten omistajalle.
   */
  for (const luokka of ['alkureitti-jalki', 'alkureitti-piste', 'alkureitti-karki', 'alkureitti-keha']) {
    const teksti = saannot(luokka);
    for (const omin of ['opacity', 'r:', 'stroke-dashoffset', 'stroke-dasharray', 'animation']) {
      assert.ok(!teksti.includes(omin),
        `.${luokka} asettaa ominaisuuden ${omin} — se jyrää SMIL-animaation`);
    }
  }
});

test('kärki on ympyrä, jota animateMotion kuljettaa', () => {
  // CSS-animoitu katkoviivan pätkä oli se, jota omistaja ei nähnyt.
  assert.match(UI, /animateMotion/, 'kärjen liike ei ole SMILiä');
  assert.ok(!/@keyframes alkureitti/.test(CSS), 'CSS-avainkehykset ovat yhä tallella');
  assert.ok(!/alkureitti[^\n]*getTotalLength/.test(UI),
    'polun pituus luetaan yhä selaimelta — WebKit palauttaa nollan piilossa olevalle');
});

test('polun pituus lasketaan ilman selainta', () => {
  // Suora jana: murtoviiva-arvion on osuttava tarkkaan oikeaan.
  assert.ok(Math.abs(polunPituus([[0, 0], [100, 0]]) - 100) < 0.01);
  // Kaaren pituus on aina vähintään päiden välinen etäisyys.
  const kaari = polunPituus([[0, 0], [50, 40], [100, 0]]);
  assert.ok(kaari > 100 && kaari < 200, `odottamaton kaaren pituus ${kaari}`);
  assert.equal(polunPituus([[5, 5]]), 0);
});

test('kierretty silmukka kelpaa SMILille', () => {
  /*
   * keyTimes on hylkäysehto: sen on alettava nollasta, päätyttävä
   * ykköseen ja kasvettava koko matkan. Vaihe leivotaan avainhetkiin,
   * jottei tarvita negatiivista begin-arvoa (WebKitin ajastuksen
   * erikoistapaukset ovat juuri se, mihin ei haluta nojata).
   */
  const kehykset = alkuKehykset(0.44);
  for (const vaihe of [0, 0.5, 0.83, -0.37, 1.25, 0.0001, 0.9999]) {
    const k = kierraKehykset(kehykset, vaihe);
    assert.equal(k[0].t, 0, `vaihe ${vaihe}: ei ala nollasta`);
    assert.equal(k[k.length - 1].t, 1, `vaihe ${vaihe}: ei pääty ykköseen`);
    for (let i = 1; i < k.length; i++) {
      assert.ok(k[i].t > k[i - 1].t, `vaihe ${vaihe}: keyTimes ei kasva kohdassa ${i}`);
    }
    for (const askel of k) {
      assert.ok(askel.kulku >= 0 && askel.kulku <= 1, `vaihe ${vaihe}: keyPoints ${askel.kulku} rajojen ulkopuolella`);
      assert.ok(askel.nakyy >= 0 && askel.nakyy <= 1, `vaihe ${vaihe}: peittävyys ${askel.nakyy} rajojen ulkopuolella`);
    }
  }
});

test('silmukan sauma osuu kohtaan, jossa mitään ei näy', () => {
  // Kierretyssä silmukassa arvo hyppää kerran lopusta alkuun. Hyppy on
  // näkymätön vain, jos peittävyys on sen molemmin puolin nolla.
  const kehykset = alkuKehykset(0.44);
  for (const vaihe of [0.3, 0.5, 0.77]) {
    const k = kierraKehykset(kehykset, vaihe);
    for (let i = 1; i < k.length; i++) {
      if (k[i].kulku >= k[i - 1].kulku - 0.001) continue; // ei hyppyä taaksepäin
      assert.equal(k[i].nakyy, 0, `vaihe ${vaihe}: hyppy näkyisi (peittävyys ${k[i].nakyy})`);
      assert.equal(k[i - 1].nakyy, 0, `vaihe ${vaihe}: hyppy näkyisi (peittävyys ${k[i - 1].nakyy})`);
    }
  }
});

test('liikkeen vähennys näyttää reitit, ei tyhjää', () => {
  // Ennen koko kerros jätettiin rakentamatta ja CSS piilotti sen: kartta
  // oli asetuksen kanssa tyhjä. Nyt pohjaviiva jää näkyviin.
  assert.ok(!/prefers-reduced-motion[\s\S]{0,400}\.alkureitit\s*\{\s*display:\s*none/.test(CSS),
    'liikkeen vähennys piilottaa yhä koko kerroksen');
  assert.match(UI, /if \(this\.reducedMotion\) continue;/,
    'pohjaviiva ei piirry liikkeen vähennyksessä');
});

test('etusivun taustaääni on kuultavalla tasolla', () => {
  /*
   * Efektiivinen taso on VOIMA × äänitteen oma kerroin × etusivun
   * kerroin. Se oli 0,042 eikä kuulunut läppärin kaiuttimista lainkaan
   * (omistaja 12.8.2026). Alaraja vartioi juuri sitä; yläraja pitää
   * huolen, ettei etusivu ala huutaa.
   */
  const perus = Number(VIRTA.match(/const VOIMA = ([\d.]+)/)[1]);
  const etusivu = Number(VIRTA.match(/const ETUSIVUN_VOIMA = ([\d.]+)/)[1]);
  // Etusivun ääni on lentoasemakorin ensimmäinen (VAKIOPAIKAT: ei arvontaa).
  const kori = EHDOKKAAT.match(/lentoasema: \[\s*\{ url: '([^']+)'/);
  const { voima } = jaaAlku(kori[1]);
  const taso = perus * voima * etusivu;
  assert.ok(taso > 0.09 && taso < 0.2, `etusivun efektiivinen taso ${taso.toFixed(3)} ei ole kuultavalla alueella`);
});

test('automaattitoiston uudelleenyritys on eleen kutsupinossa', () => {
  /*
   * Safari myöntää soittoluvan vain kutsulle, joka on suoraan eleen
   * kutsupinossa. Kuuntelija on lisäksi kaappausvaiheessa, koska kartan
   * oma napautuszoomaus pysäyttää tapahtuman ennen kuplintaa.
   */
  const kohta = VIRTA.slice(VIRTA.indexOf('const ele = () => {'));
  // Kommentit pois: ne puhuvat awaitista ja setTimeoutista nimeltä.
  const runko = kohta.slice(0, kohta.indexOf('\n    };')).replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
  assert.ok(!/await|\.then\(|setTimeout\(/.test(runko),
    'eleen käsittelijässä on asynkroniaa ennen soittoa — Safari hylkää play():n');
  assert.match(runko, /\bsoi\(\);/, 'ele ei yritä soittoa uudelleen');
  assert.match(VIRTA, /document\.addEventListener\(laji, ele, \{ passive: true, capture: true \}\)/,
    'elettä kuunnellaan kuplinnassa — kartan napautus voi syödä sen');
});
