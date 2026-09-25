/*
 * LINSSIEN YHTEINEN KEHYSLIUKU (omistaja 16.9.2026).
 *
 * Raamattu, "IHMISEN MATKA -LINSSI … JATKO" ja sen jatko: kun linssi on
 * piilottanut kehyksen mustan/avaruusvaiheen ajaksi, kehys palaa
 * LIUKUMALLA ruudun ulkopuolelta paikalleen — EI pelkällä peittävyyden
 * feidillä. Mekanismi on YKSI JA YHTEINEN kaikille linsseille
 * (css/linssikehys.css), ei linssikohtaisia kopioita.
 *
 * Tämä testi lukee tyylitiedoston tekstinä. Ajonaikaisen liu'un —
 * yläpalkki ruudun ulkopuolella valkenemisen alkaessa ja paikallaan
 * 700 ms myöhemmin — mittaa tools/savukkeet/savuke-ihmisen-kehys.mjs
 * kahdella ruudulla (390 ja 1400 px).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const lue = (polku) => readFileSync(new URL(`../${polku}`, import.meta.url), 'utf8');

const CSS = lue('css/linssikehys.css');
const OHJAAJA = lue('js/linssit/ihmisen-matka-esitys.js');
const INDEX = lue('index.html');
const SW = lue('sw.js');
const BUILD = lue('tools/build-standalone.mjs');

/** Yhden säännön runko valitsimen ensiesiintymästä sulkevaan aaltosulkeeseen. */
function saanto(css, valitsin) {
  const kohta = css.indexOf(valitsin);
  if (kohta < 0) return null;
  const alku = css.indexOf('{', kohta);
  const loppu = css.indexOf('}', alku);
  return alku < 0 || loppu < 0 ? null : css.slice(alku + 1, loppu);
}

test('kehys liukuu sisään: yhteinen sääntö siirtää transformilla, ei pelkällä peittävyydellä (16.9.2026)', () => {
  const siirtyma = saanto(CSS, 'body.kehys-liukuu .aikajana .aikajana-ylarivi');
  assert.ok(siirtyma, 'css/linssikehys.css: yhteistä siirtymäsääntöä ei löydy');
  /*
   * PELKKÄ OPACITY-SIIRTYMÄ ON JUURI SE, MITÄ OMISTAJA EI HALUA. Sääntö
   * saa feidata kirkkauden kartan tahtiin, mutta liikkeen on oltava
   * transformissa — muuten kehys vain ilmestyy paikalleen.
   */
  assert.match(siirtyma, /transition:[^;]*transform/, 'siirtymässä ei ole transformia');
  assert.ok(!/transition:\s*opacity[^;]*;/.test(siirtyma),
    'yhteinen sääntö ei saa olla pelkkä opacity-siirtymä');
  // Kesto tulee muuttujasta, jonka ohjaaja asettaa (0 ms piilotuksessa).
  assert.match(siirtyma, /transform var\(--kehys-liuku, 500ms\) ease-out/);

  // Yläpalkki ylös ulos, alapalkki alas ulos, reunanapit omalle laidalleen.
  assert.match(saanto(CSS, 'body.kehys-piilossa .aikajana .aikajana-ylarivi'),
    /transform: translateY\(calc\(-110% - 2rem\)\);[\s\S]*pointer-events: none;/);
  assert.match(saanto(CSS, 'body.kehys-piilossa .aikajana .aikaselain'),
    /transform: translateY\(calc\(110% \+ 2rem\)\);[\s\S]*pointer-events: none;/);
  assert.match(saanto(CSS, 'body.kehys-piilossa .kehys-liukuva.reuna-vasen'),
    /transform: translateX\(calc\(-130% - 2rem\)\)/);
  assert.match(saanto(CSS, 'body.kehys-piilossa .kehys-liukuva.reuna-oikea'),
    /transform: translateX\(calc\(130% \+ 2rem\)\)/);
  // Pelin oma yläpalkki kulkee samassa säännössä kuin linssin palkki.
  assert.match(CSS, /body\.kehys-piilossa \.aikajana \.aikajana-ylarivi,\nbody\.kehys-piilossa \.topbar,/);
});

test('kehysliuku: liikkeenvähennys saa lyhyen feidin eikä liukua (16.9.2026)', () => {
  const lohko = CSS.slice(CSS.indexOf('@media (prefers-reduced-motion: reduce)'));
  assert.ok(lohko.length > 100, 'liikkeenvähennyksen lohko puuttuu');
  assert.match(lohko, /transition: opacity 200ms ease;/);
  assert.match(lohko, /transform: none;\n\s*opacity: 0;/);
});

test('kehysliuku: ohjaaja piilottaa ilman liukua ja paljastaa liu\'ulla (16.9.2026)', () => {
  // Aloituksessa kesto on nolla — musta peittää kehyksen joka tapauksessa.
  assert.match(OHJAAJA, /runko\?\.style\?\.setProperty\('--kehys-liuku', '0ms'\);\n\s*runko\?\.classList\.add\('kehys-liukuu', 'kehys-piilossa'\);/);
  // Paluussa kesto on liu'un mitta ja luokka lähtee.
  assert.match(OHJAAJA, /export const KEHYKSEN_LIUKU_MS = 500;/);
  assert.match(OHJAAJA, /runko\?\.style\?\.setProperty\('--kehys-liuku', `\$\{KEHYKSEN_LIUKU_MS\}ms`\);\n\s*runko\?\.classList\.remove\('kehys-piilossa'\);/);
  // Linssin sulkeminen ei saa jättää kehystä ruudun ulkopuolelle.
  assert.match(OHJAAJA, /runko\?\.classList\.remove\('kehys-liukuu', 'kehys-piilossa'\);/);
  // Mittari savukkeelle.
  assert.match(OHJAAJA, /kehysUlkona: Boolean\(ajo\.juuri\?\.ownerDocument\?\.body\?\.classList\?\.contains\('kehys-piilossa'\)\)/);
});

test('kehysliuku: tyylitiedosto on ladattu ja kuoressa (16.9.2026)', () => {
  assert.match(INDEX, /<link rel="stylesheet" href="css\/linssikehys\.css" \/>/);
  assert.match(SW, /'\.\/css\/linssikehys\.css',/);
  assert.match(BUILD, /'css\/linssikehys\.css',/);
});
