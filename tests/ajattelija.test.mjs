// Ajattelijat-linssi, vaihe 1 (Päätoimittaja 2.10.2026): kehityslippu, laiska kirjasto ja Blender-mallin luvut.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ajattelijaLipusta, kenttaMm, AJATTELIJA_KIRJASTO, AJATTELIJAT } from '../js/linssit/ajattelija.js';
import { SOKRATES } from '../js/linssit/ajattelija-sokrates.js';
import { NAUHA_EM, PROJEKTOREITA_ENINTAAN } from '../js/linssit/ajattelija-projektori.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

test('vain kehityslippu ?ajattelija=sokrates avaa näkymän; tuntematon tai puuttuva ei', () => {
  assert.equal(ajattelijaLipusta('?ajattelija=sokrates'), 'sokrates');
  assert.equal(ajattelijaLipusta('?ajattelija=platon'), null);
  assert.equal(ajattelijaLipusta(''), null);
  assert.deepEqual(Object.keys(AJATTELIJAT), ['sokrates']);
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
  assert.equal(pr.valot.length, 3);
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
  assert.doesNotMatch(lue('../js/linssit/ajattelija-sokrates.js'), /kierros1\.mp3/, 'Straussin sisältävä yhdistelmäraita poistettu ämpäristä');
  assert.match(js, /return e\.suunta\.clone\(\);/, 'auringon avaimia ei saa muuttaa paikallaan');
  const css = lue('../css/pohjat/pinnat/ajattelija.css');
  assert.doesNotMatch(css, /#[0-9a-f]{3,6}\b|rgba?\(|\d+ms/i, 'pinnassa vain tokenit');
  assert.match(css, /font-size: var\(--tk-koko-arkki\);/);
});

test('vaihe 4: KUVANÄKYMÄ-pohja (✕ lasia, veto alas, Esc), lappu NOSTOKORTTI tummana, Pulun viisi kysymystä', () => {
  const js = lue('../js/linssit/ajattelija.js');
  assert.match(js, /luoPohjaKuvanakyma\(\{ nimi: `\$\{a\.nimi\}: ajattelija`/);
  assert.match(js, /luoPohjaNostokortti\(\{ yla: a\.nimi, otsikko: a\.elama\.otsikko, kappaleet: a\.elama\.kappaleet \}, \{ teema: 'tumma' \}\)/);
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
