/*
 * AIKAJANA PALLOLAUDALLA — kytkennän vartija (aalto 2A).
 *
 * Omistajan linjaus 5.9.2026 (Raamattu, KAIKKI PALLOLLE, VANHA KARTTA
 * SULJETAAN, sanatarkasti): *"Käännä kaikki pallolle, niin voidaan
 * sulkea vanha kartta kokonaan"*. Sopimus ja aallot:
 * docs/moduulit/karttapallo.md luku 10.
 *
 * Moottorin KÄYTTÄYTYMINEN pallolla mitataan tynkäselaimessa
 * (tests/aikajanamerkit.test.mjs osio 1 b: merkit, syke, jälki, reikä,
 * kamera, purku). Tässä mitataan se, mikä ei näy tyngässä: että
 * PALLOHAARA ON OLEMASSA JA ETTEI KARTTAHAARA VUODA SEN LÄPI. Nämä
 * rikkoutuvat hiljaa — moottori piirtäisi nukkuvan kartan svg:hen,
 * jota kukaan ei näe, eikä yksikään testi kaatuisi.
 *
 * Tiedostot luetaan tekstinä, koska kyse on nimenomaan siitä, MISSÄ
 * haara on: ajettu koodi kertoisi vain sen, mitä tynkä sattuu
 * tarjoamaan.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');
const MOOTTORI = lue('../js/aikajana.js');
const LINSSI = lue('../js/linssit/keksinnot.js');
const UI = lue('../js/ui.js');
const LINSSIT = lue('../js/pallolauta/linssit.js');
const MERKIT = lue('../js/pallolauta/merkit.js');
const LAUTA = lue('../js/pallolauta/lauta.js');
const CSS = lue('../css/aikajana.css');
const PALLO = lue('../js/pallo.js');

test('keksintölinssillä on pallolle ja se purkaa laudan osan', () => {
  assert.match(LINSSI, /\n {2}pallolle\(lauta\) \{/, 'linssiltä puuttuu pallolle');
  assert.match(LINSSI, /lauta\?\.linssit\?\.pura\(PALLON_OSA\)/);
  // Sama osan nimi kummassakin päässä: moottori kirjaa, linssi purkaa.
  assert.match(LINSSI, /const PALLON_OSA = 'aikajana';/);
  assert.match(MOOTTORI, /export const PALLON_OSA = 'aikajana';/);
  // Linssi ei koske Globe.gl-instanssiin eikä tuo pallon moduuleja.
  assert.ok(!LINSSI.includes('pallolauta/'), 'linssi tuo pallolaudan moduuleja');
});

test('moottori valitsee laudan kerran ja piirtää pallolla vain linssiapurilla', () => {
  // Lauta ratkaistaan konstruktorissa eikä kesken ajon.
  assert.match(MOOTTORI, /this\.lauta = pallolautaAlla\(ui\) \? ui\.pallolauta : null;/);
  assert.match(MOOTTORI, /this\.pallolla = Boolean\(this\.lauta\);/);
  assert.match(MOOTTORI, /function pallolautaAlla\(ui\) \{\n\s*return Boolean\(ui\?\.pallolautaPaalla\?\.\(\) && ui\.pallolauta\?\.linssit\);/);
  // Kartan piirto on haaran takana: pallolla ei kirjoiteta ui.svg:hen.
  assert.match(MOOTTORI, /rakennaValot\(\) \{\n\s*const \{ ui \} = this;\n\s*if \(this\.pallolla\) \{ this\.rakennaValotPallolle\(\); return; \}/);
  // Kaikki ui.svg-viittaukset ovat karttahaarassa (rakennaValot alkaa
  // pallon paluulla), eikä pallohaarassa ole yhtään.
  const pallohaara = MOOTTORI.match(/ {2}rakennaValotPallolle\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.ok(!pallohaara.includes('ui.svg'), 'pallohaara kirjoittaa kartan svg:hen');
  assert.match(pallohaara, /linssit\.merkit\(PALLON_OSA, /, 'valot eivät mene laudan merkeiksi');
  assert.match(pallohaara, /linssit\.kalvoRuudulle\(PALLON_OSA, \{/, 'tummennus ei ole ruutukalvo');
  // Merkki on ruutuvakio: vastaskaalaus ei aja pallolla.
  assert.match(MOOTTORI, /paivitaMittakaava\(suhde = 1\) \{\n[^}]*if \(this\.pallolla\) return;/);
  // Purku vie laudan kerrokset.
  assert.match(MOOTTORI, /if \(this\.pallolla\) \{\n\s*cancelAnimationFrame\(this\.reianLiuku\);[\s\S]{0,200}this\.lauta\?\.linssit\?\.pura\(PALLON_OSA\);/);
});

test('kamera on hereillä olevan laudan oma, eikä fokuslukkoa käännetä pallolla', () => {
  assert.match(MOOTTORI, /kamera\(\) \{\n\s*return this\.ui\.kamera\?\.\(\) \?\? this\.ui\.kartta \?\? null;\n\s*\}/);
  // Vanha suora ui.kartta.ajaKamera on poissa kaikista ajoista.
  assert.ok(!/ui\.kartta\.ajaKamera/.test(MOOTTORI), 'kamera-ajo menee yhä suoraan tasokartalle');
  assert.match(MOOTTORI, /sovitaKaareen\(kesto = [^)]*\) \{[\s\S]{0,320}kamera\.ajaKamera\(\{ bbox: kaarenKameralaatikko/);
  assert.match(MOOTTORI, /vapautaKamera\(vapaa\) \{[\s\S]{0,600}if \(this\.pallolla\) return;/);
});

/*
 * LÄHIKUVA JA TERÄVÄ TILA (omistaja 5.9.2026 ilta, ks. karttapallo.md
 * luku 10.3). Nämä kytkennät ovat pallon omia: tasokartalla ajo
 * sovittaa yhä koko kaaren ruutuun, eikä laattamoottoria ole.
 */
test('lähikuva, ennakoiva kamera ja terävä tila ovat pallon haarassa', () => {
  // Pysäkkiajo tehdään laudan omalla kameralla, ei Globe.gl:llä.
  const ajo = MOOTTORI.match(/ {2}ajaPysakille\(i, kesto\) \{[\s\S]*?\n {2}\}/)[0];
  assert.match(ajo, /if \(!this\.pallolla/, 'lähikuva-ajo ei ole pallon haarassa');
  assert.match(ajo, /kamera\.ajaKamera\(/);
  assert.ok(!ajo.includes('pointOfView'), 'moottori koskee Globe.gl-instanssiin');
  // Ennakko ja syttymisen varmistus kulkevat saman metodin kautta.
  assert.match(MOOTTORI, /this\.ajaPysakille\(kohde, Math\.max\(AIKAJANAN_KAMERAN_POHJA_MS, eta \+ AIKAJANAN_KAMERAN_JALKIJATTO_MS\)\);/);
  assert.match(MOOTTORI, /if \(this\.pallolla && this\.kameraKohde !== i\) \{/);
  // Terävä tila tulee js/pallo.js:n laatunostolta eikä omalta vivulta.
  assert.match(MOOTTORI, /import \{ pakotaPallonLaatu \} from '\.\/pallo\.js';/);
  assert.match(PALLO, /export function pakotaPallonLaatu\(paalla\) \{/);
  assert.match(PALLO, /const aina = \(\) => laatuAinaPaalla\(ikkuna\) \|\| laatuPakotukset > 0;/);
  assert.match(MOOTTORI, /pakotaLaatu\(paalla\) \{[\s\S]{0,400}pakotaPallonLaatu\(paalla\);/);
});

test('havainnekuvan valokeila on epäsäännöllinen ja toimii kummallakin laudalla', () => {
  // Muoto lasketaan moottorissa ja välitetään css:lle muuttujana, joten
  // sama maski pätee pallolla ja vanhalla kartalla.
  assert.match(MOOTTORI, /export function valokeilanMaski\(siemen = 0, lohkoja = VALOKEILAN_LOHKOT\) \{/);
  assert.match(CSS, /mask-image: var\(--aikajana-valokeila, radial-gradient\(/);
  // Ei suodattimia (iOS-sääntö): maski on liukuvärejä, ei feTurbulencea.
  const maski = MOOTTORI.match(/export function valokeilanMaski[\s\S]*?\n\}/)[0];
  assert.ok(!/feTurbulence|feDisplacementMap|filter/.test(maski), 'maski nojaa suodattimeen');
});

test('lampun napautus kulkee laudan osumatestin kautta, ei elementin', () => {
  // Merkkirekisteri kertoo napautettavat linssimerkit…
  assert.match(MERKIT, /napautettavat: \(\) => \{/);
  assert.match(MERKIT, /typeof d\.napautus === 'function'/);
  // …ja lauta ratkaisee ne ENNEN kaupunkeja (lamppu istuu kaupungin päällä).
  assert.match(LAUTA, /const lahinLinssimerkki = \(lat, lng\) => \{\n\s*const ehdokkaat = merkit\.napautettavat\(\)\.filter\(\(d\) => edessa\(d\.lat, d\.lng\)\);/);
  assert.match(LAUTA, /const linssimerkki = lahinLinssimerkki\(lat, lng\);\n\s*if \(linssimerkki\) \{ heraa\(\); linssimerkki\.napautus\(linssimerkki\); return; \}/);
  // Myös kaupunkipisteen napautus antaa vuoron lampulle.
  assert.match(LAUTA, /else if \(lahinLinssimerkki\(d\.lat, d\.lon\)\) napautaPintaan\(d\.lat, d\.lon\);/);
  // Elementti itse ei ota osumia (kajo on 98 px leveä).
  assert.match(CSS, /\.aikajana-valo-pallolla,\n\.aikajana-valo-pallolla\.palaa \{ pointer-events: none;/);
});

test('ruutukalvo jää merkkien alle ja reikä on pehmeäreunainen', () => {
  assert.match(LINSSIT, /const merkkikerros = \(\) => \{/);
  assert.match(LINSSIT, /kerros\.parentElement\.insertBefore\(el, kerros\);/);
  assert.match(LINSSIT, /export const REIAN_KIRKAS_OSUUS = /);
  // Kolme pysäkkiä: kirkas keskusta, puolivälin sävy ja täysi tummennus.
  assert.match(LINSSIT, /rgba\(0, 0, 0, 0\) 0%, rgba\(0, 0, 0, 0\) \$\{kirkas\}%, `\n\s*\+ `\$\{keskiSavy\}/);
  // Moottori antaa saman sävyn kuin kartan maski (css .aikajana-tummennus-pinta).
  assert.match(MOOTTORI, /export const PALLON_TUMMENNUS = 'rgba\(10, 7, 5, 0\.86\)';/);
  assert.match(CSS, /\.aikajana-tummennus\.paalla \.aikajana-tummennus-pinta \{ opacity: 0\.86; \}/);
  assert.match(MOOTTORI, /export const PALLON_REIAN_SADE_PX = MERKIN_SADE \* REIAN_SUHDE;/);
});

test('ui käynnistää aikajanan myös pallolle käännetylle linssille', () => {
  // Kerrosmoottori ei kanna linssiä pallohaarassa: haku on tunnuksella.
  assert.match(UI, /const linssi = tunnus \? tuki\?\.kaikki\.find\(\(l\) => l\.tunnus === tunnus\) \?\? null : null;/);
  // Aikajanan oma Sulje päättää linssin myös pallolaudalla.
  assert.match(UI, /const linssinSulje = this\.pallolautaPaalla\(\) \|\| Boolean\(this\.linssikartta\?\.linssi\);/);
});

test('pelin omat merkit väistyvät linssin ajaksi kuten kartalla', () => {
  assert.match(CSS, /body\.aikajana-paalla \.pallolauta-nimi,/);
  assert.match(CSS, /body\.aikajana-paalla \.pallolauta-nappula \{ display: none; \}/);
});
