/*
 * AVARUUS: TÄHDET JA PÖLY (js/pallolauta/tahdet.js) sekä
 * kertomusesityksen avaus pimeydestä (js/linssit/ihmisen-matka-esitys.js).
 *
 * Raamattu "IHMISEN MATKA: MUSTA ALKU ON AVARUUS, PALLO ZOOMAUTUU
 * PIMEYDESTA AFRIKKA EDELLA" (omistaja 7.9.2026 ilta: *"Ja se pimeys on
 * avaruus"*, *"Kertoja alkaa jo pimeydestä"*).
 *
 * Mitä tässä vartioidaan:
 *
 *   1. PISTEET: kaksi etäisyyttä (kaukaiset tähdet ja lähempi pöly),
 *      toistettava arvonta ja tasainen jakauma pallon pinnalle — ei
 *      napakasaumia.
 *   2. KERROS: kirjaston oma hiukkaskerros saa joukot oikeilla
 *      poimijoilla, ja purku tyhjentää sen.
 *   3. AJAUTUMA JA HÄIVYTYS: vain pölykerros kiertää, peittävyys menee
 *      kaikille, ja vähennetty liike pysäyttää ajautuman.
 *   4. AVAUS: kamera lähtee kaukaisimmasta korkeudesta Afrikkaan laudan
 *      OMALLA rajapinnalla, kertoja alkaa heti, eikä muistista
 *      jatkettaessa avaruutta luoda.
 *
 * Selaimen puoli (pallo kasvaa, Afrikka keskellä, kertoja käynnissä jo
 * ennen täyttä kokoa) on savukkeessa savuke-ihmisen-esitys.mjs.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  TAHTIKERROKSET, POLYN_AJAUTUMA_KIERROSTA_S, luoTahtitaivas, siemenluvut, tahtipisteet,
} from '../js/pallolauta/tahdet.js';
import {
  AVARUUDEN_HARSO, AVARUUDEN_KORKEUS, AVARUUDEN_MS, TAHTIEN_HAIVE,
} from '../js/linssit/ihmisen-matka-esitys.js';
import { PALLO_KORKEUS_MAX } from '../js/pallolauta/kamera.js';

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');
const OHJAAJA = lue('../js/linssit/ihmisen-matka-esitys.js');
const MODUULI = lue('../js/pallolauta/tahdet.js');
const CSS = lue('../css/aikajana.css');
/** Lähdekoodi ilman kommentteja (proosa ei laukaise sanavartioita). */
const koodi = (teksti) => teksti.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');

/* ==================== 1. pisteet ==================== */

test('kerroksia on kaksi etäisyyttä ja vain lähin ajautuu', () => {
  assert.ok(TAHTIKERROKSET.length >= 2, 'yksi kerros ei anna parallaksia');
  const ajautuvat = TAHTIKERROKSET.filter((k) => k.ajautuu);
  assert.equal(ajautuvat.length, 1, 'ajautuvia kerroksia on oltava tasan yksi (pöly)');
  const poly = ajautuvat[0];
  for (const k of TAHTIKERROKSET) {
    assert.ok(k.korkeus[0] < k.korkeus[1], `${k.tunnus}: korkeusväli väärinpäin`);
    // Kamera on kaukaisimmillaan 2,5 pallonsädettä: kaikkien kerrosten
    // on oltava sen ULKOPUOLELLA, muuten pilvi olisi pallon edessä.
    assert.ok(k.korkeus[0] > PALLO_KORKEUS_MAX,
      `${k.tunnus}: korkeus ${k.korkeus[0]} jää kameran (${PALLO_KORKEUS_MAX}) sisään`);
  }
  const kaukaisin = TAHTIKERROKSET.filter((k) => !k.ajautuu);
  assert.ok(kaukaisin.every((k) => k.korkeus[0] > poly.korkeus[1]),
    'pölyn on oltava lähempänä kuin tähtien — muuten parallaksi on väärinpäin');
  assert.ok(POLYN_AJAUTUMA_KIERROSTA_S > 0 && POLYN_AJAUTUMA_KIERROSTA_S < 0.01,
    `ajautuma ${POLYN_AJAUTUMA_KIERROSTA_S} kierrosta/s ei ole "hyvin hidas"`);
});

test('pisteet ovat toistettavia ja jakautuvat tasaisesti pallolle', () => {
  const a = tahtipisteet({ maara: 400, korkeus: [5, 6], siemen: 42 });
  const b = tahtipisteet({ maara: 400, korkeus: [5, 6], siemen: 42 });
  assert.deepEqual(a, b, 'sama siemen antaa aina saman taivaan');
  assert.notDeepEqual(a, tahtipisteet({ maara: 400, korkeus: [5, 6], siemen: 43 }));
  for (const p of a) {
    assert.ok(Number.isFinite(p.lat) && Math.abs(p.lat) <= 90, `lat ${p.lat}`);
    assert.ok(Number.isFinite(p.lng) && Math.abs(p.lng) <= 180, `lng ${p.lng}`);
    assert.ok(p.alt >= 5 && p.alt <= 6, `alt ${p.alt}`);
  }
  /*
   * TASAINEN PALLOLLE, EI TASAINEN ASTEISSA. Sinistä arvottu leveysaste
   * antaa yhtä monta pistettä joka vyöhykkeelle pinta-alan mukaan;
   * tasainen asteissa kasaisi pisteet napoihin. Mitta: |lat| > 60°
   * kattaa 13,4 % pallon pinnasta, joten osuuden on oltava lähellä sitä
   * eikä lähellä kolmannesta (60/90).
   */
  const navoissa = a.filter((p) => Math.abs(p.lat) > 60).length / a.length;
  assert.ok(navoissa > 0.06 && navoissa < 0.22, `napavyöhykkeissä ${(navoissa * 100).toFixed(1)} %`);
});

test('siemenluvut pysyvät välillä 0…1', () => {
  const arpa = siemenluvut(7);
  for (let i = 0; i < 200; i += 1) {
    const v = arpa();
    assert.ok(v >= 0 && v < 1, `arvo ${v}`);
  }
});

/* ==================== 2. kerros ==================== */

/** Pallon jäljitelmä: kirjaston hiukkaskerros ja näyttämö. */
function koepallo({ pisteita = null } = {}) {
  const kutsut = {};
  const oliot = [];
  const pallo = {
    getGlobeRadius: () => 100,
    scene: () => ({
      traverse: (fn) => oliot.forEach(fn),
    }),
  };
  for (const nimi of [
    'particlesData', 'particlesList', 'particleLat', 'particleLng', 'particleAltitude',
    'particlesSize', 'particlesSizeAttenuation', 'particlesColor',
  ]) {
    // Ilman argumenttia poimija palauttaa nykyisen arvon (globe.gl).
    pallo[nimi] = (arvo) => {
      if (arvo === undefined) return kutsut[nimi];
      kutsut[nimi] = arvo;
      return pallo;
    };
  }
  // Kirjasto rakentaa Points-oliot heti: testissä ne ovat valmiina.
  for (const maara of pisteita ?? TAHTIKERROKSET.map((k) => k.maara)) {
    oliot.push({
      __globeObjType: 'particles',
      geometry: { attributes: { position: { count: maara } } },
      material: {},
      rotation: { y: 0 },
      visible: true,
    });
  }
  return { pallo, kutsut, oliot };
}

test('kerros saa joukot poimijoineen ja purku tyhjentää sen', () => {
  const { pallo, kutsut } = koepallo();
  const taivas = luoTahtitaivas(pallo, { ikkuna: {} });
  assert.ok(taivas, 'taivasta ei syntynyt');
  assert.equal(kutsut.particlesData.length, TAHTIKERROKSET.length);
  assert.equal(kutsut.particleLat, 'lat');
  assert.equal(kutsut.particleLng, 'lng');
  assert.equal(kutsut.particleAltitude, 'alt');
  assert.equal(kutsut.particlesSizeAttenuation, true);
  const joukko = kutsut.particlesData[0];
  assert.equal(kutsut.particlesList(joukko), joukko.pisteet);
  assert.equal(kutsut.particlesColor(joukko), joukko.vari);
  assert.ok(kutsut.particlesSize(joukko) > 0);
  const t = taivas.tila();
  assert.equal(t.kerroksia, TAHTIKERROKSET.length);
  assert.equal(t.pisteita, TAHTIKERROKSET.reduce((n, k) => n + k.maara, 0));
  taivas.pura();
  assert.deepEqual(kutsut.particlesData, [], 'purku ei tyhjentänyt kerrosta');
});

test('vanha taivas ei tyhjennä uuden ajon kerrosta', () => {
  /*
   * Häivytys päättyy ajastimella, ja "Aloita alusta" voi ehtiä väliin:
   * vanhan ajon `pura` löytäisi kerroksesta UUDEN taivaan ja pyyhkisi
   * sen. Purku tarkistaa siksi, että kerroksessa on yhä sen oma joukko.
   */
  const { pallo, kutsut } = koepallo();
  const vanha = luoTahtitaivas(pallo, { ikkuna: {} });
  const uudet = [{ tunnus: 'uusi', pisteet: [], koko: 1, vari: '#fff' }];
  pallo.particlesData(uudet);
  vanha.pura();
  assert.equal(kutsut.particlesData, uudet, 'vanha purku pyyhki uuden taivaan');
});

test('materiaali on additiivinen, läpinäkyvä eikä kirjoita syvyyttä', () => {
  const { pallo, oliot } = koepallo();
  luoTahtitaivas(pallo, { ikkuna: {} });
  for (const o of oliot) {
    assert.equal(o.material.transparent, true);
    assert.equal(o.material.depthWrite, false);
    // THREE.AdditiveBlending === 2.
    assert.equal(o.material.blending, 2);
  }
});

test('pallo ilman hiukkaskerrosta ei kaada avausta', () => {
  assert.equal(luoTahtitaivas({ scene: () => ({ traverse() {} }) }, { ikkuna: {} }), null);
  assert.equal(luoTahtitaivas(null, { ikkuna: {} }), null);
});

/* ==================== 3. ajautuma ja häivytys ==================== */

test('vain pölykerros kiertää, ja peittävyys menee kaikille', () => {
  const { pallo, oliot } = koepallo();
  const taivas = luoTahtitaivas(pallo, { ikkuna: {} });
  taivas.paivita(1, 0.5);
  taivas.paivita(1, 0.5);
  const polynIndeksi = TAHTIKERROKSET.findIndex((k) => k.ajautuu);
  assert.ok(oliot[polynIndeksi].rotation.y > 0, 'pöly ei ajaudu');
  oliot.forEach((o, i) => {
    assert.equal(o.material.opacity, 0.5, `kerros ${i} ei saanut peittävyyttä`);
    if (i !== polynIndeksi) assert.equal(o.rotation.y, 0, `kerros ${i} ei saisi kiertää`);
  });
  // Nolla peittävyys sammuttaa piirron kokonaan (kehystahti).
  taivas.paivita(1, 0);
  assert.ok(oliot.every((o) => o.visible === false));
});

test('vähennetty liike pysäyttää ajautuman muttei tähtiä', () => {
  const { pallo, oliot } = koepallo();
  const taivas = luoTahtitaivas(pallo, { reducedMotion: true, ikkuna: {} });
  taivas.paivita(5, 1);
  assert.ok(oliot.every((o) => o.rotation.y === 0), 'vähennetyssä liikkeessä ei saa ajautua');
  assert.ok(oliot.every((o) => o.material.opacity === 1), 'tähdet näkyvät silti');
});

/* ==================== 4. avaus ==================== */

test('avaus lähtee laudan katon takaa ja palauttaa katon', () => {
  /*
   * PALLON ON OLTAVA PIENI. Laudan oma katto (PALLO_KORKEUS_MAX 2,5) on
   * mitattu 7.9.2026 liian lähelle: pallo täyttää sillä jo ruudun
   * leveyden eikä tähdille jää taivasta. Avaus leventää OrbitControlsin
   * etäisyyskattoa hetkeksi ja palauttaa sen — muuten pelaaja voisi
   * nipistää itsensä avaruuteen kesken kertomuksen.
   */
  assert.ok(AVARUUDEN_KORKEUS > PALLO_KORKEUS_MAX * 2,
    `lähtökorkeus ${AVARUUDEN_KORKEUS} ei ole reilusti laudan katon (${PALLO_KORKEUS_MAX}) takana`);
  assert.ok(AVARUUDEN_MS >= 3000 && AVARUUDEN_MS <= 9000, `${AVARUUDEN_MS} ms`);
  assert.ok(TAHTIEN_HAIVE > 0 && TAHTIEN_HAIVE < 1, `${TAHTIEN_HAIVE}`);
  assert.ok(AVARUUDEN_HARSO > 0 && AVARUUDEN_HARSO < 1, `${AVARUUDEN_HARSO}`);
  const puhdas = koodi(OHJAAJA);
  const avaus = puhdas.slice(puhdas.indexOf('const avaruusavaus = ()'), puhdas.indexOf('const avaruudenKulunut'));
  assert.match(avaus, /avaaKaukaisuus\(alueenKeskus\('afrikka'\)\)/, 'avaus ei avaa etäisyyskattoa');
  assert.match(avaus, /ajaAlueeseen\('afrikka', AVARUUDEN_MS\)/,
    'zoomi ei aja Afrikkaan laudan omalla ajolla');
  assert.match(avaus, /if \(reduced\) \{[\s\S]*?ajaAlueeseen\('afrikka', 0\)/,
    'vähennetty liike ei ole suora leikkaus');
  // Katto palautuu sekä ajastimella että purussa.
  assert.match(avaus, /setTimeout\(palautaKaukaisuus, AVARUUDEN_MS \+ \d+\)/);
  assert.match(puhdas, /clearTimeout\(tila\.kattoAjastin\);\s*\n\s*palautaKaukaisuus\(\);/,
    'purku ei palauta etäisyyskattoa');
  const kaukaisuus = puhdas.slice(puhdas.indexOf('const avaaKaukaisuus'), puhdas.indexOf('const palautaKaukaisuus'));
  assert.match(kaukaisuus, /pallo\.pointOfView\(\{ \.\.\.keski, altitude: AVARUUDEN_KORKEUS \}, 0\)/,
    'lähtönäkymä ei tule laudan omasta pointOfView-kutsusta');
  /*
   * UUTTA KAMERAMOOTTORIA EI TEHDÄ. Avauksen ainoa kehyskutsu on mustan
   * luokanvaihto (css hoitaa liu'un); kameraa liikuttavat vain laudan
   * omat `pointOfView` (lähtönäkymä) ja `ajaKamera` (zoomi).
   */
  const kehyskutsut = (avaus.match(/requestAnimationFrame/g) ?? []);
  assert.equal(kehyskutsut.length, 1, `avauksessa ${kehyskutsut.length} kehyskutsua`);
  assert.match(avaus, /requestAnimationFrame\(\(\) => peite\.classList\.remove\('musta'\)\);/);
  assert.ok(!/pointOfView/.test(avaus), 'zoomi ohittaa laudan kameran');
});

test('kertoja alkaa jo pimeydestä eikä muistista jatkettaessa ole avaruutta', () => {
  const puhdas = koodi(OHJAAJA);
  const aloita = puhdas.slice(puhdas.indexOf('aloita({ muisti = null } = {})'), puhdas.indexOf('taukoTaiJatka()'));
  // Muisti kiertää avaruuden kokonaan (ensimmäinen rivi palauttaa).
  assert.match(aloita, /if \(muisti\) return jatkaMuistista\(muisti\);/);
  // Järjestys: avaruus pystyyn, sitten heti avausjakso ja silmukka.
  const iAvaruus = aloita.indexOf('avaruusavaus()');
  const iJakso = aloita.indexOf('aloitaJakso(0)');
  const iKaynnista = aloita.indexOf('kaynnista()');
  assert.ok(iAvaruus > 0 && iJakso > iAvaruus && iKaynnista > iJakso,
    'kertoja ei ala heti avaruusajon rinnalla');
  // Jatko muistista ei saa luoda tähtiä.
  const jatko = puhdas.slice(
    puhdas.indexOf('function jatkaMuistista(muisti)'),
    puhdas.indexOf('aloita({ muisti = null } = {})'),
  );
  assert.ok(jatko.length > 200, 'jatkaMuistista-lohkoa ei löytynyt');
  assert.ok(!/avaruusavaus|asennaAvaruus/.test(jatko),
    'muistista jatkettaessa luodaan avaruus');
});

test('musta on ensin peitteessä ja sitten pallon ALLA', () => {
  /*
   * KOLME TILAA, TÄSSÄ JÄRJESTYKSESSÄ (Raamattu AVAUS MUSTASTA TAHTIIN
   * JA AFRIKKAAN SANAN KOHDALLA, omistaja 8.9.2026: *"kokonaan musta
   * ruutu ja sitten siihen feidautuisi ensin tähtiä"*):
   *
   *   1. `avaruus musta` — peite läpinäkymätön: ei palloa, ei tähtiä.
   *   2. `avaruus`       — harso (AVARUUDEN_HARSO): tähdet ja pallon
   *                        alla oleva musta levy tulevat näkyviin.
   *   3. `kirkastuu`     — harso pois zoomin tahdissa.
   */
  const puhdas = koodi(OHJAAJA);
  assert.match(puhdas, /koti\.prepend\(levy\);/,
    'musta levy ei mene karttaruudun ensimmäiseksi lapseksi (jäisi pallon päälle)');
  assert.match(puhdas, /peite\.classList\.add\('avaruus', 'musta'\)/,
    'avaus ei ala kokonaan mustasta ruudusta');
  assert.match(puhdas, /requestAnimationFrame\(\(\) => peite\.classList\.remove\('musta'\)\)/,
    'musta ei väisty tähtien tieltä');
  assert.match(CSS, /\.aikajana-avaruus \{[\s\S]{0,300}position: absolute;/);
  assert.match(CSS, /\.aikajana-avaruus\.pois \{ opacity: 0; \}/);
  assert.match(CSS, /\.aikajana-esitys-peite\.avaruus \{[\s\S]{0,160}opacity: 0\.35;/,
    'harso puuttuu: kaukainen pallo ei ole tumma');
  assert.match(CSS, /\.aikajana-esitys-peite\.avaruus\.musta \{ opacity: 1;/,
    'musta ruutu ei ole läpinäkymätön');
  assert.match(CSS, /\.aikajana-esitys-peite\.avaruus\.kirkastuu \{ opacity: 0;/);
});

test('tähtimoduuli ei tiedä linssistä eikä kertomuksesta', () => {
  const puhdas = koodi(MODUULI);
  for (const sana of ['kertomus', 'jakso', 'linssi', 'aikajana']) {
    assert.ok(!new RegExp(sana, 'i').test(puhdas),
      `js/pallolauta/tahdet.js viittaa linssiin sanalla "${sana}"`);
  }
});
