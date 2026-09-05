import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

/*
 * PALLOLAUTA, VAIHEET 1–2 (omistaja 5.9.2026, Raamattu KARTTAPALLO ON
 * PELILAUTA; docs/moduulit/karttapallo.md luku 7). Vartioi vaiheiden
 * hyväksymisehdot: (c) yksi kytkin ja yksi vakio, pelitila sama
 * kummallakin laudalla; (b) tasokartta pois tieltä yhdestä portista;
 * kaava leveys ↔ korkeus; "kartta laatoissa, peli päällä" — pallolla
 * vain sallitut kerrokset; ja vaihe 2: siirrot pallolla yhdellä
 * koreografialla, Liiku ei herätä tasokarttaa.
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
  // Vaihe 2: pisteet (kaupungit, askelhelmet), html-merkit (nappula,
  // kohteet), polut (naapurireitit) ja kaaret (lennot) — täsmälleen nämä.
  assert.deepEqual(PALLOLAUDAN_KERROKSET, ['pointsData', 'htmlElementsData', 'pathsData', 'arcsData']);
  const kansio = new URL('../js/pallolauta/', import.meta.url);
  const kielletyt = ['labelsData', 'ringsData', 'polygonsData', 'hexBinPointsData', 'tilesData', 'customLayerData', 'objectsData', 'heatmapsData'];
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
  assert.match(lue('../js/pallolauta/merkit.js'), /\.htmlTransitionDuration\(siirtyma\)/);
  assert.match(lue('../js/pallolauta/reitit.js'), /\.pathTransitionDuration\(siirtyma\)/);
  assert.match(lue('../js/pallolauta/reitit.js'), /\.arcsTransitionDuration\(siirtyma\)/);
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
  // Vaihe 2: Liiku EI avaa linssikarttaa — siirrot tehdään pallolla, ja
  // linssikartta jää vain linsseille (valitseLinssi).
  const liiku = ui.match(/ {2}vaihdaLiuku\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.doesNotMatch(liiku, /avaaLinssikartta/, 'Liiku herättää yhä tasokartan');
  assert.match(ui, /if \(tunnus && this\.pallolautaPaalla\(\)\) this\.avaaLinssikartta\(\{ linssi: true \}\);/);
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
  for (const nimi of ['lauta', 'kamera', 'merkit', 'reitit', 'siirto']) {
    assert.match(sw, new RegExp(`'\\./js/pallolauta/${nimi}\\.js'`), `${nimi}.js puuttuu SHELListä`);
  }
  // Yhden tiedoston versio ei niputa palloa: dynaaminen tuonti kaatuu
  // siellä hallitusti varapolkuun (karttapallo.md luku 6).
  assert.ok(!lue('../tools/build-standalone.mjs').includes('js/pallolauta/'));
  assert.match(ui, /await import\('\.\/pallolauta\/lauta\.js'\)/);
});

/*
 * VAIHE 2: SIIRROT PALLOLLA (karttapallo.md luku 7, rivi 2). Koreografia
 * on yhdessä paikassa (animatePawnSisalla) ja vain nappulan käsittely
 * haarautuu laudan mukaan kuljettajalle; noppa ja lento haarautuvat
 * samoin; pallo ei enää tuo ui.js:ää (kehäriippuvuus poistui).
 */
test('vaihe 2: siirto haarautuu laudan mukaan kuljettajalle, koreografia pysyy yhtenä', () => {
  const ui = lue('../js/ui.js');
  const siirto = ui.match(/async animatePawnSisalla\([\s\S]*?\n {2}\}\n/)[0];
  // Kuljettaja valitaan laudan mukaan; sama sopimus molemmilla.
  assert.match(ui, /^  nappulanKuljettaja\(player, \{ lento = false \} = \{\}\) \{\n    if \(this\.pallolautaPaalla\(\)\) return this\.pallolauta\.nappulanKuljettaja\(player, \{ lento \}\);\n    return this\.tasokartanKuljettaja\(player\);/m);
  for (const kutsu of ['kuljettaja.nosta()', 'kuljettaja.aseta(from)', 'await kuljettaja.hyppaa(paikka, pos, stepMs)', 'kuljettaja.laske()']) {
    assert.ok(siirto.includes(kutsu), `animatePawnSisalla ei kutsu ${kutsu}`);
  }
  // Musiikin, äänten ja kameran koukut ovat yhä siirrossa TÄSMÄLLEEN
  // entiseen tapaan (musiikin sammutus kahdesti: kuollut peli ja perillä).
  const koukut = {
    'this.aloitaSiirronMusiikki(musiikki)': 1,
    'this.lopetaSiirronMusiikki()': 2,
    'this.ennakoiSiirtoZoomi(': 1,
    'this.aloitaSaattavaKamera(': 1,
    'this.aloitaJalkamatkanAani()': 1,
    "sfx.play(viimeinen ? 'arrive' : 'step')": 1,
    'this.piilotaNoppa()': 1,
  };
  for (const [koukku, maara] of Object.entries(koukut)) {
    assert.equal(siirto.split(koukku).length - 1, maara, `${koukku} ei ole siirrossa ${maara} kertaa`);
  }
  const pallolauta = ['lauta', 'kamera', 'merkit', 'reitit', 'siirto'].map((n) => lue(`../js/pallolauta/${n}.js`)).join('\n');
  for (const koukku of ['aloitaSiirronMusiikki', 'lopetaSiirronMusiikki', 'aloitaJalkamatkanAani', 'sfx.play(', 'ennakoiSiirtoZoomi', 'aloitaSaattavaKamera']) {
    assert.ok(!pallolauta.includes(koukku), `pallolauta kutsuu ${koukku} itse — ui.js:n kutsut kahdentuisivat`);
  }
  // Ennakkozoomi ja saatto eivät vaadi pallolta yleiskuvan porrasta.
  for (const metodi of ['ennakoiSiirtoZoomi', 'aloitaSaattavaKamera']) {
    const alku = ui.search(new RegExp(`^  (?:async )?${metodi}\\(`, 'm'));
    assert.ok(alku > 0, `${metodi} puuttuu`);
    const runko = ui.slice(alku, alku + 900);
    assert.match(runko, /if \(!this\.pallolautaPaalla\(\) && !this\.mannerZoom\) return;/, `${metodi}: pallolla ei ole yleiskuvaa`);
  }
  // Lento: doFly ja mannerlento kertovat kuljettajalle lennosta; pallolla kone.
  assert.ok((ui.match(/MANNER_LENTO_MS, \{ lento: true \}\)/g) ?? []).length >= 2, 'doFly ja mannerlento eivät kerro lennosta');
  assert.match(lue('../js/pallolauta/siirto.js'), /el = lento\n\s+\? koneElementti\(\)\n\s+: nappulaElementti\(/);
  // Noppa: pallolla lähtö on nappulan ruutupiste, lepopaikka ruudulta.
  assert.match(ui, /const from = pallolla\n\s+\? \(this\.pallolauta\.ruutupiste\(player\.pos\) \?\? to\)/);
  assert.match(ui, /if \(!pallolla\) this\.kartta\.merkitseNopanPaikka\(to\);/);
  // Reitit: yksi sääntö (matkareittienValinta), kaksi piirtäjää.
  assert.match(ui, /^  matkareittienValinta\(\) \{/m);
  assert.match(ui, /if \(this\.kartta\.lepotila\) \{ this\.pallolauta\?\.paivita\(\); return; \}/);
  assert.match(lue('../js/pallolauta/reitit.js'), /pointAlong\(reitti\.poly, i \/ askelia\)/, 'helmet eivät ole samalla kaavalla kuin pixelOf');
  assert.match(lue('../js/pallolauta/lauta.js'), /const valinta = ui\.matkareittienValinta\(\);/);
  // Kehäriippuvuus poistui: pallolauta ei tuo ui.js:ää; koreografian
  // luvut tulevat kummallekin laudalle samasta moduulista.
  assert.ok(!pallolauta.includes("from '../ui.js'"), 'js/pallolauta tuo ui.js:ää');
  assert.match(lue('../js/pallolauta/kamera.js'), /import \{ siirtoajonPehmennys \} from '\.\.\/siirtokoreografia\.js';/);
  assert.match(ui, /from '\.\/siirtokoreografia\.js';/);
  // Kohteet napautettavissa: lähin kohde 44 px → doMove; R-malli, ei elementin click.
  const lauta = lue('../js/pallolauta/lauta.js');
  assert.match(lauta, /ui\.doMove\(kohde\.key\)/);
  assert.match(lauta, /const kohde = lahinKohde\(lat, lng\);/);
  assert.match(lue('../css/styles.css'), /\.pallolauta-kohde \{\n  pointer-events: none;/);
  // Kamera seuraa teleporttia, ei siirtoa: kuljettaja kirjaa paikkansa perillä.
  assert.match(lue('../js/pallolauta/siirto.js'), /lauta\.merkitseNappulanPaikka\(perilla\)/);
});
