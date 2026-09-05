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
  // LINSSIT 5.9.2026 (karttapallo.md luku 10, aalto 1A): monikulmiot
  // (polygonsData) tulivat listalle LINSSIN kerroksena — peli ei piirrä
  // sinne mitään, ja kerros on tyhjä aina kun linssiä ei ole päällä.
  assert.deepEqual(PALLOLAUDAN_KERROKSET, ['pointsData', 'htmlElementsData', 'pathsData', 'arcsData', 'polygonsData']);
  const kansio = new URL('../js/pallolauta/', import.meta.url);
  const kielletyt = ['labelsData', 'ringsData', 'hexBinPointsData', 'tilesData', 'customLayerData', 'objectsData', 'heatmapsData'];
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
  // Aalto 1D: myös avausnäkymä on pallolla, joten lepotila alkaa jo
  // lähtövalinnassa (etusivunPalloKaytossa) eikä vasta pelin laudasta.
  assert.match(ui, /if \(this\.pallolautaHalutaan\(\) \|\| this\.etusivunPalloKaytossa\(\)\) this\.kartta\.lepotila = true;\n    else this\.drawBoardFor\(this\.game\.pack\);/);
  // Delegaatti ja sen käyttö: kartta-oliota ei enää haeta suoraan ajoihin.
  assert.match(ui, /^  kamera\(\) \{\n    return this\.pallolautaPaalla\(\) \? this\.pallolauta\.kamera : this\.kartta;/m);
  assert.ok(!ui.includes('const kartta = this.kartta;'), 'ajot kulkevat this.kamera():n kautta');
  assert.ok((ui.match(/const kartta = this\.kamera\(\);/g) ?? []).length >= 3);
  assert.match(ui, /if \(this\.pallolautaPaalla\(\)\) return this\.pallolauta\.kamera\.nakyvaAlue\(\);/);
  // Vaihe 2: Liiku EI avaa linssikarttaa — siirrot tehdään pallolla, ja
  // linssikartta jää vain linsseille (valitseLinssi).
  const liiku = ui.match(/ {2}vaihdaLiuku\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.doesNotMatch(liiku, /avaaLinssikartta/, 'Liiku herättää yhä tasokartan');
  // Aalto 1A: pallolle käännetty linssi ei avaa kuorta lainkaan
  // (tests/pallolinssit.test.mjs vartioi sopimuksen).
  assert.match(ui, /if \(tunnus && this\.pallolautaPaalla\(\) && !pallolle\) this\.avaaLinssikartta\(\{ linssi: true \}\);/);
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
  for (const nimi of ['lauta', 'kamera', 'merkit', 'nimet', 'nostot', 'reitit', 'siirto']) {
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
  const pallolauta = ['lauta', 'avaus', 'kamera', 'merkit', 'nimet', 'nostot', 'reitit', 'siirto'].map((n) => lue(`../js/pallolauta/${n}.js`)).join('\n');
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
  assert.match(lue('../js/pallolauta/lauta.js'), /const valinta = lento \? lento\.valinta : ui\.matkareittienValinta\(\);/);
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

/*
 * VAIHE 6: PELAAJAN LAUTAKYTKIN (omistaja 5.9.2026, sanatarkasti:
 * *"pelissä periaatteessa voisi olla lopulta kytkin, millä pelaaja voisi
 * valita haluaako pelata pallonäkymässä vai sillä meidän vanhalla
 * kartalla sitten kun ollaan saatu pallo toimimaan."* — karttapallo.md
 * luku 0 kohta 4 ja luku 7 rivi 6). Vartioi, että valinta on PELAAJAN
 * asetusvalikossa (ei kehittäjätilassa), käyttää samaa avainta ja samaa
 * kaavaa kuin ratasvalikon vipu, ja että oletus on pallo.
 */
test('vaihe 6: pelaajan asetusrivi on päävalikossa, samalla avaimella ja samalla kaavalla', () => {
  const html = lue('../index.html');
  const main = lue('../js/main.js');
  // Rivi on PELAAJAN valikossa (#paavalikko), ei kehittäjävalikossa.
  const paavalikko = html.slice(html.indexOf('id="paavalikko"'), html.indexOf('id="kehittaja-kotelo"'));
  assert.ok(paavalikko.includes('id="lauta-valikko"'), 'lauta-valikko puuttuu päävalikosta');
  assert.ok(paavalikko.includes('id="lauta-vihje"'), 'vaihdon vihjerivi puuttuu');
  assert.match(paavalikko, /<p class="valikko-otsikko">Pelilauta<\/p>/);
  // Asu tulee ääniasetusten riveistä: sama valikko, sama typografia.
  assert.match(paavalikko, /class="kertoja-valikko lauta-valikko"/);
  const kehittaja = html.slice(html.indexOf('id="kehittaja-valikko"'), html.indexOf('id="paavalikko"'));
  assert.ok(!kehittaja.includes('lauta-valikko'), 'pelaajan rivi ei kuulu kehittäjävalikkoon');
  assert.ok(html.includes('id="kehittaja-pallolauta-btn"'), 'kehittäjävipu jää paikalleen');
  // Kaksi vaihtoehtoa, pallo ensin (oletus).
  const rivit = [...main.matchAll(/avain: '(pallo|kartta)',\n\s+nimi: '([^']+)'/g)].map((m) => [m[1], m[2]]);
  assert.deepEqual(rivit, [['pallo', 'Karttapallo'], ['kartta', 'Vanha kartta']]);
  // Sama avain ja sama kaava kuin vivulla: asetaLautaValinta + ?lauta= pois
  // + sivun lataus. Rivi ei kirjoita omaa avainta eikä koske tallenteeseen.
  const kytkin = main.slice(main.indexOf('const LAUTAKYTKIMET'), main.indexOf('// --- päävalikko'));
  assert.match(kytkin, /asetaLautaValinta\(lauta\);/);
  assert.match(kytkin, /osoite\.searchParams\.delete\('lauta'\);/);
  assert.match(kytkin, /location\.href = osoite\.href;/);
  assert.match(kytkin, /Vaihdetaan lautaa…/);
  assert.ok(!/localStorage|matkakirja-save/.test(kytkin), 'rivi ei kirjoita varastoa itse eikä koske tallennukseen');
  assert.equal((main.match(/asetaLautaValinta\(/g) ?? []).length, 2, 'valinnan kirjoittaa vain asetusrivi ja vipu');
});

test('vaihe 6: valinta on laitteen asetus — sama avain molemmilla kytkimillä, oletus poistaa avaimen', () => {
  unohdaKehittajaKytkimet();
  // Pelaajan rivi ja ratasvalikon vipu kirjoittavat saman avaimen.
  asetaLautaValinta('kartta');
  assert.equal(varasto.get('matkakirja-lauta'), 'kartta');
  unohdaKehittajaKytkimet();
  assert.equal(lautaValinta(), 'kartta');
  // Paluu palloon (oletus) poistaa avaimen — eikä jätä laitetta puolitilaan.
  asetaLautaValinta('pallo');
  assert.equal(varasto.has('matkakirja-lauta'), false);
  unohdaKehittajaKytkimet();
  assert.equal(lautaValinta(), LAUTA_OLETUS);
  // Turvatilan kaatumislaskuri nollautuu, kun pallo valitaan itse.
  varasto.set('matkakirja-pallo-kaatumiset', '2');
  asetaLautaValinta('pallo');
  assert.equal(varasto.has('matkakirja-pallo-kaatumiset'), false, 'pallon valinta nollaa turvatilalaskurin');
  // Kartalle vaihtaessa laskuriin ei kosketa (turvatila on pallon asia).
  varasto.set('matkakirja-pallo-kaatumiset', '2');
  asetaLautaValinta('kartta');
  assert.equal(varasto.get('matkakirja-pallo-kaatumiset'), '2');
  varasto.delete('matkakirja-pallo-kaatumiset');
  asetaLautaValinta('pallo');
  unohdaKehittajaKytkimet();
});

/*
 * VAIHE 5b: ALOITUSLENTO PALLOLLA (karttapallo.md luku 4 rivi
 * "Aloituslento Lontoosta", luku 7 vaihe 5).
 *
 * Uusi peli pallolaudalla lentää Lontoosta aloituskaupunkiin PALLOLLA:
 * kaari ja kone ovat vaiheen 2 lennon omat, niukkuusharso on pallon oma
 * kalvo, ja avauksen koreografia — arkki, kertoja, kabiiniääni,
 * repliikki, ohitus, saapumiskortti — pysyy YHDESSÄ paikassa
 * (aloituslentoSisalla) kummallekin laudalle. Nämä vartiot ovat
 * lähdekoodista, koska kahdennus ei näkyisi virheenä: peli vain
 * lukisi repliikin kahdesti tai lentäisi kaksi konetta.
 */
test('vaihe 5b: aloituslento pallolla — pallo ottaa laudan ja kohtaus delegoidaan', () => {
  const ui = lue('../js/ui.js');
  // 1. Pallolauta ei enää odota aloituslennon loppumista; ainoa vaihe-
  //    ehto on aloitusnäyttö (pickstart).
  const halutaan = ui.match(/^ {2}pallolautaHalutaan\(\) \{[\s\S]*?\n {2}\}/m)[0];
  assert.doesNotMatch(halutaan, /aloituslentoKesken/,
    'pallolauta odottaa yhä aloituslennon loppumista');
  // Aalto 3A: lähtövalinta on pallolla, joten pickstart ei enää sulje
  // palloa pois — se odottaa napin nostamaa aloitusZoom-lippua, ja
  // muissa vaiheissa portti on laudan pakka.
  assert.match(halutaan, /if \(this\.game\.phase === 'pickstart'\) return this\.aloitusvalintaPallolla;/);
  assert.match(halutaan, /return this\.game\.pack\?\.id === 'maailmankartta';/);
  // 2. Tasokartta nukkuu ENNEN actionPickStartia, jottei maailmankartta
  //    ehdi piirtyä eikä pyramidi pyytää yhtään laattaa arkin takana.
  assert.match(ui, /if \(kartalento && this\.aloituslentoPallolla\(\)\) this\.kartta\.nuku\(\);/);
  assert.match(ui, /^ {2}aloituslentoPallolla\(\) \{[\s\S]*?return lautaValinta\(\) === 'pallo';/m);
  // 3. Kohtaus delegoidaan laudalle samalla mallilla kuin kuljettaja.
  assert.match(ui, /^ {2}aloituslennonKohtaus\(\{ lahto, kohde \}\) \{\n {4}if \(this\.pallolautaPaalla\(\)\) \{\n {6}return this\.pallolauta\.aloituslennonKohtaus\(\{ lahto, kohde \}\);\n {4}\}\n {4}return this\.tasokartanLentokohtaus\(/m);
  // 4. Koreografia ei kahdennu: lennon tekstit, äänet, kertoja, ohitus
  //    ja saapumiskortti ovat yhä VAIN aloituslentoSisalla-metodissa.
  const lento = ui.match(/async aloituslentoSisalla\([\s\S]*?\n {2}\}\n/)[0];
  for (const koukku of ['this.lueLennonRepliikki();', 'this.showFlightLine(line, alaosa)',
    'this.syncAmbience();', 'this.naytaSaapumiskortti(kohde)', 'this.saapumisenKuplat(kohde)']) {
    assert.ok(lento.includes(koukku), `${koukku} ei ole avauslennon koreografiassa`);
  }
  const avaus = lue('../js/pallolauta/avaus.js');
  for (const koukku of ['lueLennonRepliikki', 'showFlightLine', 'naytaSaapumiskortti',
    'saapumisenKuplat', 'aloitusverho', 'syncAmbience']) {
    assert.ok(!avaus.includes(koukku), `pallon kohtaus tekee itse ${koukku} — koreografia kahdentuisi`);
  }
  // 5. Kohtauksen sopimus: rajaus, valmistele, rakenna, lenna, poistuma, pura.
  for (const kutsu of ['kohtaus.valmistele();', 'kohtaus.rakenna();',
    'kohtaus.lenna(lennonKesto)', 'kohtaus.poistuma();', 'kohtaus.pura();']) {
    assert.ok(lento.includes(kutsu), `aloituslentoSisalla ei kutsu ${kutsu}`);
  }
  for (const nimi of ['valmistele()', 'rakenna()', 'lenna(kesto)', 'poistuma()', 'pura()']) {
    assert.ok(avaus.includes(nimi), `pallon kohtaus ei täytä sopimusta: ${nimi}`);
  }
  // Rajaus on kentta (lyhennysmuoto kelpaa: se lasketaan nyt etukateen,
  // koska avauslennolla on oma marginaali ja pyorinnan siirto).
  assert.match(avaus, /^ {4}rajaus(,|:)$/m, 'pallon kohtaus ei täytä sopimusta: rajaus');
  // 6. Kamera-ajo kulkee laudan delegaatin kautta (ui.kamera()).
  assert.match(lento, /await this\.kamera\(\)\.ajaKamera\(\n {6}rajaus,/);
});

test('vaihe 5b: kone on vaiheen 2 kuljettaja, kaari vaiheen 2 kaari', () => {
  const avaus = lue('../js/pallolauta/avaus.js');
  const siirto = lue('../js/pallolauta/siirto.js');
  // Kuljettaja pyydetään samalla sopimuksella kuin siirrossa.
  assert.match(avaus, /kuljettaja = ui\.nappulanKuljettaja\(ui\.game\.player, \{ lento: true \}\);/);
  for (const kutsu of ['kuljettaja.nosta();', 'kuljettaja.aseta(lahtoPos);',
    'kuljettaja.hyppaa(lahtoPos, kohdePos, kesto)', 'kuljettaja?.laske();']) {
    assert.ok(avaus.includes(kutsu), `avauslento ei kutsu kuljettajalta ${kutsu}`);
  }
  // Ohitus vie rAF-lennon loppuun samalla sanalla kuin selaimen animaation
  // — ja päättää samalla kasvavan jäljen (5.9.2026).
  assert.match(avaus, /finish: \(\) => \{\n\s+paataJalki\(\);\n\s+kuljettaja\?\.paata\?\.\(\);/);
  assert.match(siirto, /^ {4}paata: \(\) => \{/m);
  // Rajaus on sama laatikko kuin kuljettajan omalla ajolla, mutta
  // avauksessa TIUKEMPI marginaali ja puoli pyörintää lännemmäs
  // (omistaja 5.9.2026: zoom lähemmäs + hidas pyörintä).
  assert.match(siirto, /^export function lennonRajaus\(board, a, b\) \{/m);
  assert.match(avaus, /const bbox = lennonRajaus\(board, lahtoPos, kohdePos\);/);
  assert.match(avaus, /marginaali: AVAUSLENNON_RAJAUKSEN_MARGINAALI,/);
  assert.match(siirto, /\{ bbox: lennonRajaus\(board, a, b\), marginaali: LENNON_RAJAUKSEN_MARGINAALI \}/);
  // Kaari on reittikerroksen arcsData, ei uusi kerros.
  const lauta = lue('../js/pallolauta/lauta.js');
  assert.ok(!PALLOLAUDAN_KERROKSET.includes('objectsData') && PALLOLAUDAN_KERROKSET.includes('arcsData'),
    'avauslento ei saa tarvita uutta Globe.gl-kerrosta');
  assert.match(avaus, /ui\.lentoKaari = \{ a: lahto\.id, b: kohde\.id \};/);
  // Niukkuus: ei nappulaa, ei kohteita, ei nostoja, kaksi nimeä, harso.
  assert.match(lauta, /merkit\.paivita\(\{ nappula: liikkuu \|\| lento \? null : kohta, kohteet \}\);/);
  assert.match(lauta, /const kohteet = lento \? \[\] : kohdevalinta\(\);/);
  assert.match(lauta, /katto: lento \? 0 : Math\.min\(NOSTOJEN_KATTO/);
  assert.match(lauta, /harso\.className = 'pallolauta-harso';/);
  // Harso on CSS-kalvo eikä toista WebGL-kontekstia (karttapallo.md luku 4).
  assert.ok(!lauta.includes('objectsData'), 'harso lisäisi three.js-objektin');
  assert.match(lue('../css/styles.css'), /\.pallolauta-harso \{\n {2}position: absolute;/);
  // Kamera ei sukella nappulan perään lennon aikana (peli on jo perillä).
  assert.match(lauta, /if \(!liikkuu && !lento && pos\) \{/);
});

test('matkakirja on vasemmassa ylänurkassa myös pallolla (omistaja 5.9.2026)', () => {
  const lauta = lue('../js/pallolauta/lauta.js');
  assert.match(lauta, /ui\.factCard\.dataset\.corner = 'tl';/);
  assert.match(lue('../index.html'), /class="card fact-card" data-corner="tl"/, 'HTML:n oletusnurkka on sama kuin kartan päätös');
});

test('päiväkirja on laatikossa ja kutistuu vedosta myös pallolla (omistaja 5.9.2026)', () => {
  const lauta = lue('../js/pallolauta/lauta.js');
  assert.match(lauta, /doc\.body\.classList\.add\('pallolauta-paalla'\);/);
  assert.match(lauta, /doc\.body\.classList\.remove\('pallolauta-paalla'\);/);
  assert.match(lauta, /ui\.asetaPaivakirjanKoko\?\.\(true\);/);
  const css = lue('../css/styles.css');
  assert.match(css, /body\.pallolauta-paalla \.fact-card::before \{/);
  assert.match(css, /body\.pallolauta-paalla \.fact-card\.pieni::before \{ opacity: 0; \}/);
});

/*
 * ══════════════════════════════════════════════════════════════════
 * AVAUSLENNON KOLME TILAUSTA (omistaja 5.9.2026 klo 23.10)
 * ══════════════════════════════════════════════════════════════════
 *
 * Työpöytäkaappauksesta avauslennolta (Lontoo → Ateena), sanatarkasti:
 * *"lentokone saisi tehdä saman paksun viivan kuin etusivulla. näkymä
 * saisi olla zoomautunut hieman lähemmäs. pallo voisi pyöriä hitaasti
 * lennon aikana."*
 */
const avausModuuli = await import('../js/pallolauta/avaus.js');
const {
  AVAUSLENNON_RAJAUKSEN_MARGINAALI, AVAUSLENNON_PYORINTA_AST,
  AVAUSLENNON_VIIVAN_PX, pyorinnanPehmennys,
} = avausModuuli;
const siirtoModuuli = await import('../js/pallolauta/siirto.js');
const reittiModuuli = await import('../js/pallolauta/reitit.js');

/** Kameran näkyvä leveys lautayksikköinä (kamera.js kameranKohde). */
const nakyvaLeveys = (bbox, marginaali, ruutuW, ruutuH) => {
  const vara = 1 + 2 * marginaali;
  return Math.max(bbox.w * vara, (bbox.h * vara * ruutuW) / ruutuH);
};
const RUUDUT = [{ nimi: 'työpöytä', w: 1400, h: 900 }, { nimi: 'puhelin', w: 390, h: 844 }];

test('avauslento: zoom lähemmäs, mutta Lontoo ja Ateena pysyvät kuvassa koko pyörinnän ajan', () => {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: 'lontoo' }],
    pack: packById('maailmankartta'),
    seed: 7,
  });
  const { board } = peli;
  const bbox = siirtoModuuli.lennonRajaus(
    board, { type: 'city', city: 'lontoo' }, { type: 'city', city: 'ateena' },
  );
  assert.ok(
    AVAUSLENNON_RAJAUKSEN_MARGINAALI < siirtoModuuli.LENNON_RAJAUKSEN_MARGINAALI,
    'avauslennon rajaus on tiukempi kuin tavallisen lennon',
  );
  const asteina = (yks) => kamera.asteetLeveydesta(yks);
  const bboxAst = asteina(bbox.w);
  assert.ok(Math.abs(bboxAst - 23.86) < 0.2, `Lontoo → Ateena ${bboxAst.toFixed(2)}°`);
  for (const { nimi, w, h } of RUUDUT) {
    const ennen = asteina(nakyvaLeveys(bbox, siirtoModuuli.LENNON_RAJAUKSEN_MARGINAALI, w, h));
    const nyt = asteina(nakyvaLeveys(bbox, AVAUSLENNON_RAJAUKSEN_MARGINAALI, w, h));
    assert.ok(nyt < ennen * 0.92, `${nimi}: zoom ei kiristynyt (${ennen.toFixed(1)}° → ${nyt.toFixed(1)}°)`);
    assert.ok(nyt > ennen * 0.7, `${nimi}: zoom kiristyi liikaa (${ennen.toFixed(1)}° → ${nyt.toFixed(1)}°)`);
    /*
     * PYÖRINTÄ EI SAA VIEDÄ KONETTA KUVASTA. Kone on lennon alussa
     * Lontoossa ja lopussa Ateenassa, ja koska näkymä lähtee puoli
     * pyörintää lännempää ja päätyy puoli pyörintää idemmäs, kummankin
     * pään etäisyys näkymän keskeltä on `bbox/2 + pyörintä/2` — sen on
     * mahduttava puoleen näkymästä.
     *
     * Ruutupikselit mitataan selaimessa (perspektiivi ei ole tasokuva):
     * Chromium 5.9.2026, kotelo 1379 × 826 varaa 183 px, kotelo
     * 374 × 777 kone kuvassa lennon molemmissa päissä (Lontoo x = 115,
     * Ateena x = 356) — kapealla ruudulla parannus, sillä ennen tätä
     * Ateena jäi 11 px kotelon oikean reunan ULKOPUOLELLE koko lennon.
     */
    const puolikas = bboxAst / 2 + AVAUSLENNON_PYORINTA_AST / 2;
    assert.ok(
      puolikas < nyt / 2,
      `${nimi}: kone jää kuvan ulkopuolelle (${puolikas.toFixed(2)}° > ${(nyt / 2).toFixed(2)}°)`,
    );
  }
});

test('avauslento: pallo pyörii hitaasti ja pehmeästi, ei lainkaan reduced motionissa', () => {
  const avaus = lue('../js/pallolauta/avaus.js');
  assert.ok(AVAUSLENNON_PYORINTA_AST >= 3 && AVAUSLENNON_PYORINTA_AST <= 10,
    `pyörintä ${AVAUSLENNON_PYORINTA_AST}° ei ole hidas mutta näkyvä`);
  // Pehmennys: nollasta ykköseen, kasvava, pehmeät päät.
  assert.equal(pyorinnanPehmennys(0), 0);
  assert.equal(pyorinnanPehmennys(1), 1);
  let edellinen = -1;
  for (let t = 0; t <= 1.0001; t += 0.05) {
    const arvo = pyorinnanPehmennys(t);
    assert.ok(arvo > edellinen, `pehmennys ei kasva kohdassa ${t.toFixed(2)}`);
    edellinen = arvo;
  }
  assert.ok(pyorinnanPehmennys(0.05) < 0.05, 'liikkeellelähtö on pehmeä');
  assert.ok(pyorinnanPehmennys(0.95) > 0.95, 'pysähdys on pehmeä');
  // Reduced motion: ei pyörintää eikä lännemmäs siirrettyä rajausta.
  assert.match(avaus, /const pyorinta = ui\.reducedMotion \? 0 : AVAUSLENNON_PYORINTA_AST;/);
  assert.match(avaus, /if \(!ui\.reducedMotion && nyt\) \{/);
  // Ajo on kameran oma (ele keskeyttää sen kuten minkä tahansa ajon).
  assert.match(avaus, /lauta\.kamera\.ajaKamera\(\n\s+\{ lat: nyt\.lat, lng: nyt\.lng \+ AVAUSLENNON_PYORINTA_AST/);
});

test('avauslento: kone piirtää etusivun paksun punaisen viivan, ei uutta kerrosta', () => {
  const avaus = lue('../js/pallolauta/avaus.js');
  const reitit = lue('../js/pallolauta/reitit.js');
  const css = lue('../css/styles.css');
  // Sama sinooperi kuin etusivun viivalla (css .etusivupallo-viiva).
  assert.match(css, /\.etusivupallo-viiva \{[\s\S]*?stroke: #c2452f;/);
  assert.equal(reittiModuuli.REITIN_VARIT.avauslennonJalki, 'rgba(194, 69, 47, 0.92)');
  // Katkoviivakaari jää hennoksi suunnitteluviivaksi viivan alle.
  assert.match(lue('../js/pallolauta/lauta.js'), /kaarenVari: REITIN_VARIT\.avauslennonSuunnitelma,/);
  assert.match(reittiModuuli.REITIN_VARIT.avauslennonSuunnitelma, /rgba\(194, 69, 47, 0\.3\)/);
  /*
   * PAKSUUS ON SAMA LUKU KUIN ETUSIVULLA. Globe.gl:n pathStroke on tässä
   * versiossa RUUTUPIKSELEITÄ (Line2, worldUnits epätosi) eikä asteita —
   * mitattu Chromiumilla 5.9.2026, ks. avaus.js. Siksi luku on sama 11
   * kuin css .etusivupallo-viivan stroke-width, eikä sitä muunneta.
   */
  assert.equal(AVAUSLENNON_VIIVAN_PX, 11, 'sama paksuus kuin etusivun viivalla');
  assert.match(css, /\.etusivupallo-viiva \{[\s\S]*?stroke-width: 11;/);
  assert.match(avaus, /const paksuus = AVAUSLENNON_VIIVAN_PX;/);
  // Viiva on viivakerroksen OSA (osarekisteri) eikä uusi Globe.gl-kerros.
  assert.match(reitit, /^ {4}aseta\('avauslento', \[jalkiDatum\]\);$/m);
  assert.ok(!/objectsData|tubesData/.test(reitit), 'jälki ei saa tuoda uutta kerrosta');
  // Kasvava jälki kirjoitetaan ilman siirtymää, ja siirtymä palautuu poistossa.
  assert.match(reitit, /pallo\.pathTransitionDuration\(0\);/);
  assert.match(reitit, /pallo\.pathTransitionDuration\(siirtyma\);/);
  /*
   * GEOMETRIA KERRAN, KASVU KATKOVIIVALLA (mitattu Chromiumilla
   * 5.9.2026): joka kehyksen pistelistan kirjoitus jätti viivan lennon
   * ensimmäisen pätkän mittaiseksi Lontoon viereen, koska Globe.gl
   * rakentaa Line2:n geometrian interpolK-tweenin kautta. Katkoviivan
   * luvut menevät materiaaliin joka päivityksellä.
   */
  assert.match(reitit, /\.pathDashLength\(\(d\) => d\.viiva \?\? d\.katko \?\? 1\)/);
  assert.match(reitit, /\.pathDashGap\(\(d\) => d\.vali \?\? d\.katko \?\? 0\)/);
  assert.match(reitit, /jalkiDatum\.viiva = Math\.max\(0, Math\.min\(1, osuus\)\);/);
  assert.match(avaus, /lauta\.reitit\.jalki\(pisteet, \{ paksuus, osuus: e \}\)/);
  // Jälki jää näkyviin lennon jälkeen ja katoaa vasta purussa.
  assert.match(avaus, /^\s+lauta\.reitit\.jalki\(null\);$/m);
});

test('avauslento: viiva kulkee tasan koneen alla — yksi kaava, yksi kello', () => {
  const avaus = lue('../js/pallolauta/avaus.js');
  const siirto = lue('../js/pallolauta/siirto.js');
  // Kone ja jälki lukevat saman kaaripisteen (reitit.js lentokaarenKohta).
  assert.match(siirto, /lentokaarenKohta\(hyppy\.kaari, e, MERKIN_KORKEUS\)/);
  assert.match(avaus, /lentokaarenKohta\(kaari, i \/ AVAUSLENNON_JALJEN_PISTEET, REITIN_KORKEUS\)/);
  assert.ok(!/isoympyranPiste/.test(siirto), 'koneen paikka lasketaan vain yhdessä paikassa');
  // Sama pehmennys ja sama kello kuin koneella (hypynVaihe).
  assert.match(avaus, /piirraJalki\(hypynVaihe\(t\)\.e\);/);
  // Kaaripiste: korkeusparaabeli ja kolmiluku [lat, lng, korkeus].
  const kaari = { alku: { lat: 51.5, lng: -0.1 }, loppu: { lat: 38, lng: 23.7 }, korkeus: 0.0667 };
  const puolivali = reittiModuuli.lentokaarenKohta(kaari, 0.5, 0.002);
  assert.ok(Math.abs(puolivali.korkeus - (0.0667 + 0.002)) < 1e-9, 'huippu on puolivälissä');
  assert.ok(Math.abs(reittiModuuli.lentokaarenKohta(kaari, 0, 0.002).korkeus - 0.002) < 1e-9);
  assert.ok(Math.abs(reittiModuuli.lentokaarenKohta(kaari, 1, 0.002).korkeus - 0.002) < 1e-9);
  // Viivakerros lukee korkeuden pisteestä, kun se on annettu.
  assert.match(lue('../js/pallolauta/reitit.js'),
    /\.pathPointAlt\(\(p\) => \(p\.length > 2 \? p\[2\] : REITIN_KORKEUS\)\)/);
});
