/*
 * KORKEUSPALAT JA VARJON KAAVA.
 *
 * Kaksi asiaa, joita ei voi katsomalla nähdä:
 *
 *  1. PALAN MUOTO ON HÄVIÖTÖN. Pala on gzipattu Int16-ruudukko, jonka
 *     rivit on erotuskoodattu. Jos erotus kiertää yli tai purku unohtaa
 *     kierron, maasto ei katoa vaan MUUTTUU — ja väärä vuori näyttää
 *     yhtä uskottavalta kuin oikea. Testi pakkaa ja purkaa oikeaa
 *     maastoa muistuttavia ruudukoita ja vertaa solu solulta.
 *
 *  2. VARJO ON NÄYTTEIDEN EROTUS. Rinnevarjo lasketaan neljästä
 *     korkeusnäytteestä, joten näytteenotin ja varjostuskaava kuuluvat
 *     yhteen tiedostoon (tools/fokuskartta/maastovarjo.js) — muuten
 *     toista voisi säätää huomaamatta mitä toinen tekee. Testi ajaa
 *     rinteet läpi kaikkiin neljään ilmansuuntaan ja vartioi, ettei
 *     moottori ole hiljaa palannut omaan kopioonsa kaavasta.
 *
 * PALAT OVAT YHÄ 1′-AINEISTOA, vaikka omistajan livekokeilu
 * (v1436, js/korkeuskerros.js) purettiin 2.9.2026: *"Ota live pois ja
 * polta 1 kaarisekuntti."* Palojen muoto on se sopimus, jolla
 * ämpärissä oleva aineisto luetaan laattapolttoon, ja juuri siksi sitä
 * vartioidaan täällä eikä poltinta odotellen.
 *
 * Mitään ei ladata verkosta: ruudukot ovat keksittyjä ja aineiston
 * lukijaa ei kutsuta.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';

import {
  KOEAJON_PALAT, PALAN_ASTEITA, PALAN_RUUTU, PALAN_SOLUJA, PALAN_TUNNUS,
  kaikkiPalat, nimenNurkka, pakkaaPala, palanNimi, puraPala,
} from '../tools/tee-korkeuspalat.mjs';
import {
  VALO, bilineaarinenKorkeus, varjonVoimakkuus, varjostusPisteessa,
} from '../tools/fokuskartta/maastovarjo.js';

const LUE = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');

/* ------------------------------------------------------ palan nimeäminen */

test('palan nimi ja nurkka ovat toistensa käänteisiä', () => {
  for (const { lon0, lat0, nimi } of kaikkiPalat()) {
    assert.deepEqual(nimenNurkka(nimi), { lon0, lat0 }, `${nimi} ei purkaudu takaisin`);
  }
});

test('nimi on tuttua muotoa ja maailma on täynnä paloja', () => {
  assert.equal(palanNimi(20, 40), 'N40E020');
  assert.equal(palanNimi(-70, -30), 'S30W070');
  assert.equal(palanNimi(-180, -90), 'S90W180');
  // 36 saraketta × 18 riviä. Jos tämä luku muuttuu, palan koko on
  // muuttunut — ja silloin ämpärissä olevat palat eivät enää täsmää.
  assert.equal(kaikkiPalat().length, (360 / PALAN_ASTEITA) * (180 / PALAN_ASTEITA));
  for (const nimi of KOEAJON_PALAT) assert.ok(nimenNurkka(nimi), `${nimi} ei ole palan nimi`);
});

test('kelvoton nimi ei mene läpi', () => {
  // Nurkka on aina kymmenellä jaollinen: N45E020 näyttää nimeltä mutta
  // osoittaisi palaan, jota ei ole olemassa.
  assert.equal(nimenNurkka('N45E020'), null);
  assert.equal(nimenNurkka('N90E020'), null); // ylin rivi alkaa 80:stä
  assert.equal(nimenNurkka('N40E180'), null); // itäisin sarake on 170
  assert.equal(nimenNurkka('n40e020'), null);
  assert.equal(nimenNurkka('N40E20'), null);
});

/* -------------------------------------------------- muoto ja häviöttömyys */

/** Ruudukko funktiosta (x, y) -> metriä. */
function teeSolut(f, n = 40) {
  const solut = new Int16Array(n * n);
  for (let y = 0; y < n; y += 1) {
    for (let x = 0; x < n; x += 1) solut[y * n + x] = f(x, y);
  }
  return solut;
}

function edestakaisin(solut, n = 40, lon0 = 20, lat0 = 40) {
  const pakattu = pakkaaPala({
    lon0, lat0, leveys: n, korkeus: n, solut,
  });
  return puraPala(gunzipSync(pakattu));
}

test('otsikko kulkee pakkauksen sisällä ja säilyy sellaisenaan', () => {
  const solut = teeSolut((x, y) => x * 3 - y);
  const pakattu = pakkaaPala({
    lon0: -70, lat0: -30, leveys: 40, korkeus: 40, solut,
  });
  // Yksi gzip eikä kahden muodon liitos: ensimmäiset tavut ovat gzipin.
  assert.equal(pakattu[0], 0x1f);
  assert.equal(pakattu[1], 0x8b);
  const pala = puraPala(gunzipSync(pakattu));
  assert.equal(pala.lon0, -70);
  assert.equal(pala.lat0, -30);
  assert.equal(pala.ruutu, PALAN_RUUTU);
  assert.equal(pala.leveys, 40);
  assert.equal(pala.korkeus, 40);
  assert.equal(gunzipSync(pakattu).toString('latin1', 0, 4), PALAN_TUNNUS);
});

test('pakkaus ja purku ovat häviöttömiä myös ääriarvoilla', () => {
  /*
   * Kolme ruudukkoa, joista jokainen on eri tapa rikkoa erotuskoodaus:
   *
   *   loiva      tavallinen maasto, erotus muutaman metrin
   *   hyppy      8000 metrin huippu 9000 metrin haudan vieressä —
   *              erotus 17 000 EI mahdu Int16:een, joten se kiertää yli
   *              ja purun on kierrettävä takaisin
   *   ääripäät   koko Int16:n alue reunasta reunaan
   */
  const tapaukset = {
    loiva: teeSolut((x, y) => Math.round(300 + 40 * Math.sin(x / 5) + y)),
    hyppy: teeSolut((x) => (x % 2 ? 8266 : -10728)),
    aaripaat: teeSolut((x, y) => (((x * 40 + y) % 65536) - 32768)),
  };
  for (const [nimi, solut] of Object.entries(tapaukset)) {
    const pala = edestakaisin(solut);
    let eroja = 0;
    for (let i = 0; i < solut.length; i += 1) if (pala.solut[i] !== solut[i]) eroja += 1;
    assert.equal(eroja, 0, `${nimi}: ${eroja} solua muuttui edestakaisin`);
  }
});

test('vajaa pala ei mene läpi hiljaa', () => {
  const solut = teeSolut(() => 100);
  const runko = gunzipSync(pakkaaPala({
    lon0: 20, lat0: 40, leveys: 40, korkeus: 40, solut,
  }));
  assert.throws(() => puraPala(runko.subarray(0, runko.length - 2)), /vajaa/);
  const vaara = Buffer.from(runko);
  vaara.write('XXXX', 0, 'latin1');
  assert.throws(() => puraPala(vaara), /tunnus/);
  assert.throws(() => pakkaaPala({
    lon0: 0, lat0: 0, leveys: 40, korkeus: 41, solut,
  }), /solua/);
});

test('palan sivu on kymmenen astetta kaariminuutin ruuduilla', () => {
  // Palan koko on ämpärin ja lukijan välinen sopimus: nimi kertoo
  // lounaisnurkan kymmenen asteen välein, ja solujen määrä seuraa
  // siitä. Jos nämä eriytyvät, lukija hakee palaa jota ei ole.
  assert.equal(PALAN_SOLUJA, PALAN_ASTEITA * 60);
  assert.equal(Math.round(1 / PALAN_RUUTU), 60);
  assert.equal(PALAN_TUNNUS, 'MK1P');
});

/* ------------------------------------------------------- varjon kaava */

/** Tasainen ruudukko, jonka päälle voi asettaa rinteen. */
function ruudukkoRinteella(dzdLat, dzdLon) {
  const w = 21;
  const h = 21;
  const grid = new Float64Array(w * h);
  const lon0 = 20;
  const lat1 = 45;
  const askel = 1 / 60;
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const lon = lon0 + x * askel;
      const lat = lat1 - y * askel;
      grid[y * w + x] = 1000 + (lat - 44.9) * dzdLat + (lon - 20.1) * dzdLon;
    }
  }
  return {
    grid, w, h, lon0, lat1, dlon: askel, dlat: askel,
  };
}

test('tasainen maa antaa auringon korkeuden sinin', () => {
  const K = ruudukkoRinteella(0, 0);
  const korkeus = (lon, lat) => bilineaarinenKorkeus(K, lon, lat);
  const arvo = varjostusPisteessa(korkeus, 20.1, 44.9, 1 / 60);
  assert.ok(Math.abs(arvo - Math.sin(VALO.korkeuskulma * Math.PI / 180)) < 1e-9,
    `tasainen maa antoi ${arvo}`);
  // Tasainen maa on hitusen VALOISAMPI kuin varjon nollataso 0,5, eli
  // moottori vaalentaa sitä — se on varjon valkoinen puoli.
  assert.ok(varjonVoimakkuus(arvo) < 0, 'tasainen maa ei saa tummua');
});

test('pohjoiseen viettävä rinne on vaaleampi kuin etelään viettävä', () => {
  /*
   * TÄMÄ ON SE TESTI. Aurinko on luoteessa, joten pohjoiseen LASKEVA
   * rinne on valossa ja etelään laskeva varjossa. Jos jompikumpi
   * etumerkki kääntyy, kartta näyttää yhä täysin uskottavalta — vuoret
   * vain ovat laaksoja, eikä sitä huomaa ilman vertailua.
   */
  const pohjoiseen = ruudukkoRinteella(-3000, 0); // korkeus laskee pohjoiseen
  const etelaan = ruudukkoRinteella(3000, 0);
  const a = varjostusPisteessa((lon, lat) => bilineaarinenKorkeus(pohjoiseen, lon, lat),
    20.1, 44.9, 1 / 60);
  const b = varjostusPisteessa((lon, lat) => bilineaarinenKorkeus(etelaan, lon, lat),
    20.1, 44.9, 1 / 60);
  assert.ok(a > b, `pohjoiseen viettävä ${a} ei ollut vaaleampi kuin etelään ${b}`);
  // Voimakkuus on varjon etumerkki: etelään viettävä on AINA
  // tummempi kuin pohjoiseen viettävä, olipa kumpikin vielä tasaisen
  // maan valoisalla puolella tai ei.
  assert.ok(varjonVoimakkuus(b) > varjonVoimakkuus(a),
    'etelään viettävän rinteen on oltava tummempi');
});

test('länteen viettävä rinne on vaaleampi kuin itään viettävä', () => {
  // Sama sääntö toisessa suunnassa: aurinko on lännen puolella, joten
  // länteen laskeva rinne saa valon. Kosini kutistaa itä-länsi-askelta
  // navoille päin, mutta ei käännä sen etumerkkiä.
  const lanteen = ruudukkoRinteella(0, 3000); // korkeus laskee länteen
  const itaan = ruudukkoRinteella(0, -3000);
  const a = varjostusPisteessa((lon, lat) => bilineaarinenKorkeus(lanteen, lon, lat),
    20.1, 44.9, 1 / 60);
  const b = varjostusPisteessa((lon, lat) => bilineaarinenKorkeus(itaan, lon, lat),
    20.1, 44.9, 1 / 60);
  assert.ok(a > b, `länteen viettävä ${a} ei ollut vaaleampi kuin itään ${b}`);
  assert.ok(varjonVoimakkuus(b) > varjonVoimakkuus(a),
    'itään viettävän rinteen on oltava tummempi');
});

test('ruudukon ulkopuoli on neutraali eikä musta', () => {
  const K = ruudukkoRinteella(0, 0);
  const arvo = varjostusPisteessa((lon, lat) => bilineaarinenKorkeus(K, lon, lat),
    100, 44.9, 1 / 60);
  assert.equal(arvo, 0.5, 'aineiston reunaan ilmestyisi viiva');
  assert.equal(varjonVoimakkuus(0.5), 0);
});

test('tarkempi askel näkee sen mitä karkeampi tasoittaa', () => {
  /*
   * Koko 1′-tarkkuuden väite yhtenä lukuna: sama kaava, eri askel. Kapea
   * harjanne on 1′-askeleella jyrkkä ja 3′-askeleella lähes olematon,
   * koska keskeisdifferenssi kurottaa harjanteen yli.
   */
  const w = 61;
  const h = 61;
  const askel = 1 / 60;
  const lon0 = 20;
  const lat1 = 45.5;
  const grid = new Float64Array(w * h);
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const lat = lat1 - y * askel;
      grid[y * w + x] = 1000 + 800 * Math.exp(-(((lat - 45.2) / (1.5 * askel)) ** 2));
    }
  }
  const K = {
    grid, w, h, lon0, lat1, dlon: askel, dlat: askel,
  };
  const korkeus = (lon, lat) => bilineaarinenKorkeus(K, lon, lat);
  // Harjanteen etelärinne, puolikas solu huipulta.
  const kohta = 45.2 - askel / 2;
  const tarkka = varjostusPisteessa(korkeus, 20.5, kohta, askel);
  const karkea = varjostusPisteessa(korkeus, 20.5, kohta, 0.05);
  /*
   * Vertailu tehdään poikkeamana TASAISEN MAAN arvosta (auringon
   * korkeuden sini), koska juuri se on se taso, jonka ympärillä varjo
   * piirtyy. Poikkeama nollasta olisi eri kysymys eikä tämä.
   */
  const tasainen = Math.sin(VALO.korkeuskulma * Math.PI / 180);
  assert.ok(Math.abs(tarkka - tasainen) > Math.abs(karkea - tasainen) + 0.05,
    `1′ ${tarkka.toFixed(3)} ei erottunut 3′:sta ${karkea.toFixed(3)} `
    + `(tasainen ${tasainen.toFixed(3)})`);
});

/* --------------------------------------------- yksi lähde, kaksi käyttäjää */

test('moottori tuo varjostuskaavan yhteisestä moduulista', () => {
  const moottori = LUE('tools/fokuskartta/maailmapiirto.js');
  assert.match(moottori, /from '\.\/maastovarjo\.js'/,
    'moottori ei enää tuo varjostuskaavaa yhteisestä moduulista');
  /*
   * KAAVAN LUVUT SAAVAT ESIINTYÄ VAIN YHDESSÄ PAIKASSA. Auringon
   * atsimuutti ja korkeuskulma ovat se, minkä kopioiminen kääntäisi
   * kuvan nurin — ja juuri sellainen kopio on aiemmin syntynyt
   * vahingossa, kun funktio "otettiin talteen" toiseen tiedostoon.
   * Sama koskee varjon voimakkuutta: 0,46 kuuluu kaavan viereen eikä
   * moottorin pikselisilmukkaan.
   */
  assert.doesNotMatch(moottori, /315 \* Math\.PI/,
    'moottori laskee auringon suunnan itse — kaava on kahdessa paikassa');
  assert.doesNotMatch(moottori, /Math\.hypot\(nx, ny, nz\)/,
    'moottori laskee normaalin itse — kaava on kahdessa paikassa');
  assert.doesNotMatch(moottori, /\* 0\.46/,
    'moottori kertoo varjon voimakkuuden itse — luku on kahdessa paikassa');
  assert.equal(VALO.atsimuutti, 315);
  assert.equal(VALO.korkeuskulma, 42);
  assert.equal(VALO.liioittelu, 2.6);
});
