import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

/*
 * LÄHTÖKAUPUNGIN VALINTA PALLOLLA — aalto 3A
 * (docs/moduulit/karttapallo.md luku 10.3; omistaja 5.9.2026 sanatarkasti:
 * *"Käännä kaikki pallolle, niin voidaan sulkea vanha kartta kokonaan."*).
 *
 * Aalto 1D jätti tähän yhden poikkeuksen: "Valitse aloituskaupunki"
 * herätti tasokartan lepotilasta, ja lähtökaupunki valittiin
 * kohderenkaista svg#boardilta. Se oli pallolaudan VIIMEINEN pelitoiminto,
 * joka vielä ajoi js/kartta.js:ää. Nämä vartijat pitävät huolen siitä,
 * ettei herätys palaa takaisin ja että valintanäkymä on pallon oma.
 *
 * Vartijat ovat tekstivartijoita samalla mallilla kuin
 * tests/pallolauta.test.mjs ja tests/aikajana-pallolla.test.mjs: pallon
 * kerrokset ja Globe.gl eivät aja Nodessa, mutta haarat ja kytkennät ovat
 * luettavissa lähteestä.
 */

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const { ALOITUSVALINNAN_KUPLAVARA, ALOITUSVALINNAN_MARGINAALI } = await import('../js/pallolauta/lauta.js');
const { LENNON_RAJAUKSEN_MARGINAALI } = await import('../js/pallolauta/siirto.js');
const ui = lue('../js/ui.js');
const lauta = lue('../js/pallolauta/lauta.js');

/* ================================================================== *
 * 1. Kartta ei herää lähtövalinnassa pallolaudalla
 * ================================================================== */

test('aloitaKartalta ei herätä karttaa pallolaudalla', () => {
  const nappi = ui.match(/ {2}aloitaKartalta\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.doesNotMatch(nappi, /this\.kartta\./,
    'lähtövalinnan nappi ei saa koskea tasokarttaan lainkaan');
  assert.match(nappi, /if \(this\.aloituslentoPallolla\(\)\) \{ this\.aloitaPallolta\(\); return; \}/);
  assert.match(nappi, /this\.aloitaTasokartalta\(\);/);
  // Vanha kulku säilyy ?lauta=kartta-tilassa ja pallon varapolussa (3B poistaa).
  const vanha = ui.match(/ {2}aloitaTasokartalta\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.match(vanha, /this\.kartta\.heraa\(\);/);
  assert.match(vanha, /this\.kartta\.zoomaaAloituskartta\(/);
});

test('aloitaPallolta nostaa lipun ennen piirtoa ja Livia lennähtää mukaan', () => {
  const polku = ui.match(/ {2}aloitaPallolta\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  // Lippu ENNEN renderiä: pallolautaHalutaan, renderIntro ja
  // aloitusvalinnanKohteet lukevat sen samassa piirrossa.
  assert.match(polku, /this\.aloitusvalintaPallolla = true;\n\s*this\.render\(\);/);
  // Lippu on laudan oma: js/kartta.js nollaa aloitusZoomin aina kun
  // kartta nukahtaa (nollaaAloitusZoom), ja pallo nukuttaa sen.
  assert.match(lue('../js/kartta.js'), /this\.ui\.aloitusZoom = false;/);
  assert.doesNotMatch(lue('../js/kartta.js'), /aloitusvalintaPallolla/,
    'tasokartta ei saa koskea pallon valintalippuun');
  // Repliikit ennallaan: sama kutsu kuin tasokartan lähikuvassa
  // (js/kartta.js zoomaaAloituskartta).
  assert.match(polku, /naytaLivianAvaus\(this\);/);
  assert.match(ui, /naytaLivianAvaus, naytaLivianPaljastus/,
    'js/ui.js tuo Livian avauksen js/livia.js:stä');
  assert.match(lue('../js/kartta.js'), /naytaLivianAvaus\(this\.ui\);/,
    'tasokartan polku pitää saman repliikkisarjan');
});

test('pallolauta avautuu vasta napista, mutta jo pickstart-vaiheessa', () => {
  const halutaan = ui.match(/^ {2}pallolautaHalutaan\(\) \{[\s\S]*?\n {2}\}/m)[0];
  assert.match(halutaan, /if \(this\.game\.phase === 'pickstart'\) return this\.aloitusvalintaPallolla;/);
  // Pakkaehto ei enää portita pickstartia: aloitusnäytön lauta on
  // js/packs/maailma.js eikä maailmankartta.
  assert.match(halutaan, /return this\.game\.pack\?\.id === 'maailmankartta';/);
});

test('etusivun pallovideo puretaan samassa piirrossa kuin valinta alkaa', () => {
  assert.match(ui, /if \(nakyy && !this\.aloitusvalintaPallolla && etusivupalloPaalla\(\)\) \{/,
    'renderIntro ei saa avata pallovideota enää valintatilassa');
});

test('pallon varapolku antaa lähtövalinnan takaisin kartalle', () => {
  const varapolku = ui.match(/ {2}pallolautaVarapolku\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.match(varapolku, /this\.pallolautaEpaonnistui = true;/);
  assert.match(varapolku, /if \(this\.game\.phase === 'pickstart' && this\.aloitusvalintaPallolla\) \{\n\s*this\.aloitusvalintaPallolla = false;\n\s*this\.aloitaTasokartalta\(\);/);
});

/* ================================================================== *
 * 2. Valintatila käyttää laudan omia kerroksia
 * ================================================================== */

test('valittavat kaupungit ovat laudan merkkejä (kohde-laji), eivät svg-renkaita', () => {
  // ui.js kertoo MITKÄ kaupungit, lauta piirtää MITEN.
  const kohteet = ui.match(/ {2}aloitusvalinnanKohteet\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.match(kohteet, /this\.game\.phase !== 'pickstart' \|\| this\.katselu \|\| !this\.aloitusvalintaPallolla/,
    'kohteet ilmestyvät vasta napin jälkeen, kuten drawTargetsissa');
  assert.match(kohteet, /\[\.\.\.ETUSIVUN_KOHTEET\]/,
    'sama joukko kuin tasokartan kohderenkailla');
  const nakyvat = ui.match(/ {2}aloitusvalinnanNakyvat\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.match(nakyvat, /return ETUSIVUN_NAKYVAT;/,
    'sama niukkuus kuin paivitaAloituskaupungit tasokartalla');

  // Lauta pyytää molemmat ui:lta eikä keksi omaa joukkoaan.
  assert.match(lauta, /const aloitusNakyvat = \(\) => ui\.aloitusvalinnanNakyvat\?\.\(\) \?\? null;/);
  assert.match(lauta, /const aloitusKohteet = \(\) => \(ui\.aloitusvalinnanKohteet\?\.\(\) \?\? \[\]\)/);
  // Merkki on nopanheiton kohde: sama datum, sama kohdeElementti.
  assert.match(lauta, /return \{ key: `aloitus:\$\{city\.id\}`, x: k\.x, y: k\.y, city \};/);
  assert.match(lauta, /if \(game\.phase === 'pickstart'\) return aloitusKohteet\(\);/,
    'kohdevalinta antaa aloituskaupungit merkkikerrokselle (osa `peli`)');
  const merkit = lue('../js/pallolauta/merkit.js');
  assert.match(merkit, /else if \(d\.laji === 'kohde'\) el = kohdeElementti\(d\);/);
  assert.match(merkit, /if \(osa === 'peli'\) kohteet = lista\.filter\(\(d\) => d\.laji === 'kohde'\);/);
});

test('pallon lauta on aina maailmankartta — myös aloitusnäytön aikana', () => {
  /*
   * Aloitusnäytön lauta (js/packs/maailma.js) on eri koordinaatistossa
   * kuin maailmankartta, eikä sen pisteitä voi projisoida pallolle.
   * Sama pakka annetaan myös nimikerrokselle, joka muistaa aineistonsa.
   */
  assert.match(lauta, /const pack = ui\.game\.pack\?\.id === PALLO_LAUTA \? ui\.game\.pack : packById\(PALLO_LAUTA\);/);
  assert.match(lauta, /const packKaupunki = new Map\(\(pack\?\.cities \?\? \[\]\)\.map\(\(c\) => \[c\.id, c\]\)\);/);
  assert.match(lauta, /ui, merkit, asteet: pallonAsteet, ruudulla, kotelo, pack,/);
  assert.match(lue('../js/pallolauta/nimet.js'), /karttanimienKaupungit\(pack \?\? ui\.game\.pack\)/);
});

test('valintanäkymä rajaa Lontoon ja valittavat kuplien yläpuolelle', () => {
  assert.match(lauta, /const aloitusnakyma = \(\{ kesto = 0 \} = \{\}\) => \{/);
  // Livian kuplapino peittää ruudun alalaidan (js/livia.js): kamera
  // tähtää laatikon keskipisteen ETELÄPUOLELLE, jolloin valittavat
  // nousevat ruudulla kuplien yläpuolelle.
  assert.match(lauta, /y: y0 \+ h \/ 2 \+ \(korkeus \* ALOITUSVALINNAN_KUPLAVARA\) \/ 2,/);
  assert.match(lauta, /const vara = 1 \+ 2 \* ALOITUSVALINNAN_MARGINAALI;/);
  assert.ok(ALOITUSVALINNAN_MARGINAALI > LENNON_RAJAUKSEN_MARGINAALI,
    'pallon perspektiivi levittää reunapisteet: valinta tarvitsee lentoa reilumman marginaalin');
  assert.ok(ALOITUSVALINNAN_KUPLAVARA > 0.2 && ALOITUSVALINNAN_KUPLAVARA < 0.5);
  assert.match(lauta, /^ {4}aloitusnakyma,$/m, 'lauta vie näkymän ulos ui.js:lle');
  assert.match(ui, /if \(this\.game\.phase === 'pickstart'\) lauta\.aloitusnakyma\(\);\n\s*else lauta\.kamera\.kotiin\(\);/,
    'avaaPallolauta ei kutsu kotiin-ajoa ennen kuin matkaajalla on paikka');
});

test('nappula seisoo Lontoossa PALLON koordinaateissa myös lähtövalinnassa', () => {
  // Aloitusnäytön lauta on eri projektiossa: ilman tätä apuria nappula
  // päätyi Tyynellemerelle (mitattu Chromiumilla).
  assert.match(lauta, /const pallonKohta = \(pos\) => \{/);
  assert.match(lauta, /if \(ui\.game\.pack\?\.id === pack\?\.id\) return ui\.game\.board \? pixelOf\(ui\.game\.board, pos\) : null;/);
  assert.match(lauta, /const c = packKaupunki\.get\(pos\.city\);/);
  assert.match(lauta, /const kohta = pallonKohta\(pos\);/);
});

/* ================================================================== *
 * 3. Napautus käynnistää pelin
 * ================================================================== */

test('kohteen napautus vie doPickStartiin, muu kaupunki on vaiti', () => {
  const kohde = lauta.match(/ {2}const napautaKohde = \(kohde\) => \{[\s\S]*?\n {2}\};/)[0];
  assert.match(kohde, /if \(game\.phase === 'pickstart'\) \{\n\s*if \(!kohde\.city\) return false;\n\s*heraa\(\);\n\s*ui\.doPickStart\(kohde\.city\);/);
  // Kohde ratkaistaan ENNEN kaupunkeja (napautaPintaan): kehotus toimia
  // voittaa Lontoon pisteen.
  assert.match(lauta, /const kohde = lahinKohde\(lat, lng\);\n\s*if \(kohde\) \{ napautaKohde\(kohde\); return; \}/);
  const kaupunki = lauta.match(/ {2}const napautaKaupunki = \(k\) => \{[\s\S]*?\n {2}\};/)[0];
  assert.match(kaupunki, /if \(ui\.game\.phase === 'pickstart'\n\s*&& !\(kehittajaTilaPaalla\(\) && kehittajaMaailmaPaalla\(\) && !ui\.katselu\)\) return false;/,
    'Lontoo on lähtöpiste eikä valinta — sen napautus ei sukella kameralla');
});

test('doPickStart on yhä yksi polku molemmille laudoille', () => {
  // Napautus tekee saman kuin tasokartan kohderengas: peli ei tiedä
  // kummalta laudalta valinta tuli.
  assert.match(ui, /if \(!zoomaa\) this\.doPickStart\(c\);/, 'tasokartan rengas kutsuu doPickStartia');
  assert.match(ui, /if \(kartalento && this\.aloituslentoPallolla\(\)\) this\.kartta\.nuku\(\);/);
  assert.match(ui, /peruLivianAvaus\(\);/, 'valinta vie Livian kuplat pois');
});

/* ================================================================== *
 * 4. Häivytetty avausteksti ei syö napautuksia
 * ================================================================== */

test('häivytetty avausteksti on poissa myös sormelta', () => {
  const css = lue('../css/styles.css');
  assert.match(css, /\.intro\.intro-fade,\n\.intro\.intro-fade \* \{ pointer-events: none; \}/,
    'näkymätön Valitse aloituskaupunki -nappi veisi pallon pyörityksen');
});
