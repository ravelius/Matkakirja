import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

/*
 * ETUSIVUN ESIRENDERÖITY PALLO (pallolauta vaihe 5a, omistaja 5.9.2026:
 * *"siihen kannattaa varmaan renderöidä oma spesifi zoomattu pallo joka
 * pyörii hitaasti lontoosta kohti aasiaa… ja siinä lentokone voisi
 * lentää eri kaupunkien välillä… ja aina kun kone laskeutuu, tulee uusi
 * isoisän aikalaiskuva jonnekin kartan ulkopuolelle pienellä, niin että
 * ei jää etusivun tekstin päälle."*).
 *
 * Vartioi neljä asiaa, joita ei näe silmällä: (1) projektio — koneen
 * ruutupiste vastaa sitä kameraa, jolla video poltettiin; (2) reitti ja
 * kierroksen kesto; (3) lippu on oletuksena POIS ja varapolku jättää
 * etusivun ennalleen; (4) kuvan paikka ei leikkaa avaustekstiä.
 */

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

/* Selaimen varastot: moduuli lukee molempia try/catchin takaa. */
const varasto = new Map();
globalThis.localStorage = {
  getItem: (k) => (varasto.has(k) ? varasto.get(k) : null),
  setItem: (k, v) => varasto.set(k, String(v)),
  removeItem: (k) => varasto.delete(k),
};
globalThis.location = { search: '' };

const {
  ETUSIVUN_KAMERA, ETUSIVUN_KUVAKIERTO, ETUSIVUN_REITTI, ETUSIVUPALLO_AVAIN,
  ETUSIVUPALLO_TIEDOSTOT, ETUSIVUPALLO_VERSIO, HAIVYTYS_S,
  asetaEtusivupallo, etusivupalloOletus, etusivupalloPaalla, jaljenPisteet,
  kameranNakyma, koneenTila,
  kaarietaisyys, liikeVahennetty, lueLuettelo, pallonPiste, reitinPisteet, saapumisenKuva,
  saapumisia, suurympyra, teeReitti, valitseKuvapaikka,
} = await import('../js/etusivupallo.js');
const { packById } = await import('../js/pack.js');
// Laudan valinta muistetaan moduulissa (ui-apurit): oletus seuraa lautaa,
// joten testin on unohdettava muisti aina kun ?lauta vaihtuu.
const { unohdaKehittajaKytkimet } = await import('../js/ui-apurit.js');

const pack = packById('maailmankartta');
const pisteet = reitinPisteet(pack);
const reitti = teeReitti(pisteet);
const MITAT = { leveys: 800, korkeus: 800, lava: 900, fov: 50 };

/* ==================== LIPPU JA VARAPOLKU ========================== */

/*
 * OLETUS SEURAA LAUTAA (aalto 1D, omistaja 5.9.2026: *"Käännä kaikki
 * pallolle, niin voidaan sulkea vanha kartta kokonaan."*): pallolaudalla
 * etusivun pallo on käytössä ilman lippua, ja lippu on enää poiskytkin.
 */
test('lippu on oletuksena PÄÄLLÄ pallolaudalla ja pois ?lauta=kartta-tilassa', () => {
  varasto.clear();
  globalThis.location.search = '';
  unohdaKehittajaKytkimet();
  assert.equal(etusivupalloOletus(), true, 'pallolauta on oletuslauta → pallo etusivulle');
  assert.equal(etusivupalloPaalla(), true, 'pallolaudalla pallo näkyy ilman yhtään lippua');
  globalThis.location.search = '?lauta=kartta';
  unohdaKehittajaKytkimet();
  assert.equal(etusivupalloOletus(), false, 'vanhalla kartalla etusivu jää pienoiskarttaan');
  assert.equal(etusivupalloPaalla(), false);
  globalThis.location.search = '';
  unohdaKehittajaKytkimet();
});

test('lippu on poiskytkin: URL voittaa muistin ja oletus poistaa avaimen', () => {
  varasto.clear();
  globalThis.location.search = '';
  unohdaKehittajaKytkimet();
  // Vipu pois: valinta on tallennettava, koska se eroaa oletuksesta.
  asetaEtusivupallo(false);
  assert.equal(varasto.get(ETUSIVUPALLO_AVAIN), '0');
  assert.equal(etusivupalloPaalla(), false, 'muistettu poiskytkentä pitää');
  globalThis.location.search = '?etusivupallo=1';
  assert.equal(etusivupalloPaalla(), true, 'URL ohittaa muistin');
  globalThis.location.search = '?etusivupallo=0';
  assert.equal(etusivupalloPaalla(), false, 'URL sammuttaa myös ilman muistia');
  globalThis.location.search = '';
  // Takaisin oletukseen: avain poistuu, jotta oletuksen vaihto tavoittaa
  // myös ne laitteet, joilla vipua on käytetty (sama kaava kuin laudalla).
  asetaEtusivupallo(true);
  assert.equal(varasto.has(ETUSIVUPALLO_AVAIN), false);
  assert.equal(etusivupalloPaalla(), true);
  varasto.clear();
  unohdaKehittajaKytkimet();
});

test('luettelo hylätään ilman verkkoa, väärällä versiolla ja vajaana', async () => {
  const kelpo = {
    versio: ETUSIVUPALLO_VERSIO,
    kesto: 41.2,
    mitat: MITAT,
    reitti: pisteet.map((p) => ({ id: p.id, lat: p.lat, lon: p.lon })),
  };
  const haku = (vastaus) => async () => vastaus;
  assert.equal(await lueLuettelo(haku({ ok: false })), null, 'HTTP-virhe → ei kerrosta');
  assert.equal(await lueLuettelo(async () => { throw new Error('ei verkkoa'); }), null,
    'verkkovirhe → etusivu jää ennalleen');
  assert.equal(await lueLuettelo(haku({ ok: true, json: async () => ({ ...kelpo, versio: 'vanha' }) })), null,
    'väärä versio → kone lentäisi väärässä paikassa, joten kerrosta ei rakenneta');
  assert.equal(await lueLuettelo(haku({ ok: true, json: async () => ({ ...kelpo, kesto: 0 }) })), null);
  assert.equal(await lueLuettelo(haku({ ok: true, json: async () => ({ ...kelpo, reitti: [] }) })), null);
  const ok = await lueLuettelo(haku({ ok: true, json: async () => kelpo }));
  assert.equal(ok?.versio, ETUSIVUPALLO_VERSIO);
});

test('reduced motion tunnistetaan ja jättää videon pois', () => {
  assert.equal(liikeVahennetty({ matchMedia: () => ({ matches: true }) }), true);
  assert.equal(liikeVahennetty({ matchMedia: () => ({ matches: false }) }), false);
  assert.equal(liikeVahennetty({}), false, 'ilman matchMediaa ei kaaduta');
  const lahde = lue('../js/etusivupallo.js');
  assert.match(lahde, /vahennettyLiike \? juliste : video/,
    'reduced motionissa DOMiin ei saa syntyä videota lainkaan');
  assert.match(lahde, /if \(vahennettyLiike\) \{[\s\S]*?piirraHetki\(luettelo\.julisteAika/,
    'reduced motionissa piirretään yksi pysäytyskuva eikä käynnistetä rAF-silmukkaa');
});

/* ==================== REITTI ====================================== */

test('reitti kulkee Lontoosta itään Aasiaan pelin omilla koordinaateilla', () => {
  assert.equal(pisteet.length, ETUSIVUN_REITTI.length,
    'jokainen reitin kaupunki löytyy maailmankartasta');
  assert.equal(pisteet[0].id, 'lontoo');
  assert.equal(pisteet[pisteet.length - 1].id, 'tokio');
  for (let i = 1; i < pisteet.length; i++) {
    assert.ok(pisteet[i].lon > pisteet[i - 1].lon,
      `${pisteet[i].id}: reitin on edettävä itään (pituusasteet jatkuvina)`);
  }
  // Lontoo ja Tokio oikeilla paikoillaan ±1,5° (lauta → asteet).
  assert.ok(Math.abs(pisteet[0].lat - 51.5) < 1.5 && Math.abs(pisteet[0].lon - (-0.1)) < 1.5);
  const tokio = pisteet[pisteet.length - 1];
  assert.ok(Math.abs(tokio.lat - 35.7) < 1.5 && Math.abs(tokio.lon - 139.7) < 1.5);
});

test('kierros kestää noin 40 s eikä kone pysähdy kaupunkiin', () => {
  assert.ok(reitti.kesto > 30 && reitti.kesto < 55,
    `kierroksen kesto ${reitti.kesto.toFixed(1)} s ei ole 30–55 s`);
  assert.equal(reitti.jaksot.length, pisteet.length - 1);
  for (const j of reitti.jaksot) {
    assert.ok(j.kesto >= 1.2, 'jokaisella jaksolla on vähintään pohjakesto');
    // Kesto seuraa matkaa: pitkä jakso ei ole yhtä nopea kuin lyhyt.
    assert.ok(Math.abs(j.kesto - (1.2 + j.matka * 0.2)) < 1e-9);
  }
  // Ei taukoja: jaksot ovat peräkkäin ilman rakoa.
  for (let i = 1; i < reitti.jaksot.length; i++) {
    assert.ok(Math.abs(reitti.jaksot[i].alku
      - (reitti.jaksot[i - 1].alku + reitti.jaksot[i - 1].kesto)) < 1e-9);
  }
});

test('isoympyrä kulkee päätepisteiden kautta ja pituusaste pysyy jatkuvana', () => {
  const a = { lat: 51.5, lon: -0.1 };
  const b = { lat: 35.7, lon: 139.7 };
  const alku = suurympyra(a, b, 0);
  assert.ok(Math.abs(alku.lat - a.lat) < 1e-6 && Math.abs(alku.lon - a.lon) < 1e-6);
  const loppu = suurympyra(a, b, 1);
  assert.ok(kaarietaisyys(loppu, b) < 1e-6);
  // Puolivälin on oltava molempien välissä (ei hyppyä ±180° yli).
  const puoli = suurympyra(a, b, 0.5);
  assert.ok(puoli.lon > a.lon && puoli.lon < b.lon);
});

/* ==================== PROJEKTIO ==================================== */

test('projektio: kameran keskipiste osuu kuvan keskelle ja takapuoli on piilossa', () => {
  const kamera = { lat: 20, lon: 60, korkeus: ETUSIVUN_KAMERA.korkeus };
  const keskus = pallonPiste({ lat: 20, lon: 60 }, kamera, MITAT);
  assert.ok(Math.abs(keskus.x - MITAT.leveys / 2) < 0.01);
  assert.ok(Math.abs(keskus.y - MITAT.korkeus / 2) < 0.01);
  assert.equal(keskus.nakyy, true);
  // Vastakkainen puoli pallosta ei näy.
  const takana = pallonPiste({ lat: -20, lon: -120 }, kamera, MITAT);
  assert.equal(takana.nakyy, false);
  // Itään päin siirtyminen vie oikealle, pohjoiseen ylöspäin.
  const ita = pallonPiste({ lat: 20, lon: 70 }, kamera, MITAT);
  const pohjoinen = pallonPiste({ lat: 30, lon: 60 }, kamera, MITAT);
  assert.ok(ita.x > keskus.x, 'itä on oikealla');
  assert.ok(pohjoinen.y < keskus.y, 'pohjoinen on ylhäällä');
});

test('projektio vastaa Globe.gl:n omaa getScreenCoordsia (mitatut arvot)', () => {
  /*
   * Mitattu 5.9.2026 headless-Chromiumissa (Globe.gl 2.46.2, kangas
   * 600×600, korkeus 1,55, fov 50) — tools/tee-etusivupallo.mjs vartioi
   * saman jokaisella poltolla. Jos tämä hajoaa, kone lentäisi etusivulla
   * väärässä paikassa.
   */
  const mitat = { leveys: 600, korkeus: 600, lava: 600, fov: 50 };
  const naytteet = [
    [{ lat: 30, lon: 0 }, { lat: 51.5, lon: -0.1 }, 299.6, 154.4],
    [{ lat: 30, lon: 0 }, { lat: 0, lon: 0 }, 300.0, 491.0],
    [{ lat: 30, lon: 0 }, { lat: 30, lon: 30 }, 468.8, 277.4],
    [{ lat: 20, lon: 60 }, { lat: 51.5, lon: -0.1 }, 125.6, 96.6],
    [{ lat: 20, lon: 60 }, { lat: 20, lon: 90 }, 481.2, 283.4],
    [{ lat: 5, lon: 120 }, { lat: 20, lon: 90 }, 123.2, 198.5],
  ];
  for (const [kamera, kohde, x, y] of naytteet) {
    const oma = pallonPiste(kohde, { ...kamera, korkeus: 1.55 }, mitat);
    assert.ok(Math.hypot(oma.x - x, oma.y - y) < 0.2,
      `${JSON.stringify(kohde)} kamerasta ${JSON.stringify(kamera)}: `
      + `oma ${oma.x.toFixed(1)},${oma.y.toFixed(1)} vs. kirjasto ${x},${y}`);
  }
});

test('kone pysyy kuvassa ja pallo pyörii tasaisesti itään koko kierroksen', () => {
  let edellinenLon = -Infinity;
  for (let t = 0; t <= reitti.kesto; t += 0.25) {
    const nakyma = kameranNakyma(reitti, t);
    assert.ok(nakyma.lon >= edellinenLon - 1e-9,
      `kamera kääntyi takaisin länteen hetkellä ${t.toFixed(1)} s`);
    edellinenLon = nakyma.lon;
    assert.ok(nakyma.lat >= ETUSIVUN_KAMERA.latMin && nakyma.lat <= ETUSIVUN_KAMERA.latMax);
    const p = pallonPiste(koneenTila(reitti, t), nakyma, MITAT);
    assert.equal(p.nakyy, true, `kone katosi pallon taakse hetkellä ${t.toFixed(1)} s`);
    assert.ok(p.x > MITAT.leveys * 0.15 && p.x < MITAT.leveys * 0.85
      && p.y > MITAT.korkeus * 0.12 && p.y < MITAT.korkeus * 0.88,
    `kone karkasi kuvan reunalle hetkellä ${t.toFixed(1)} s `
      + `(${p.x.toFixed(0)}, ${p.y.toFixed(0)})`);
  }
  // Kamera kiertää Lontoosta Tokioon: koko matka noin 140°.
  const alku = kameranNakyma(reitti, 0).lon;
  const loppu = kameranNakyma(reitti, reitti.kesto).lon;
  assert.ok(loppu - alku > 100, `pallo pyöri vain ${(loppu - alku).toFixed(0)}° — pitäisi olla yli 100°`);
});

test('punainen viiva pitenee eikä kutistu', () => {
  let edellinen = 0;
  for (let t = 0; t <= reitti.kesto; t += 0.5) {
    const n = jaljenPisteet(reitti, t).length;
    assert.ok(n >= edellinen, `jälki lyheni hetkellä ${t.toFixed(1)} s`);
    edellinen = n;
  }
  assert.ok(jaljenPisteet(reitti, 0).length <= 2, 'lähdössä jälkeä ei vielä ole');
  const kaikki = jaljenPisteet(reitti, reitti.kesto);
  assert.ok(kaikki.length > 100, 'valmis jälki on tiheä näytteistys (yli 100 pistettä)');
  const viimeinen = kaikki[kaikki.length - 1];
  const kone = koneenTila(reitti, reitti.kesto);
  assert.ok(kaarietaisyys(viimeinen, kone) < 0.05, 'jäljen kärki on koneen kohdalla');
});

/* ==================== ISOISÄN KUVAT ================================ */

test('jokainen laskeutuminen tuo uuden aikalaiskuvan kuvatekstin kanssa', () => {
  assert.equal(saapumisia(reitti, 0), 0);
  assert.equal(saapumisia(reitti, reitti.kesto), reitti.jaksot.length,
    'kaikki kahdeksan laskeutumista näkyvät kierroksen aikana');
  const eka = saapumisenKuva(1);
  const toka = saapumisenKuva(2);
  assert.ok(eka && toka);
  assert.notEqual(eka.avain, toka.avain, 'peräkkäiset laskeutumiset eivät toista samaa kuvaa');
  assert.equal(saapumisenKuva(1 + ETUSIVUN_KUVAKIERTO.length).avain, eka.avain, 'kierto');
  assert.match(eka.kuva.kuvateksti, /^Isoisä, .+, 1873$/,
    'kuvateksti on sanasta sanaan js/isoisan-valokuvat.js:n lappu');
  assert.equal(saapumisenKuva(0), null, 'lähtökaupunki ei tuo kuvaa');
});

test('kuva menee kartan ulkopuolelle eikä avaustekstin päälle', () => {
  /*
   * Puhelimen mitat mitattuna savukkeesta (iPhone 390×844, avausnäkymä
   * pallolohkoineen): julisteotsikko täyttää lohkon keskiosan ja
   * avaustekstin palsta alalohkon — vapaaksi jää kaista niiden välissä.
   */
  const kotelo = { leveys: 390, korkeus: 798, toivottuY: 208 };
  const koko = { leveys: 96, korkeus: 136 };
  const esteet = [
    { x: 34, y: 35, leveys: 322, korkeus: 255 }, // julisteotsikko
    { x: 23, y: 385, leveys: 344, korkeus: 359 }, // avaustekstin palsta
  ];
  const eka = valitseKuvapaikka(kotelo, koko, esteet, null);
  assert.equal(eka.leikkaus, 0, 'kuva ei saa leikata avaustekstin laatikkoa');
  assert.ok(eka.leveys <= koko.leveys, 'kuva kutistuu tarvittaessa mahtuakseen kaistalle');
  assert.ok(eka.x >= 0 && eka.y >= 0
    && eka.x + eka.leveys <= kotelo.leveys && eka.y + eka.korkeus <= kotelo.korkeus,
  'kuva pysyy näkymän sisällä');
  assert.ok(eka.y + eka.korkeus <= 385 && eka.y >= 290,
    `kuva asettuu pallon ja avaustekstin väliin (y ${eka.y}…${eka.y + eka.korkeus})`);
  // Väljässä näkymässä kuvaa ei kutisteta lainkaan.
  const valja = valitseKuvapaikka({ leveys: 1200, korkeus: 800, toivottuY: 400 },
    koko, esteet, null);
  assert.equal(valja.leveys, koko.leveys);
  // Seuraava kuva vaihtaa puolta, kun molemmat laidat ovat yhtä vapaita.
  const toka = valitseKuvapaikka(kotelo, koko, esteet, eka.paikka);
  assert.notEqual(toka.paikka, eka.paikka);
  // Jos toinen laita on tukossa, valitaan vapaa laita puolen vaihdosta huolimatta.
  const tukossa = [...esteet, { x: 0, y: 0, leveys: 200, korkeus: 798 }];
  const pakotettu = valitseKuvapaikka(kotelo, koko, tukossa, 'oikea');
  assert.equal(pakotettu.paikka, 'oikea');
});

/* ==================== KYTKENTÄ ===================================== */

test('js/ui.js kutsuu moduulia yhdestä koukusta dynaamisella tuonnilla', () => {
  const ui = lue('../js/ui.js');
  const koukut = [...ui.matchAll(/import\('\.\/etusivupallo\.js'\)/g)];
  assert.equal(koukut.length, 1, 'koukkuja saa olla tasan yksi (renderIntro)');
  assert.match(ui, /import\('\.\/etusivupallo\.js'\)[\s\S]{0,160}?\.catch\(/,
    'tuonnin on kaaduttava siististi (dist ja verkoton käynnistys)');
  // Yhden tiedoston versiossa moduulia ei ole: etusivu palaa vanhaan
  // pienoiskarttaan, joten kaatunut tuonti herättää tasokartan.
  assert.match(ui, /\.catch\(\(\) => \{[\s\S]{0,600}?this\.kartta\.heraa\(\);/,
    'kaatunut tuonti herättää tasokartan (dist)');
  assert.doesNotMatch(ui, /^import .*etusivupallo/m,
    'staattinen tuonti veisi moduulin yhden tiedoston versioon');
  assert.match(ui, /paivitaEtusivupallo\(this, nakyy\)/);
  // Purku ei odota moduulia (aalto 1D): vipu sammuttaa kerroksen samassa
  // piirrossa, jossa tasokartta herää takaisin vanhaksi pienoiskartaksi.
  assert.match(ui, /this\.etusivupallo\?\.pura\(\);\n\s*this\.etusivupallo = null;/,
    'poiskytkentä purkaa kerroksen synkronisesti');
});

test('moduuli on SHELLissä muttei yhden tiedoston nipussa', () => {
  assert.match(lue('../sw.js'), /'\.\/js\/etusivupallo\.js'/,
    'offline-käyttö vaatii moduulin SHELListä');
  assert.doesNotMatch(lue('../tools/build-standalone.mjs'), /etusivupallo/,
    'dist jää vanhaan etusivun karttaan (omistajan tilaus: erä ei koske dist-versiota)');
});

test('kehittäjävalikossa on oma vipu ja se kääntää lipun ilman sivulatausta', () => {
  const html = lue('../index.html');
  assert.match(html, /id="kehittaja-etusivupallo-kytkin"/);
  assert.match(html, /kehittaja-kytkin-nimi">etusivupallo</);
  const main = lue('../js/main.js');
  assert.match(main, /etusivupalloNappi\?\.addEventListener\('click'/);
  assert.match(main, /import\('\.\/etusivupallo\.js'\)/,
    'main.js hakee moduulin dynaamisesti — staattinen tuonti rikkoisi dist-version');
  // Koko piirto eikä pelkkä renderIntro: pois kytkettäessä tasokartan on
  // herättävä lepotilasta, jotta vanha pienoiskartta palaa ilman sivulatausta.
  assert.match(main, /ui\?\.render\?\.\(\)/, 'vipu piirtää pelin heti uudelleen');
  assert.match(main, /poiskytkin/, 'vivun teksti kertoo uuden oletuksen');
});

/*
 * TASOKARTTA EI ALUSTU ETUSIVUA VARTEN (aalto 1D, karttapallo.md luku 3:
 * "vanha kartta pysyy pois tieltä"). Ennen tätä erää pallolaudankin
 * avausnäkymä piirsi svg#boardiin 188 elementtiä pelkän pienoiskartan
 * takia. Portti on yksi: js/ui.js etusivunPalloKaytossa.
 */
test('pallolaudalla tasokarttaa ei alusteta etusivua varten', () => {
  const ui = lue('../js/ui.js');
  assert.match(ui, /etusivunPalloKaytossa\(\) \{\n\s*return this\.aloituslentoPallolla\(\) && etusivupalloPaalla\(\);/,
    'portti lukee laudan ja lipun samasta paikasta');
  assert.match(ui, /if \(this\.pallolautaHalutaan\(\) \|\| this\.etusivunPalloKaytossa\(\)\) this\.kartta\.lepotila = true;/,
    'mount panee kartan lepotilaan jo ennen ensimmäistä piirtoa');
  assert.match(ui, /this\.etusivunPalloKaytossa\(\) && this\.game\.phase === 'pickstart'/,
    'render ei herätä karttaa lähtövalinnassa (paivitaPallolauta)');
  // Lähtökaupunki valitaan yhä tasokartalta: nappi herättää kartan, jotta
  // kohdepisteet (drawTargets) ovat olemassa, kun lähikuva avautuu.
  const nappi = ui.match(/ {2}aloitaKartalta\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.match(nappi, /if \(this\.kartta\.lepotila && !this\.pallolauta\) \{\n\s*this\.kartta\.heraa\(\);/,
    'Valitse aloituskaupunki herättää tasokartan lepotilasta');
});

test('ämpärin polut ja tiedostonimet ovat samat työkalussa ja pelissä', () => {
  const tyokalu = lue('../tools/tee-etusivupallo.mjs');
  assert.match(tyokalu, /ETUSIVUPALLO_VERSIO/, 'työkalu lukee version moduulista');
  assert.match(tyokalu, /kameranNakyma/, 'kamera lasketaan samasta funktiosta kuin pelissä');
  assert.equal(ETUSIVUPALLO_TIEDOSTOT.juliste, 'juliste.jpg');
  const wf = lue('../.github/workflows/tee-etusivupallo.yml');
  for (const nimi of Object.values(ETUSIVUPALLO_TIEDOSTOT)) {
    assert.ok(wf.includes(nimi), `workflow ei vie tiedostoa ${nimi}`);
  }
  assert.match(wf, /etusivu\.json/, 'luettelo on vietävä, muuten kerros ei rakennu');
  assert.ok(HAIVYTYS_S > 0 && HAIVYTYS_S < 3);
});
