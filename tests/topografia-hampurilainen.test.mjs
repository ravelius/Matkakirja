// Topografia-linssin hampurilainen (omistaja 2.10.2026 klo 21.3x): nimipilleri pois, tilalle OHJAUSNAPPI-neliö,
// valikossa ylimpänä Korkeustasot ja sen alla Sulje linssi (linssin hampurilaisen PANEELI (LASI) -pohja).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pohjatCss } from './pohjat-css.mjs';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const UI = lue('../js/ui.js');
const VALIKKO = lue('../js/aikajana-valikko.js');
const TOPOGRAFIA = lue('../js/linssit/topografia.js');
const CSS = pohjatCss();

test('Topografia pyytää hampurilaisen, jonka selitekohta on Korkeustasot', () => {
  assert.match(TOPOGRAFIA, /valikko: \{ selite: 'Korkeustasot' \},/);
});

test('valikossa ylimpänä selitteen kytkin ja sen alla Sulje linssi; valikko on linssin hampurilainen', () => {
  const runko = UI.slice(UI.indexOf('  async piirraLinssinHampurilainen(linssi) {'));
  assert.match(runko, /const \{ luoLinssivalikko \} = await import\('\.\/aikajana-valikko\.js'\);[\s\S]*?const valikko = luoLinssivalikko\(\{/);
  const selite = runko.indexOf("luokka: 'linssi-valikko-selite'");
  const sulje = runko.indexOf("{ luokka: 'linssi-valikko-sulje', teksti: 'Sulje linssi', teko: () => this.valitseLinssi(null) }");
  assert.ok(selite > 0 && sulje > selite);
  assert.match(runko, /kirjoita: \(auki\) => this\.vaihdaLinssiSelite\(!auki\),/);
  // Omat kohdat korvaavat aikajanan neljä kohtaa; Esc sulkee vain karttalinssin valikon.
  assert.match(VALIKKO, /omat\.push\(k\.lue \? kytkin\(k\.luokka, k\.teksti, k\.lue, k\.kirjoita\) : komento\(k\.luokka, k\.teksti, k\.teko\)\);/);
  assert.match(VALIKKO, /if \(kohdat\) document\.addEventListener\?\.\('keydown', esc, true\);/);
});

test('hampurilaisen linssillä ei nimipilleriä: otsikko on tekstiä ja kortti piilossa, kunnes kytkin avaa sen', () => {
  assert.match(UI, /if \(valikossa\) \{\s*otsikko\.textContent = linssi\.valikko\.selite \?\? linssi\.nimi;\s*\} else \{\s*const otsikkoNappi = html\('button', 'linssi-selite-nappi'/);
  assert.match(UI, /kortti\.hidden = kortti\.classList\.contains\('valikossa'\) && this\.linssiSelitePieni;/);
  // Kerroksen sammuessa myös hampurilainen puretaan.
  assert.match(UI, /suljeLinssiSelite\(\) \{\s*this\.linssiSelite\?\.remove\(\);\s*this\.linssiSelite = null;\s*void this\.piirraLinssinHampurilainen\(null\);/);
});

test('nappi on OHJAUSNAPPI-neliö (40, kulma nappi) oikeassa yläkulmassa; kortti alkaa napin alta', () => {
  assert.match(CSS, /\.linssi-karttavalikko \{\s*position: absolute;\s*top: var\(--tk-vali-s\);\s*right: var\(--tk-vali-s\);/);
  assert.match(CSS, /\.linssi-karttavalikko \.aikajana-valikko-nappi,[\s\S]*?width: var\(--tk-nappi-ohjaus\);[\s\S]*?height: var\(--tk-nappi-ohjaus\);[\s\S]*?border-radius: var\(--tk-kulma-nappi\);/);
  assert.match(lue('../css/styles.css'), /\.linssi-selite\.valikossa\[data-corner='tr'\] \{ top: calc\(var\(--tk-vali-s\) \* 2 \+ var\(--tk-nappi-ohjaus\)\); \}/);
});
