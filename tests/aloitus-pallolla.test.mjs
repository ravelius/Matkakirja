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
const {
  ALOITUKSEN_PYORINTA_AST_S, ALOITUKSEN_PYSAYTYS_MS,
  ALOITUSVALINNAN_KUPLALEVEYS_PX, ALOITUSVALINNAN_KUPLAVARA_PX, ALOITUSVALINNAN_MARGINAALI,
} = await import('../js/pallolauta/lauta.js');
const { LIVIAN_AVAUKSEN_VIIVE_MS } = await import('../js/livia.js');
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
  // Vanha polku on 5.9.2026 alkaen asynkroninen: tasokartan moduuli
  // ladataan vasta tässä (laiskoituserä 5b, js/kartta-lataus.js).
  const vanha = ui.match(/ {2}async aloitaTasokartalta\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.match(vanha, /await this\.varmistaKartta\(\);/);
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
  assert.match(varapolku, /if \(this\.game\.phase === 'pickstart' && this\.aloitusvalintaPallolla\) \{\n\s*this\.aloitusvalintaPallolla = false;\n\s*void this\.aloitaTasokartalta\(\);/);
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
  // nousevat ruudulla kuplien yläpuolelle. Vara on PIKSELEITÄ (kupla on
  // tekstiä, ei osuus ruudusta) ja rajattu puoleen laatikon ja reunan
  // välistä, jottei Lontoo nouse yläreunan yli tiukassa rajauksessa.
  assert.match(lauta, /const kuplavaraY = \(ALOITUSVALINNAN_KUPLAVARA_PX \/ 2\) \* \(korkeus \/ ruutuH\);/);
  assert.match(lauta, /const kuplavaraX = \(ALOITUSVALINNAN_KUPLALEVEYS_PX \/ 2\) \* \(leveys \/ ruutuW\);/);
  assert.match(lauta, /const siirtoY = Math\.min\(kuplavaraY, Math\.max\(0, \(korkeus - h\) \/ 4\)\);/);
  assert.match(lauta, /const siirtoX = Math\.min\(kuplavaraX, Math\.max\(0, \(leveys - w\) \/ 4\)\);/);
  // Etelään JA itään: sisältö nousee ja siirtyy vasemmalle, poispäin
  // kuplien nurkasta (kuplapino on oikeassa alalaidassa).
  assert.match(lauta, /\{ x: x0 \+ w \/ 2 \+ siirtoX, y: y0 \+ h \/ 2 \+ siirtoY, leveys \}/);
  assert.ok(ALOITUSVALINNAN_KUPLAVARA_PX >= 120 && ALOITUSVALINNAN_KUPLAVARA_PX <= 300,
    'kuplapino on mitattu 129 px (2000 × 1300) ja 180 px (390 × 844) korkeaksi');
  assert.equal(ALOITUSVALINNAN_KUPLALEVEYS_PX, 336, 'kuplapinon mitattu leveys');
  assert.match(lauta, /^ {4}aloitusnakyma,$/m, 'lauta vie näkymän ulos ui.js:lle');
  assert.match(ui, /if \(this\.game\.phase === 'pickstart'\) lauta\.aloitusnakyma\(\);\n\s*else lauta\.kamera\.kotiin\(\);/,
    'avaaPallolauta ei kutsu kotiin-ajoa ennen kuin matkaajalla on paikka');
});

/*
 * ZOOM LÄHEMMÄS (omistaja 5.9.2026 klo 00.30 työpöytäselaimesta
 * 2000 × 1300, sanatarkasti: *"kartan zoom taso heti aloituksessa
 * lähemmäksi. ks. 2 kuva"*). Kaksi asiaa muuttui samalla: kameran kaava
 * sai kuvasuhteen (tests/pallolauta.test.mjs) ja marginaali kalibroitiin
 * mittaamalla. Luku on MITTA — jos se muuttuu, kuva on mitattava uudelleen.
 */
test('aloituksen rajaus on mitattu: Eurooppa täyttää ruudun', () => {
  assert.match(lauta, /const vara = 1 \+ 2 \* ALOITUSVALINNAN_MARGINAALI;/);
  assert.equal(ALOITUSVALINNAN_MARGINAALI, 0.12);
  // Ennen kuvasuhdekorjausta valinta tarvitsi lentoa REILUMMAN
  // marginaalin (0,8), koska pyydetty leveys tarkoitti ruudun korkeutta;
  // nyt sama laatikko mahtuu tiukemmalla kuin lennon rajaus.
  assert.ok(ALOITUSVALINNAN_MARGINAALI < LENNON_RAJAUKSEN_MARGINAALI,
    'korjatulla kaavalla valinta on lentoa tiukempi rajaus');
});

/* ================================================================== *
 * 2b. Pallo pyörii hitaasti valinnassa, täydessä terävyydessä
 * ================================================================== */

/*
 * Omistaja 5.9.2026 klo 00.30 sanatarkasti: *"karttapallo saisi pyöriä
 * hitaast täydessä terävyydessä"*.
 */
test('valinnassa pallo pyörii hitaasti itään seinäkellosta', () => {
  assert.ok(ALOITUKSEN_PYORINTA_AST_S >= 0.3 && ALOITUKSEN_PYORINTA_AST_S <= 0.5,
    'omistajan mitta: hidas pyörintä on 0,3–0,5 astetta sekunnissa');
  assert.ok(ALOITUKSEN_PYSAYTYS_MS >= 400 && ALOITUKSEN_PYSAYTYS_MS <= 1500);
  const silmukka = lauta.match(/ {2}const aloitaAloituksenPyorinta = \(\) => \{[\s\S]*?\n {2}\};/)[0];
  // Reduced motion ja väärä vaihe eivät pyöritä.
  assert.match(silmukka, /if \(pyorinta \|\| ui\.dead \|\| ui\.reducedMotion\) return false;/);
  assert.match(silmukka, /if \(ui\.game\.phase !== 'pickstart' \|\| kuori\.hidden\) return false;/);
  // Aste sekunnissa seinäkellosta, itään, korkeus ennallaan.
  assert.match(silmukka, /lng: pov\.lng \+ ALOITUKSEN_PYORINTA_AST_S \* kerroin \* \(dt \/ 1000\)/);
  assert.match(silmukka, /altitude: pov\.altitude,/);
  assert.match(silmukka, /const dt = Math\.min\(100, Math\.max\(0, hetki - oma\.edellinen\)\);/);
  // Kolme pysäytintä: ele (pehmeä), toinen kamera-ajo (heti), vaihe.
  assert.match(silmukka, /if \(kamera\.kameraAjossa\(\)\) \{ seisAloituksenPyorinta\(\); return; \}/);
  assert.match(silmukka, /\{ paataAloitusvalinta\(\); return; \}/);
  assert.match(lauta, /kerroin = 1 - pyorinnanPehmennys\(t\);/,
    'pysähdys on ease-out samalla pehmennyksellä kuin avauslennon pyörintä');
  assert.match(lauta, /kotelo\.addEventListener\('pointerdown', hidastaAloituksenPyorinta\);/);
  assert.match(lauta, /kotelo\.addEventListener\('wheel', hidastaAloituksenPyorinta, \{ passive: true, capture: true \}\);/);
  // Ajo käynnistää pyörinnän vasta perillä (ei kesken kamera-ajon).
  assert.match(lauta, /void ajo\.then\(\(valmis\) => \{ if \(valmis\) aloitaAloituksenPyorinta\(\); \}\);/);
});

test('terävä tila on pakotettuna valinnan ajan ja vapautuu purussa', () => {
  assert.match(lauta, /laatatSaatavilla, laattatasoMax, lataaPallokirjasto, pakotaPallonLaatu,/);
  assert.match(lauta, /const pyydaAloituksenLaatu = \(\) => \{\n\s*if \(aloituksenLaatu\) return;\n\s*aloituksenLaatu = true;\n\s*pakotaPallonLaatu\(true\);/);
  assert.match(lauta, /const vapautaAloituksenLaatu = \(\) => \{\n\s*if \(!aloituksenLaatu\) return;\n\s*aloituksenLaatu = false;\n\s*pakotaPallonLaatu\(false\);/);
  // Pyyntö lähtee jo ennen kamera-ajoa: laatat haetaan terävinä heti.
  assert.match(lauta, /pyydaAloituksenLaatu\(\);\n\s*const ajo = kamera\.ajaKamera\(/);
  // Vapautus kolmesta paikasta: silmukka, piirto (kaupunki valittu) ja purku.
  assert.match(lauta, /if \(aloituksenLaatu && ui\.game\.phase !== 'pickstart'\) paataAloitusvalinta\(\);/);
  const pura = lauta.match(/ {4}pura: \(\) => \{[\s\S]*?\n {4}\},/)[0];
  assert.match(pura, /paataAloitusvalinta\(\);/,
    'pakotus on istunnon laskuri — se ei saa jäädä päälle puretun laudan jälkeen');
});

/* ================================================================== *
 * 2c. Valittavalla kaupungilla on yksi nimi, ei kahta
 * ================================================================== */

/*
 * Omistajan kaappauksessa 5.9.2026 klo 00.30 Ateenan kohdalla oli KAKSI
 * nimeä: nimikerroksen harmaa kapiteeli ja kohdemerkin oma tumma lappu.
 * Merkin nimi voittaa — se on kehotus toimia ja sama molemmilla laudoilla.
 */
test('valittavan kaupungin nimi tulee merkistä, ei nimikerroksesta', () => {
  assert.match(lauta, /const aloitusNimet = \(\) => \{/);
  assert.match(lauta, /const kohteet = new Set\(aloitusKohteet\(\)\.map\(\(k\) => k\.city\.id\)\);/);
  assert.match(lauta, /return new Set\(\[\.\.\.nakyvat\]\.filter\(\(id\) => !kohteet\.has\(id\)\)\);/);
  assert.match(lauta, /const vain = lento\?\.nimet \?\? aloitusNimet\(\);/,
    'ladonta rajaa nimet aloitusNimet-joukkoon (Lontoo), ei koko näkyvään joukkoon');
  // Piste näkyy edelleen molemmilta (PISTE VAIN NIMEN KANSSA ei koske
  // valintaa: kohdemerkki on nimi).
  assert.match(lauta, /const valinta = aloitusNakyvat\(\);\n\s*if \(valinta\) return valinta\.has\(k\.id\);/);
  // Kohdemerkki piirtää nimen (js/pallolauta/merkit.js kohdeElementti).
  assert.match(lue('../js/pallolauta/merkit.js'), /nimi\.textContent = kohde\.city\.name;/);
});

/* ================================================================== *
 * 2d. Livian kuplat 1,5 s myöhemmin
 * ================================================================== */

/*
 * Omistaja 5.9.2026 klo 00.30 sanatarkasti: *"pulun kommentit noin
 * 1,5 sek myöhemmin"*. Lisäviive on VAIN ensimmäisen kuplan edessä:
 * kuplien keskinäinen rytmi (KUPLIEN_VALI, lukuaika) on ennallaan.
 */
test('Livian avaus alkaa 1,5 s myöhemmin, rytmi ennallaan', () => {
  assert.equal(LIVIAN_AVAUKSEN_VIIVE_MS, 1500);
  const livia = lue('../js/livia.js');
  assert.match(livia, /const AVAUKSEN_VIIVE = 900;/);
  assert.match(livia, /const viive = AVAUKSEN_VIIVE \+ \(ui\.reducedMotion \? 0 : LIVIAN_AVAUKSEN_VIIVE_MS\);/,
    'reduced motion: ei lisäviivettä');
  assert.match(livia, /avausAjastin = setTimeout\(\(\) => naytaRepliikki\(ui, 0\), viive\);/);
  // Kuplien keskinäinen rytmi ei muuttunut.
  assert.match(livia, /const KUPLIEN_VALI = 280;/);
  assert.match(livia, /avausAjastin = setTimeout\(\(\) => seuraavaRepliikki\(ui, i \+ 1\), lukuaika\(teksti\)\);/);
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
