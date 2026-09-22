/*
 * LEPOPIIRTO (js/pallolauta/lepopiirto.js, sulavuus kohta 18): piirto vain
 * kun jokin muuttui, varmistava syke 4 fps, hitaat animaatiot 15 fps,
 * esteet piirtävät aina, koelippu levovanha.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  LEPOPIIRTO_HIDAS_MS, LEPOPIIRTO_SYKE_MS, asennaLepopiirto, lepopiirtoKaytossa, lepopiirtoPaatos,
} from '../js/pallolauta/lepopiirto.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

test('päätös: kamera, tarve, este, hidas ja syke — muuten ei piirretä', () => {
  const tila = { paalla: true, pakko: 0, tarveAsti: -Infinity, jalki: 0, viimePiirto: 0 };
  assert.equal(lepopiirtoPaatos(tila, { nyt: 10, kameraMuuttui: true }), 'kamera');
  assert.equal(lepopiirtoPaatos(tila, { nyt: 20, kameraMuuttui: false }), null, 'levossa ei piirretä');
  tila.tarveAsti = 100;
  assert.equal(lepopiirtoPaatos(tila, { nyt: 50, kameraMuuttui: false }), 'tarve');
  assert.equal(lepopiirtoPaatos(tila, { nyt: 150, kameraMuuttui: false }), null);
  assert.equal(lepopiirtoPaatos(tila, { nyt: 160, kameraMuuttui: false, este: true }), 'este');
  // Hidas animaatio: 15 fps, ei 60.
  tila.viimePiirto = 200;
  assert.equal(lepopiirtoPaatos(tila, { nyt: 230, kameraMuuttui: false, hidas: true }), null);
  assert.equal(lepopiirtoPaatos(tila, { nyt: 200 + LEPOPIIRTO_HIDAS_MS, kameraMuuttui: false, hidas: true }), 'hidas');
  // Syke: 4 fps vaikka mikään ei ilmoita.
  assert.equal(lepopiirtoPaatos(tila, { nyt: 200 + LEPOPIIRTO_SYKE_MS - 1, kameraMuuttui: false }), null);
  assert.equal(lepopiirtoPaatos(tila, { nyt: 200 + LEPOPIIRTO_SYKE_MS, kameraMuuttui: false }), 'syke');
  // Pakko kuluu kerran; jälkikehys kuluu kerran.
  tila.pakko = 1;
  assert.equal(lepopiirtoPaatos(tila, { nyt: 300, kameraMuuttui: false }), 'pakko');
  tila.jalki = 1;
  assert.equal(lepopiirtoPaatos(tila, { nyt: 301, kameraMuuttui: false }), 'jalki');
  assert.equal(lepopiirtoPaatos(tila, { nyt: 302, kameraMuuttui: false }), null);
  tila.paalla = false;
  assert.equal(lepopiirtoPaatos(tila, { nyt: 303, kameraMuuttui: false }), 'pois');
  assert.equal(lepopiirtoKaytossa('?koe=levovanha'), false);
  assert.equal(lepopiirtoKaytossa('?koe=mittaus'), true);
  // Automaatio ajaa saman polun kuin pelaaja: ei webdriver-poikkeusta (välke 22.9.2026).
  assert.equal(lepopiirtoKaytossa(''), true);
});

test('asennus: levossa kirjaston silmukka pysäytetään, muutos herättää sen', () => {
  /*
   * VÄLKKEEN KORJAUS (22.9.2026): portti on kirjaston silmukassa, ei
   * renderissä — ohitetulla kehyksellä tickiä ei ajeta lainkaan, joten
   * kangasta ei kosketa. Malli jäljittelee kirjastoa: `resumeAnimation`
   * ajaa syklin heti ja jättää silmukan päälle, `pauseAnimation`
   * peruu sen oman kehyspyynnön.
   */
  let aika = 1000;
  const jono = [];
  const ikkuna = {
    performance: { now: () => aika },
    requestAnimationFrame: (cb) => jono.push(cb),
    cancelAnimationFrame: () => { jono.length = 0; },
  };
  let piirtoja = 0;
  let kay = true;
  const camera = { matrixWorld: { elements: new Array(16).fill(0) }, projectionMatrix: { elements: new Array(16).fill(1) } };
  const renderer = { render() { piirtoja += 1; }, getContext: () => ({ drawingBufferWidth: 100, drawingBufferHeight: 200 }) };
  const pallo = {
    renderer: () => renderer,
    camera: () => camera,
    resumeAnimation() { if (!kay) { kay = true; renderer.render({}, camera); } },
    pauseAnimation() { kay = false; },
  };
  const pura = asennaLepopiirto(pallo, { ikkuna });
  const kehys = (dt = 16) => {
    aika += dt;
    const kirjastonVuoro = kay;
    for (const cb of jono.splice(0)) cb();
    // Kirjaston oma kehyspyyntö tälle kehykselle, jos sitä ei peruttu.
    if (kirjastonVuoro && kay) renderer.render({}, camera);
  };
  kehys(); assert.equal(piirtoja, 1, 'ensimmäinen kehys piirretään');
  kehys(); assert.equal(piirtoja, 2, 'jälkikehys');
  kehys(); kehys();
  assert.equal(piirtoja, 2, 'paikallaan ei piirretä');
  assert.equal(kay, false, 'levossa kirjaston silmukka on pysäytetty');
  camera.matrixWorld.elements[12] = 5;
  kehys(); assert.equal(piirtoja, 3, 'kamera liikkui → sykli heti');
  assert.equal(kay, true, 'silmukka jäi päälle');
  kehys(); assert.equal(piirtoja, 4, 'jälkikehys');
  kehys(); assert.equal(piirtoja, 4, 'ja sitten lepo');
  pallo.__piirto.tarvitaan();
  kehys(); assert.equal(piirtoja, 5, 'ilmoitettu tarve');
  pallo.__piirto.tarvitaan(100);
  for (let i = 0; i < 7; i += 1) kehys();
  assert.ok(piirtoja >= 11, `häiveen ajan joka kehys (${piirtoja})`);
  const ennen = piirtoja;
  for (let i = 0; i < 20; i += 1) kehys(16);
  assert.ok(piirtoja - ennen <= 3, `syke 4 fps: ${piirtoja - ennen} piirtoa 320 ms:ssä`);
  const t = pallo.__piirto.tila();
  assert.ok(t.ohitettuja > 10 && t.syyt.kamera >= 2);
  // Uni (lehti auki, sivu taustalla): kello seisoo eikä silmukkaa herätetä.
  pallo.__piirto.uni(true);
  assert.equal(jono.length, 0, 'uni pysäyttää oman kellon');
  assert.equal(kay, false);
  const uninen = piirtoja;
  pallo.__piirto.uni(false);
  kehys();
  assert.ok(piirtoja > uninen, 'herätys piirtää');
  pura();
  assert.equal(renderer.render.name, 'render');
  assert.equal(pallo.__piirto, undefined);
  assert.equal(kay, true, 'purku jättää silmukan pyörimään');
});

test('kytkennät: lauta asentaa, häiveet ja nimiöt ilmoittavat, savuke pakottaa', () => {
  const lauta = lue('../js/pallolauta/lauta.js');
  assert.match(lauta, /lepopiirtoKaytossa\(\) \? asennaLepopiirto\(pallo, \{/);
  assert.match(lauta, /LEVON_ESTEET\.some\(/);
  assert.match(lauta, /hitaat: \(\) => sykkiiNyt\(\)/);
  assert.match(lauta, /sykkiiNyt = \(\) => Boolean\(glSovitin\?\.sykkii\?\.\(\)\);/);
  assert.match(lauta, /ryhma\[nimi\] = function ryhmanMuutos/);
  // Uni kulkee lepopiirron kautta: kirjaston silmukalla on yksi omistaja.
  assert.match(lauta, /if \(pallo\.__piirto\) pallo\.__piirto\.uni\(false\);\n\s*else pallo\.resumeAnimation\?\.\(\);/);
  assert.match(lauta, /if \(pallo\.__piirto\) pallo\.__piirto\.uni\(true\);\n\s*else pallo\.pauseAnimation\?\.\(\);/);
  assert.match(lue('../js/pallolaatat.js'), /pallo\.__piirto\?\.tarvitaan\(\); \/\/ lepopiirto: häiveen askel näkyviin/);
  assert.match(lue('../js/pallovektorit.js'), /pallo\.__piirto\?\.tarvitaan\(\); \/\/ lepopiirto: häiveen askel näkyviin/);
  const gl = lue('../js/pallonimiot-gl.js');
  assert.match(gl, /const likaa = \(\) => \{ likainen = true; pallo\?\.__piirto\?\.tarvitaan\(\); \};/);
  assert.doesNotMatch(gl.replace('let likainen = true;', '').replace('likainen = true; pallo', ''), /(?<![\w.])likainen = true;/, 'kaikki likaukset kulkevat likaa():n kautta');
  const sovitin = lue('../js/pallolauta/glnimiot-sovitin.js');
  assert.equal((sovitin.match(/ilmoitaHaivytys\(\);/g) ?? []).length, 4);
  assert.match(sovitin, /sykkii\(\) \{/);
  assert.match(lue('../tools/savukkeet/savuke-laattaohjelmat.mjs'), /pallo\.__piirto\?\.pakota\?\.\(\); r\.render\(scene, kam\);/);
});

test('atlaksen osittainen päivitys (sulavuus kohta 8): viedyn sivun rasteri texSubImage2D:llä, ei koko kangasta', () => {
  const gl = lue('../js/pallonimiot-gl.js');
  assert.match(gl, /if \(sivu\.viety && !atlasKoko && typeof renderer\?\.copyTextureToTexture === 'function'\)/);
  assert.match(gl, /if \(renderer\.copyTextureToTexture\.length >= 3\) renderer\.copyTextureToTexture\(kohta, lahde, sivu\.tekstuuri\);\n\s*else renderer\.copyTextureToTexture\(lahde, sivu\.tekstuuri, null, kohta\);/);
  assert.match(gl, /s\.tekstuuri\.needsUpdate = true; s\.likainen = false; s\.viety = true;/);
  assert.match(gl, /includes\('atlaskoko'\)/, 'koelippu palauttaa koko kankaan viennin');
});
