import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

/*
 * PALLOLAUTA, VAIHE 1 (omistaja 5.9.2026, Raamattu KARTTAPALLO ON
 * PELILAUTA; docs/moduulit/karttapallo.md luku 7). Vartioi vaiheen
 * hyväksymisehdot: (c) yksi kytkin ja yksi vakio, pelitila sama
 * kummallakin laudalla; (b) tasokartta pois tieltä yhdestä portista;
 * kaava leveys ↔ korkeus; ja "kartta laatoissa, peli päällä" — pallolla
 * vain sallitut kerrokset.
 */

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

/* Selaimen varastot ja osoite testiä varten: ui-apurit lukee molempia
 * try/catchin takaa, joten puuttuva on sama kuin tyhjä. */
const varasto = new Map();
globalThis.localStorage = {
  getItem: (k) => (varasto.has(k) ? varasto.get(k) : null),
  setItem: (k, v) => varasto.set(k, String(v)),
  removeItem: (k) => varasto.delete(k),
};
globalThis.location = { search: '' };

const apurit = await import('../js/ui-apurit.js');
const { LAUTA_OLETUS, lautaValinta, asetaLautaValinta, unohdaKehittajaKytkimet } = apurit;
const kamera = await import('../js/pallolauta/kamera.js');
const {
  korkeusLeveydesta, leveysKorkeudesta, PALLO_KORKEUS_MAX, PALLO_KORKEUS_MIN,
  PALLOLAUDAN_SAAPUMISLEVEYS,
} = kamera;
const { PALLOLAUDAN_KERROKSET, kaupunkipisteenVari } = await import('../js/pallolauta/lauta.js');
const { Game } = await import('../js/game.js');
const { packById } = await import('../js/pack.js');
const { PALLO_SUKELLUSLEVEYS } = await import('../js/pallo.js');

test('laudan valinta: URL voittaa muistin, muisti voittaa oletuksen, oletus on pallo', () => {
  assert.equal(LAUTA_OLETUS, 'pallo', 'pallo on oletuslauta (omistaja 5.9.2026: "Ota vanha kartta jo heti kokonaan pois ja korvaa pallolla")');
  unohdaKehittajaKytkimet();
  assert.equal(lautaValinta(), 'pallo');
  // Muisti ohjaa, kun URL ei sano mitään: palautusoptio on vanha kartta.
  asetaLautaValinta('kartta');
  assert.equal(varasto.get('matkakirja-lauta'), 'kartta');
  assert.equal(lautaValinta(), 'kartta');
  // Oletuksen valinta poistaa avaimen: vakion vaihto tavoittaa laitteen.
  asetaLautaValinta('pallo');
  assert.equal(varasto.has('matkakirja-lauta'), false);
  assert.equal(lautaValinta(), 'pallo');
  // URL-parametri voittaa muistin; vieras arvo ohitetaan (katselutilan
  // ?lauta=<laudan id> ei sotke).
  asetaLautaValinta('kartta');
  globalThis.location = { search: '?lauta=pallo' };
  unohdaKehittajaKytkimet();
  assert.equal(lautaValinta(), 'pallo');
  globalThis.location = { search: '?lauta=maailmankartta' };
  unohdaKehittajaKytkimet();
  assert.equal(lautaValinta(), 'kartta', 'tuntematon URL-arvo ei ole laudan valinta');
  // Arvo muistetaan eikä lueta levyltä joka kerta.
  varasto.set('matkakirja-lauta', 'pallo');
  assert.equal(lautaValinta(), 'kartta', 'muistettu arvo pysyy, kunnes joku unohtaa sen');
  unohdaKehittajaKytkimet();
  assert.equal(lautaValinta(), 'pallo');
  globalThis.location = { search: '' };
  asetaLautaValinta('pallo');
  unohdaKehittajaKytkimet();
});

test('sama tallenne latautuu kummallakin laudalla identtiseksi pelitilaksi; pelitila ei tunne lautaa', () => {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
    pack: packById('maailmankartta'),
    seed: 7,
  });
  peli.phase = 'action';
  const tallenne = JSON.stringify(peli.toJSON());
  const lataa = (lauta) => {
    asetaLautaValinta(lauta);
    unohdaKehittajaKytkimet();
    assert.equal(lautaValinta(), lauta);
    return JSON.stringify(Game.fromJSON(JSON.parse(tallenne)).toJSON());
  };
  assert.equal(lataa('kartta'), lataa('pallo'), 'pelitila on sama kummallakin laudalla');
  assert.ok(!/"lauta"|pallolauta/.test(tallenne), 'tallenteessa ei ole laudan valintaa');
  const game = lue('../js/game.js');
  assert.ok(!/lautaValinta|matkakirja-lauta|pallolauta/.test(game), 'js/game.js ei muutu riviäkään (karttapallo.md luku 1)');
  asetaLautaValinta('kartta');
  unohdaKehittajaKytkimet();
});

test('näkyvä leveys ↔ korkeus: suunnitelman kaava, katot ja käänteisyys', () => {
  // korkeus = (leveys · 360/12000) / (2·tan(25°)·180/π) ≈ leveys / 1780.
  const kerroin = 2 * Math.tan((25 * Math.PI) / 180) * (180 / Math.PI);
  assert.ok(Math.abs(kerroin - 53.44) < 0.05, `tasokuvan kerroin ${kerroin}`);
  assert.ok(Math.abs(korkeusLeveydesta(PALLO_SUKELLUSLEVEYS) - 0.348) < 0.348 * 0.05, 'sukellusleveys 620 → ≈ 0,35');
  assert.ok(Math.abs(korkeusLeveydesta(88) - 0.0494) < 0.0494 * 0.05, 'kaupunkiporras 88 → ≈ 0,05');
  assert.equal(korkeusLeveydesta(12000), PALLO_KORKEUS_MAX, 'koko lauta → kaukaisin korkeus');
  assert.equal(korkeusLeveydesta(1), PALLO_KORKEUS_MIN, 'lähin korkeus sidottu laattatarkkuuteen');
  // Suurilla leveyksillä kasvu on yhä tasokuvan mukainen kattoon asti
  // (pallon geometrian kaari ylittää tasokuvan vasta ~150°:ssa, joka on
  // katon 2,5 yläpuolella); 120° = 4000 yksikköä on vielä katon alla.
  const iso = korkeusLeveydesta(4000);
  assert.ok(Math.abs(iso - 4000 / kerroin * (360 / 12000)) < 0.01 && iso < PALLO_KORKEUS_MAX, `120°: ${iso}`);
  assert.equal(korkeusLeveydesta(5200), PALLO_KORKEUS_MAX, '156° ei mahdu: katto');
  assert.ok(korkeusLeveydesta(4000) < korkeusLeveydesta(4400), 'kasvava');
  // Käänteinen tasokuvan alueella ±0,1 %.
  for (const leveys of [88, PALLOLAUDAN_SAAPUMISLEVEYS, PALLO_SUKELLUSLEVEYS, 1500, 3000]) {
    const takaisin = leveysKorkeudesta(korkeusLeveydesta(leveys));
    assert.ok(Math.abs(takaisin - leveys) < leveys * 0.001, `${leveys} → ${takaisin}`);
  }
  // Korkeuden kasvaessa leveys ei koskaan ylitä lautaa.
  assert.ok(leveysKorkeudesta(PALLO_KORKEUS_MAX) <= 12000);
  assert.ok(leveysKorkeudesta(100) <= 12000);
});

test('pallolla vain pelin merkit: sallitut kerrokset lueteltu, kartan kerrokset kiellettyjä', () => {
  assert.deepEqual(PALLOLAUDAN_KERROKSET, ['pointsData', 'htmlElementsData']);
  const kansio = new URL('../js/pallolauta/', import.meta.url);
  const kielletyt = ['labelsData', 'arcsData', 'pathsData', 'ringsData', 'polygonsData', 'hexBinPointsData', 'tilesData', 'customLayerData'];
  for (const nimi of readdirSync(kansio)) {
    const src = readFileSync(new URL(nimi, kansio), 'utf8');
    for (const k of kielletyt) {
      assert.ok(!src.includes(`.${k}(`), `${nimi}: ${k} — pinnoitteen päälle ei piirretä karttaa (Raamattu 5.9.2026)`);
    }
    const kaytetyt = [...src.matchAll(/\.(\w+Data)\(/g)].map((m) => m[1]);
    for (const k of kaytetyt) assert.ok(PALLOLAUDAN_KERROKSET.includes(k), `${nimi}: ${k} ei ole sallittu kerros`);
  }
  // Käydyt ja aloituskaupungit erottuvat muista.
  const kaydyn = kaupunkipisteenVari({ kayty: true, alku: false });
  const alun = kaupunkipisteenVari({ kayty: false, alku: true });
  const muun = kaupunkipisteenVari({ kayty: false, alku: false });
  assert.ok(kaydyn !== muun && alun !== muun && kaydyn !== alun);
  // Kaikki liike animoitua, reduced motion kunnioitetaan.
  const lauta = lue('../js/pallolauta/lauta.js');
  assert.match(lauta, /const siirtyma = ui\.reducedMotion \? 0 : MERKKIEN_SIIRTYMA_MS;/);
  assert.match(lauta, /\.pointsTransitionDuration\(siirtyma\)/);
  assert.match(lauta, /\.htmlTransitionDuration\(siirtyma\)/);
  assert.match(lue('../js/pallolauta/kamera.js'), /if \(ui\?\.reducedMotion \|\| !\(kesto > 0\)\)/);
  // Render-silmukka lepää lehden takana ja piilossa.
  assert.match(lauta, /pallo\.pauseAnimation\?\.\(\)/);
  assert.match(lauta, /attributeFilter: \['open'\]/);
});

test('tasokartta pois tieltä yhdestä portista; kamera kulkee delegaatin kautta', () => {
  const ui = lue('../js/ui.js');
  const kartta = lue('../js/kartta.js');
  // Lepotila ja sen portit (karttapallo.md luku 3).
  assert.match(kartta, /this\.lepotila = false;/);
  assert.match(kartta, /^  nuku\(\) \{/m);
  assert.match(kartta, /^  heraa\(\) \{/m);
  for (const metodi of ['fitViewBox', 'ajastaMannerZoom', 'tarkistaFokusZoom']) {
    const runko = kartta.slice(kartta.indexOf(`\n  ${metodi}() {`));
    assert.ok(runko.slice(0, 400).includes('this.lepotila'), `${metodi}: portti metodin alussa`);
  }
  assert.match(kartta, /if \(this\.ui\.mannerZoom \|\| this\.lepotila\) return;/);
  assert.match(kartta, /if \(this\.lepotila\) return Promise\.resolve\(false\);/, 'ajaKamera raukeaa lepotilassa');
  assert.match(kartta, /const pane = new Proxy\(ruutu, \{/, 'karttaruudun eleet yhdestä portista');
  // ui.render: yksi portti, drawBoardFor ei aja pallolaudalla.
  assert.match(ui, /if \(this\.kartta\.lepotila\) \{\n      this\.paivitaPallolauta\(\);\n    \} else \{\n/);
  assert.match(ui, /if \(this\.pallolautaHalutaan\(\)\) this\.kartta\.lepotila = true;\n    else this\.drawBoardFor\(this\.game\.pack\);/);
  // Delegaatti ja sen käyttö: kartta-oliota ei enää haeta suoraan ajoihin.
  assert.match(ui, /^  kamera\(\) \{\n    return this\.pallolautaPaalla\(\) \? this\.pallolauta\.kamera : this\.kartta;/m);
  assert.ok(!ui.includes('const kartta = this.kartta;'), 'ajot kulkevat this.kamera():n kautta');
  assert.ok((ui.match(/const kartta = this\.kamera\(\);/g) ?? []).length >= 3);
  assert.match(ui, /if \(this\.pallolautaPaalla\(\)\) return this\.pallolauta\.kamera\.nakyvaAlue\(\);/);
  // Liiku avaa linssikartan pallolaudalla; perillä se sulkeutuu.
  assert.match(ui, /if \(this\.liukuAuki && this\.pallolautaPaalla\(\)\) this\.avaaLinssikartta\(\);/);
  assert.match(ui, /^  tarkistaLinssikartta\(\) \{/m);
  // Varapolku: kartta herää vain tälle istunnolle; laitteen valintaa ei
  // kirjoiteta (pallo on oletus — yksi verkoton käynnistys ei saa lukita
  // laitetta vanhaan karttaan).
  assert.doesNotMatch(ui, /asetaLautaValinta\(/);
  assert.match(ui, /this\.pallolautaEpaonnistui = true;/);
  assert.match(ui, /Karttapallo ei latautunut — pelataan kartalla/);
  // Kytkin: ratasvalikon vipu, URL-parametri ja SHELL.
  assert.match(lue('../index.html'), /id="kehittaja-pallolauta-btn"/);
  const main = lue('../js/main.js');
  assert.match(main, /asetaLautaValinta\(halutaan \? 'pallo' : 'kartta'\);/);
  assert.match(main, /osoite\.searchParams\.delete\('lauta'\);/);
  const sw = lue('../sw.js');
  assert.match(sw, /'\.\/js\/pallolauta\/lauta\.js'/);
  assert.match(sw, /'\.\/js\/pallolauta\/kamera\.js'/);
  // Yhden tiedoston versio ei niputa palloa: dynaaminen tuonti kaatuu
  // siellä hallitusti varapolkuun (karttapallo.md luku 6).
  assert.ok(!lue('../tools/build-standalone.mjs').includes('js/pallolauta/'));
  assert.match(ui, /await import\('\.\/pallolauta\/lauta\.js'\)/);
});
