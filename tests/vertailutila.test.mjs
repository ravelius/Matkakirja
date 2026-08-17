/*
 * Vertailutila (v321): vertailulinssi ottaa karttanäkymän haltuunsa.
 *
 * Toteutus on viidessä paikassa — linssimoduuli, js/vertailu.js
 * (remontin M3: tila muutti omaan moduuliinsa), js/ui.js:n
 * kytkennät, js/maakayrat.js:n piirto ja css. Testit lukevat
 * lähdetekstin, koska ui.js ei aukea Nodessa (DOM), ja vahtivat
 * juuri ne kohdat, joissa osat voivat eriytyä toisistaan.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { VERTAILUVARIT, piirraVertailu } from '../js/maakayrat.js';
import { LINSSI } from '../js/linssit/vertailu.js';

const ui = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');
const vertailu = readFileSync(new URL('../js/vertailu.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('värilista on sama ui.js:ssä ja maakayrat.js:ssä', () => {
  /*
   * vertailu.js pitää samaa listaa toisintona, koska alapalkki tarvitsee
   * värit ennen kuin maakayrat.js on ladattu (laiska tuonti). Jos
   * listat eriytyvät, kartan lappu ja käyrä olisivat eri väriset.
   */
  const rivi = vertailu.match(/const VERTAILUVARIT = \[([\s\S]*?)\];/)?.[1] ?? '';
  const uiVarit = [...rivi.matchAll(/'([^']+)'/g)].map((m) => m[1]);
  assert.deepEqual(uiVarit, VERTAILUVARIT, 'värilistat eriytyivät');
});

test('jokaisella värillä on viiva, laatta ja fill: none', () => {
  const saannot = css.replace(/\/\*[\s\S]*?\*\//g, '');
  for (const luokka of VERTAILUVARIT) {
    assert.match(saannot, new RegExp(`\\.${luokka} \\{[^}]*stroke:`), `${luokka}: viivaväri puuttuu`);
    assert.match(saannot, new RegExp(`\\.${luokka}-laatta \\{[^}]*background:`), `${luokka}: laatta puuttuu`);
  }
  /*
   * fill: none koskee kaikkia viivaluokkia. Kolmas ja neljäs maa
   * unohtuivat siitä ensin, ja polyline täyttyi mustalla: käyrien
   * väliin ilmestyi umpimusta läiskä.
   */
  const tayttamattomat = saannot.match(/([^{}]*)\{\s*\/?[^}]*fill: none;/g)?.join(' ') ?? '';
  for (const luokka of VERTAILUVARIT) {
    assert.ok(tayttamattomat.includes(`.${luokka}`), `${luokka} puuttuu fill: none -säännöstä`);
  }
});

test('vertailutila on kartan tila, ei karttakerros', () => {
  assert.equal(LINSSI.kerros, false, 'vertailulinssi ei piirrä kerrosta');
  assert.match(ui, /tahdistaVertailu\(this, tunnus === 'vertailu'\)/,
    'tila ei kytkeydy linssin sytytyksestä');
  assert.match(vertailu, /classList\.toggle\('vertailu-tila', halutaan\)/,
    'bodyn luokkaa ei aseteta');
  // Kerros piirretään joka piirrossa uudestaan: ilman tätä kaupungit
  // palaisivat kartalle heti kun lauta piirretään uusiksi.
  const piirto = ui.match(/this\.drawCountryBorders\(\);[\s\S]{0,600}?this\.drawTokens\(\);/)?.[0] ?? '';
  assert.match(piirto, /piirraVertailuMaat\(this\)/, 'maakerrosta ei piirretä joka piirrossa');
});

test('kaupungit piilotetaan ja alanapit korvataan palkilla', () => {
  const saannot = css.replace(/\/\*[\s\S]*?\*\//g, '');
  assert.match(saannot, /body\.vertailu-tila[^{]*\.cities[^{]*\{[^}]*display: none/,
    'kaupungit eivät katoa vertailutilassa');
  assert.match(saannot, /body\.vertailu-tila[^{]*\.actions[^{]*\{[^}]*visibility: hidden/,
    'alanapit eivät piiloudu');
  assert.match(vertailu, /html\('button', 'primary vertailu-vertaa', 'Vertaa'\)/,
    'Vertaa-nappi puuttuu palkista');
});

test('valintoja mahtuu neljä: kolme maata ja Suomi', () => {
  assert.match(vertailu, /export const VERTAILU_MAX = 4;/,
    'enimmäismäärä ei ole neljä');
  assert.match(vertailu, /countryShapes\?\.FIN/, 'Suomea ei aseteta valmiiksi valinnaksi');
});

test('vertailunäkymän kuori on index.htmlssä', () => {
  assert.match(html, /id="vertailu-dialog"/, 'dialogi puuttuu');
  assert.match(html, /id="vertailu-ylarivi"/, 'ylärivi puuttuu');
  assert.match(html, /id="vertailu-sisalto"/, 'sisältökotelo puuttuu');
  assert.match(vertailu, /Muuta valintoja/, 'paluu kartalle puuttuu');
});

test('piirraVertailu kestää tyhjän ja tuntemattoman maan', () => {
  /*
   * Piirto ei saa kaatua, jos valitulta maalta puuttuvat sarjat:
   * aineistossa on 228 maata, mutta pelin kartalla voi olla muitakin.
   * Nodessa ei ole DOM:ia, joten document korvataan sillä vähällä,
   * mitä tyhjä haara käyttää.
   */
  globalThis.document = {
    createElement: () => ({
      className: '', textContent: '', lapset: [],
      appendChild(n) { this.lapset.push(n); },
    }),
  };
  const kohde = { lapset: [], replaceChildren() { this.lapset = []; }, appendChild(n) { this.lapset.push(n); } };
  const data = { maat: {}, meta: { lahderivi: 'testi' } };
  assert.doesNotThrow(() => piirraVertailu(kohde, ['XXX'], data));
  assert.equal(kohde.lapset.length, 1, 'tyhjästä valinnasta pitää jäädä yksi rivi');
});
