// Ajattelijat-linssi, vaihe 1 (Päätoimittaja 2.10.2026): kehityslippu, laiska kirjasto ja Blender-mallin luvut.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ajattelijaLipusta, kenttaMm, AJATTELIJA_KIRJASTO, AJATTELIJAT } from '../js/linssit/ajattelija.js';
import { SOKRATES } from '../js/linssit/ajattelija-sokrates.js';
import { NAUHA_EM, PROJEKTOREITA_ENINTAAN, piirraAtlas } from '../js/linssit/ajattelija-projektori.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

test('vain kehityslippu ?ajattelija=sokrates avaa näkymän; tuntematon tai puuttuva ei', () => {
  assert.equal(ajattelijaLipusta('?ajattelija=sokrates'), 'sokrates');
  assert.equal(ajattelijaLipusta('?ajattelija=platon'), null);
  assert.equal(ajattelijaLipusta(''), null);
  assert.deepEqual(Object.keys(AJATTELIJAT), ['sokrates', 'marcus']);
  assert.equal(ajattelijaLipusta('?ajattelija=marcus'), 'marcus');
  const main = lue('../js/main.js');
  assert.match(main, /const ajattelija = ajattelijaLipusta\(\);\n\s*if \(ajattelija\) avaaAjattelija\(ajattelija\)/);
});

test('three.js ladataan R2:n vendor/-kansiosta vasta avattaessa (ei staattista tuontia)', () => {
  assert.equal(AJATTELIJA_KIRJASTO, 'https://media.matkakirja.app/vendor/three-gltf-r185.min.js');
  for (const p of ['../js/linssit/ajattelija.js', '../js/linssit/ajattelija-projektori.js', '../js/linssit/ajattelija-sokrates.js']) {
    assert.doesNotMatch(lue(p), /^import .*three/m, `${p} tuo three.js:n staattisesti`);
  }
  assert.match(lue('../js/linssit/ajattelija.js'), /kolmeLupaus \?\?= import\(AJATTELIJA_KIRJASTO\)/);
  assert.match(lue('../tools/vie-three-vendor.mjs'), /three@\$\{VERSIO\}/);
});

test('Blender-mallin luvut: 38a otsalla, 18 mm lähikuva, Rembrandt 35 mm, kaari ±22°', () => {
  const l = SOKRATES.paalauseet['38a'];
  assert.equal(l.fi, 'Tutkimaton elämä ei ole elämisen arvoinen ihmiselle.');
  assert.deepEqual(l.sade, [-0.005, 0.418]);
  assert.ok(Math.abs(l.korkeus - 0.0205 * 1.25) < 1e-9);   // V7_NAUHA × v10:n ISO
  assert.equal(SOKRATES.linssi, 18);
  assert.equal(SOKRATES.otokset.rembrandt.mm, 35);
  assert.equal(SOKRATES.kierto, 22);
  assert.ok(Math.abs(kenttaMm(18) - 67.38) < 0.01, 'pystysensori 24 mm');
  assert.ok(Math.abs(NAUHA_EM - 220 / 534) < 1e-9);
  assert.ok(PROJEKTOREITA_ENINTAAN >= 21, 'päälause + 20 taustariviä');
});

test('projektori on valoa pinnalla: lisäys diffuusiin valoon, ei emissioon', () => {
  const p = lue('../js/linssit/ajattelija-projektori.js');
  assert.match(p, /reflectedLight\.directDiffuse \+= BRDF_Lambert\(diffuseColor\.rgb\) \* projektoriValo\(/);
  assert.doesNotMatch(p, /totalEmissiveRadiance/);
});

test('vaihe 3: prologi, intron leikkaukset, nimi ja kysymys, kaiku ja ääniraita kellona (Blender v7–v10)', () => {
  const pr = SOKRATES.prologi;
  assert.deepEqual([pr.kytkin, pr.taysi, pr.loppu], [30, 58, 120]);
  assert.equal(pr.valot.length, 2);   // v9-palaute: vain reunavalot
  assert.deepEqual(SOKRATES.intro.otokset.map(([r]) => r), [1, 15, 57, 119, 236, 259]);
  assert.deepEqual(SOKRATES.ajat.nimi, [282, 372]);
  assert.deepEqual(SOKRATES.ajat.kysymys, [373, 461]);
  assert.deepEqual(SOKRATES.ajat.kaiku, [965, 1440]);
  assert.equal(SOKRATES.vuodet, 'n. 470–399 eaa.');
  // Linnanrakentaja 2.10.: kaikuvoima 20 (otsa), täyte 0,10 × aurinko, seepia 1/0,78/0,52.
  assert.equal(SOKRATES.kaiku.voima, 20);
  assert.equal(SOKRATES.kaiku.tayte.osuus, 0.10);
  assert.deepEqual(SOKRATES.kaiku.savy, [1.0, 0.78, 0.52]);
  const js = lue('../js/linssit/ajattelija.js');
  assert.match(js, /G = pr0\.loppu \+ aani\.currentTime \* RUUTUA_S/, 'pääraita on kierroksen kello');
  assert.match(js, /return e\.suunta\.clone\(\);/, 'auringon avaimia ei saa muuttaa paikallaan');
  const css = lue('../css/pohjat/pinnat/ajattelija.css');
  assert.doesNotMatch(css, /#[0-9a-f]{3,6}\b|rgba?\(|\d+ms/i, 'pinnassa vain tokenit');
  assert.match(css, /font-size: var\(--tk-koko-arkki\);/);
});

test('vaihe 4: KUVANÄKYMÄ-pohja (✕ lasia, veto alas, Esc), lappu NOSTOKORTTI tummana, Pulun viisi kysymystä', () => {
  const js = lue('../js/linssit/ajattelija.js');
  assert.match(js, /luoPohjaKuvanakyma\(\{ nimi: `\$\{a\.nimi\}: ajattelija`/);
  assert.match(js, /luoPohjaNostokortti\(\{ yla: a\.nimi, otsikko: a\.elama\.otsikko, kappaleet: a\.elama\.kappaleet \}, \{\s*teema: 'tumma',/);
  assert.doesNotMatch(js, /tk-nappi ajattelija-sulku/, 'oma ✕ korvattu pohjalla');
  assert.equal(SOKRATES.elama.otsikko, 'Sokrateen elämä');
  assert.equal(SOKRATES.elama.kappaleet.length, 7);
  assert.equal(SOKRATES.pulunKysymykset.length, 5);
  assert.ok(SOKRATES.pulunKysymykset.every((k) => k.endsWith('?') && k.length <= 50));
  const css = lue('../css/pohjat/kuvanakyma.css');
  assert.match(css, /width: var\(--tk-nappi-osuma\);/);
  assert.match(css, /border-radius: var\(--tk-kulma-pilleri\);/);
  assert.doesNotMatch(css, /#[0-9a-f]{3,6}\b|rgba?\(|\d+ms/i);
});

test('omistajan v9-palaute: prologi ilman kehää, Zarathustra koko kohtaus vaimennettuna, terävä kipsi', () => {
  assert.ok(!SOKRATES.prologi.levy, 'prologissa ei taustalevyä');
  assert.ok(SOKRATES.prologi.valot.every((v) => v.keila <= 30), 'vain kapeat reunavalot');
  assert.deepEqual(Object.keys(SOKRATES.aani), ['puhe', 'musiikki']);
  const tyokalu = lue('../tools/ajattelija-aaniraita.mjs');
  assert.match(tyokalu, /const VAIMENNUS = \{ alku: Number\(arvo\('--vaimennus', 17\.5\)\), taso: 0\.22, ramppi: 2 \};/);
  assert.match(tyokalu, /silmukka: \[66\.0, 80\.0\],/);
  assert.doesNotMatch(tyokalu, /gymnopedie/i, 'Satie pois');
  const pr = lue('../js/linssit/ajattelija-projektori.js');
  assert.match(pr, /texture2D\( normalMap, vNormalMapUv, -0\.75 \)/);
  assert.match(pr, /export const KIPSI_TOISTOT = \[28\.5, 95\.0\];/);
  assert.match(lue('../js/linssit/ajattelija.js'), /kohtaus\.background = mustaVari;/);
});

test('kaikukuvat ovat positiivisia (omistaja 2.10.2026 klo 11.13): sotilas v2 ilman kääntöä', () => {
  assert.equal(SOKRATES.kaiku.kuva, 'ajattelijat/sokrates/v1/kaiku-sotilas-v2.png');
});

test('PULU kierroksen lopussa: pohja, lämmin lasi, viisi kysymystä, kortti lapun ja ✕:n välissä', () => {
  const js = lue('../js/linssit/ajattelija.js');
  assert.match(js, /luoPohjaPulu\(\{ luokka: 'tk', teema: 'lasi', aihe: a\.nimi, kysymykset: a\.pulunKysymykset \}\)/);
  assert.match(js, /pulu\.kulma\.style\.setProperty\('--tk-pulu-tila'/);
  assert.match(js, /pulu\?\.tuhoa\(\);/);
  assert.match(lue('../js/pohjat/pohjat.js'), /const POHJA_EI_OHINAPAUTUS = '[^']*\.tk-pulukulma/);
  assert.match(lue('../css/pohjat/pulu.css'), /max-height: min\(62vh, 500px, var\(--tk-pulu-tila, 100vh\)\);/);
});

test('ajattelijat ovat dataa: jokainen rekisterin ajattelija kelpaa, moottori ei tunne nimiä', async () => {
  const { tarkistaAjattelija } = await import('../js/linssit/ajattelija.js');
  for (const [tunnus, a] of Object.entries(AJATTELIJAT)) {
    assert.deepEqual(tarkistaAjattelija(a), [], `${tunnus}: puuttuvat kentät`);
    assert.equal(a.tunnus, tunnus);
  }
  assert.ok(tarkistaAjattelija({ tunnus: 'x' }).length > 5, 'tyhjä data ei kelpaa');
  const moottori = lue('../js/linssit/ajattelija.js').replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');
  assert.doesNotMatch(moottori.replace(/import \{ SOKRATES \}[^\n]*\n|sokrates: SOKRATES/g, ''), /38a|sokrates|Sokrates/);
});

test('Marcus Aurelius pelkkänä datana: Itselleen 10.16, kaksirivinen nimi, sadeihmeen kaiku, Eroica CC0', async () => {
  const { MARCUS } = await import('../js/linssit/ajattelija-marcus.js');
  assert.equal(MARCUS.paalauseet[MARCUS.kierros.paalause].viite, 'Marcus Aurelius, Itselleen 10.16');
  assert.deepEqual(MARCUS.nimiRivit, ['MARCUS', 'AURELIUS']);
  assert.equal(MARCUS.kaiku.kuva, 'ajattelijat/marcus/v1/kaiku-sade.png');
  assert.match(MARCUS.kaiku.nimeaminen, /Nico Kokkonen, CC BY 3.0/);
  assert.equal(MARCUS.taustavirta.rivit.length, 20);
  assert.equal(MARCUS.prologi, SOKRATES.prologi, 'vakioaloitus on yhteinen');
  const tyokalu = lue('../tools/ajattelija-aaniraita.mjs');
  assert.match(tyokalu, /marcus: \{[\s\S]*?eroica-marcia-funebre-musopen\.ogg[\s\S]*?osat: \[\[75\.48, 75\.48 \+ 48\.333\]\]/);
  const js = lue('../js/linssit/ajattelija.js');
  assert.match(js, /\} else if \(!kk \|\| r <= T\.kaiku\[0\]\) \{/, 'ilman kaikua kaari jatkuu pitoon');
  assert.match(js, /if \(!a\.pulunKysymykset\?\.length\) return;/);
});

test('tekijätiedot: CC BY -kuva ja -musiikki nimettyinä, three.js ja bystit (js/lahteet.js)', () => {
  const l = lue('../js/lahteet.js');
  assert.match(l, /tekija: 'Nico Kokkonen, Wikimedia Commons \(Column_of_Marcus_Aurelius_-_detail2\.jpg\)',\n\s*lisenssi: 'CC BY 3\.0',/);
  assert.match(l, /tekija: 'Sascha Ende, filmmusic\.io',\n\s*lisenssi: 'CC BY 4\.0',/);
  assert.match(l, /three\.js r185 ja GLTFLoader/);
  assert.match(l, /KAS635\) ja Marcus Aurelius \(KAS979\)/);
});

test('atlas: toistorivi piirretään koko atlaksen leveydelle (kaikki laatat), tavallinen rivi omalle leveydelleen', () => {
  const rajat = [];
  const ctx = {
    measureText: (t) => ({ width: t.length * 10 }), fillRect() {}, save() {}, restore() {}, beginPath() {}, clip() {},
    fillText() {}, rect: (x, y, w) => rajat.push(w),
  };
  const doc = { createElement: () => ({ getContext: () => ctx }) };
  const { paikat } = piirraAtlas([
    { teksti: 'ΓΝΩΘΙ ΣΑΥΤΟΝ', fontti: 'serif', korkeus: 64, toisto: true },
    { teksti: 'Sokrates', fontti: 'serif', korkeus: 64 },
  ], doc);
  assert.ok(paikat[0].toistoja > 1);
  assert.equal(rajat[0], 4096);
  assert.equal(rajat[1], paikat[1].lev);
});

test('atlas: liian pitkä toistorivi pienennetään mahtumaan yhteen laattaan', () => {
  const ctx = {
    font: '', measureText(t) { return { width: t.length * Number(/(\d+)px/.exec(this.font)[1]) * 0.5 }; },
    fillRect() {}, save() {}, restore() {}, beginPath() {}, clip() {}, fillText() {}, rect() {},
  };
  const doc = { createElement: () => ({ getContext: () => ctx }) };
  const { paikat } = piirraAtlas([{ teksti: 'α'.repeat(240), fontti: 'serif', korkeus: 96, toisto: true }], doc);
  assert.equal(paikat[0].toistoja, 1);
  assert.ok(240 * paikat[0].em * 0.5 + 3 * paikat[0].em <= 4096 + 1);
});

test('Sokrateen taustavirta: 20 riviä Sisältökirjurilta, kreikan OFL-fontit ämpäristä', () => {
  const rivit = SOKRATES.taustavirta.rivit;
  assert.equal(rivit.length, 20);
  assert.equal(rivit.filter(([k]) => k === 'fi').length, 2);
  for (const [, f] of rivit) assert.ok(SOKRATES.fontit[f], f);
  for (const n of ['gentium-plus', 'gfs-didot', 'gfs-solomos']) assert.match(SOKRATES.fontit[n].tiedosto, /^ajattelijat\/fontit\/v1\//);
  assert.match(lue('../js/linssit/ajattelija.js'), /await lataaAjattelijaFontit\(a, tv\.rivit\.map/);
});

test('Marcus: elämä-lappu ja Pulun viisi kysymystä (Sisältökirjuri 2.10.)', async () => {
  const { MARCUS } = await import('../js/linssit/ajattelija-marcus.js');
  assert.equal(MARCUS.elama.otsikko, 'Marcus Aureliuksen elämä');
  assert.equal(MARCUS.elama.kappaleet.length, 7);
  assert.equal(MARCUS.pulunKysymykset.length, 5);
  assert.match(lue('../js/linssit/ajattelija.js'), /const kytkinAani = new Audio\(`\$\{R2\}\$\{AJATTELIJA_KYTKIN\}`\);/);
});

test('ääniraita v12: yhtenäinen puhe (--puhe, --puhe-alku) vaimentaa musiikin puheen ajaksi; musiikki on parametri', () => {
  const tyokalu = readFileSync(new URL('../tools/ajattelija-aaniraita.mjs', import.meta.url), 'utf8');
  assert.match(tyokalu, /const MUSIIKKI = A\.includes\('--musiikki'\) \? resolve\(LAHTEET, arvo\('--musiikki'\)\) : join\(LAHTEET, R\.musiikki\);/);
  assert.match(tyokalu, /const LUENNAT = PUHE \? \[\[PUHE, PUHE_ALKU\]\]/);
  assert.match(tyokalu, /const OSAT = \(V12 && \[\[0, kestoS\(MUSIIKKI\)\]\]\)/);   // koko levytys, ei silmukkaa
  assert.match(tyokalu, /const SILMUKKA = V12 \? null : R\.silmukka;/);
  assert.match(tyokalu, /\$\{V12 \? `apad=whole_dur=\$\{KESTO\},` : ''\}/);
});
