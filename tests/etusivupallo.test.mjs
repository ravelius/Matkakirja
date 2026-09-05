import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

/*
 * ETUSIVUN ESIRENDERÖITY PALLO (pallolauta vaihe 5a, omistaja 5.9.2026:
 * *"siihen kannattaa varmaan renderöidä oma spesifi zoomattu pallo joka
 * pyörii hitaasti lontoosta kohti aasiaa… ja siinä lentokone voisi
 * lentää eri kaupunkien välillä… ja aina kun kone laskeutuu, tulee uusi
 * isoisän aikalaiskuva jonnekin kartan ulkopuolelle pienellä, niin että
 * ei jää etusivun tekstin päälle."* — klo 21.30: *"pallo saisi pyöriä
 * koko etusivun alalla. isoisän kuva saisi olla isompi ja vaihtua aina
 * samaan paikkaan."* — klo 21.45: *"animaatio pitää mennä koko
 * maapallon ympäri niin että se voi loopata. eli pysähtyy lontooseen ja
 * punainen viiva ottaa kiinni lopuksi."* — klo 22.45: *"isoisän kuvat
 * voivat olla blurrattuja ja haalealla ja jäädä tekstin alle"* ja *"ne
 * voisivat pinoutua hieman sikin sokin toistensa päälle."*).
 *
 * Vartioi kuusi asiaa, joita ei näe silmällä: (1) projektio — koneen
 * ruutupiste vastaa sitä kameraa, jolla video poltettiin; (2) reitti on
 * täysi 360° kierros ja kamera on jaksollinen, joten video looppaa
 * saumatta; (3) kone pysähtyy Lontooseen ja viiva sulkee ympyrän;
 * (4) cover-sovitus antaa videolle ja SVG:lle saman muunnoksen, ja kone
 * osuu pallolle kaikissa ruutukoissa; (5) lippu on poiskytkin ja
 * varapolku jättää etusivun ennalleen; (6) isoisän kuvat pinoutuvat
 * sikin sokin haaleina TEKSTIN ALLE ja pinossa on enintään viisi
 * korttia.
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
  ETUSIVUPALLO_TIEDOSTOT, ETUSIVUPALLO_VERSIO, HAIVYTYS_S, KERROKSEN_ILMESTYS_MS,
  KIERROKSEN_ASTEET,
  LOPPU_PITO_S, PINON_HAIVYTYS_MS, PINON_KATTO, PINON_KULMA, PINON_LASKU_MS,
  PINON_SIIRTO, SOVITUS_TAPA, SVG_SOVITUS,
  asetaEtusivupallo, etusivupalloOletus, etusivupalloPaalla, jaljenPisteet,
  kameranNakyma, kerroksenSovitus, koneenTila,
  kaarietaisyys, liikeVahennetty, lueLuettelo, pallonPiste, pinonAsento, reitinPisteet,
  saapumisenKaupunki, saapumisenKuva,
  saapumisia, suurympyra, teeReitti, videostaRuudulle,
} = await import('../js/etusivupallo.js');
const {
  ETUSIVUN_ISOISAKUVAT, ISOISAKUVAN_SAVYT, isoisakuvanSavy,
} = await import('../js/packs/etusivun-isoisakuvat.js');
const { packById } = await import('../js/pack.js');
// Laudan valinta muistetaan moduulissa (ui-apurit): oletus seuraa lautaa,
// joten testin on unohdettava muisti aina kun ?lauta vaihtuu.
const { unohdaKehittajaKytkimet } = await import('../js/ui-apurit.js');

const pack = packById('maailmankartta');
const pisteet = reitinPisteet(pack);
const reitti = teeReitti(pisteet);
const MITAT = { leveys: 800, korkeus: 800, lava: 900, fov: 50 };
/** Ruutukoot, joissa asettelu on mitattu selaimessa (savuke ja kaappaukset). */
const RUUTUKOOT = [
  { nimi: 'puhelin', leveys: 390, korkeus: 844 },
  { nimi: 'tabletti', leveys: 768, korkeus: 1024 },
  { nimi: 'työpöytä', leveys: 1400, korkeus: 900 },
  { nimi: 'iso työpöytä', leveys: 2000, korkeus: 1300 },
];

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
    kesto: reitti.kesto,
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
  assert.match(lahde, /if \(!vahennettyLiike\) juuri\.appendChild\(video\);/,
    'reduced motionissa DOMiin ei saa syntyä videota lainkaan');
  assert.match(lahde, /if \(vahennettyLiike\) \{[\s\S]*?piirraHetki\(luettelo\.julisteAika/,
    'reduced motionissa piirretään yksi pysäytyskuva eikä käynnistetä rAF-silmukkaa');
});

/* ==================== REITTI ON TÄYSI KIERROS ====================== */

/*
 * OMISTAJA 5.9.2026 ilta: *"animaatio pitää mennä koko maapallon ympäri
 * niin että se voi loopata. eli pysähtyy lontooseen ja punainen viiva
 * ottaa kiinni lopuksi."* Reitti on Foggin kierros ja päättyy sinne,
 * mistä alkoi — pituusasteina tasan 360° itään.
 */
test('reitti on Foggin kierros Lontoosta itään takaisin Lontooseen', () => {
  assert.equal(pisteet.length, ETUSIVUN_REITTI.length,
    'jokainen reitin kaupunki löytyy maailmankartasta');
  assert.equal(pisteet[0].id, 'lontoo');
  assert.equal(pisteet[pisteet.length - 1].id, 'lontoo', 'kierros palaa lähtöpaikkaan');
  for (let i = 1; i < pisteet.length; i++) {
    assert.ok(pisteet[i].lon > pisteet[i - 1].lon,
      `${pisteet[i].id}: reitin on edettävä itään (pituusasteet jatkuvina)`);
  }
  const kierto = pisteet[pisteet.length - 1].lon - pisteet[0].lon;
  assert.ok(Math.abs(kierto - KIERROKSEN_ASTEET) < 1e-9,
    `kierto ${kierto.toFixed(6)}° ei ole tasan 360° — video ei looppaisi saumatta`);
  // Lontoo ja Tokio oikeilla paikoillaan ±1,5° (lauta → asteet).
  assert.ok(Math.abs(pisteet[0].lat - 51.5) < 1.5 && Math.abs(pisteet[0].lon - (-0.1)) < 1.5);
  const tokio = pisteet.find((p) => p.id === 'tokio');
  assert.ok(Math.abs(tokio.lat - 35.7) < 1.5 && Math.abs(tokio.lon - 139.7) < 1.5);
  // Tyynenmeren yli ja Atlantin takaisin: kierros käy Amerikassa.
  for (const id of ['sanfrancisco', 'newyork']) {
    assert.ok(pisteet.some((p) => p.id === id), `kierrokselta puuttuu ${id}`);
  }
});

test('kierros kestää 40–60 s ja päättyy Lontoon pysähdykseen', () => {
  assert.ok(reitti.kesto > 40 && reitti.kesto < 60,
    `kierroksen kesto ${reitti.kesto.toFixed(1)} s ei ole 40–60 s`);
  assert.equal(reitti.jaksot.length, pisteet.length,
    'jaksoja on yksi enemmän kuin välejä: viimeinen on Lontoon pysähdys');
  const pito = reitti.jaksot[reitti.jaksot.length - 1];
  assert.equal(pito.pito, true);
  assert.equal(pito.matka, 0, 'pysähdyksellä ei ole matkaa');
  assert.equal(pito.kesto, LOPPU_PITO_S);
  assert.ok(LOPPU_PITO_S > HAIVYTYS_S,
    'pysähdyksen on kestettävä häivytystä kauemmin, jotta suljettu ympyrä ehtii näkyä');
  for (const j of reitti.jaksot.slice(0, -1)) {
    assert.ok(j.kesto >= 1, 'jokaisella lentojaksolla on vähintään pohjakesto');
    // Kesto seuraa matkaa: pitkä jakso ei ole yhtä nopea kuin lyhyt.
    assert.ok(Math.abs(j.kesto - (1.0 + j.matka * 0.115)) < 1e-9);
  }
  // Ei taukoja: jaksot ovat peräkkäin ilman rakoa.
  for (let i = 1; i < reitti.jaksot.length; i++) {
    assert.ok(Math.abs(reitti.jaksot[i].alku
      - (reitti.jaksot[i - 1].alku + reitti.jaksot[i - 1].kesto)) < 1e-9);
  }
});

test('kamera on JAKSOLLINEN: viimeinen kehys on sama kuin ensimmäinen', () => {
  const alku = kameranNakyma(reitti, 0);
  const loppu = kameranNakyma(reitti, reitti.kesto);
  assert.ok(Math.abs((loppu.lon - alku.lon) - KIERROKSEN_ASTEET) < 1e-9,
    `kamera kiertyi ${(loppu.lon - alku.lon).toFixed(6)}° eikä 360° — video hyppäisi saumassa`);
  assert.ok(Math.abs(loppu.lat - alku.lat) < 1e-9, 'kameran kallistus ei saa hypätä saumassa');
  assert.equal(loppu.korkeus, alku.korkeus);
  // Sauman yli kelaaminen: silotusikkuna kurkistaa molempiin suuntiin.
  const ennen = koneenTila(reitti, -1);
  const jalkeen = koneenTila(reitti, reitti.kesto - 1);
  assert.ok(Math.abs((jalkeen.lon - ennen.lon) - KIERROKSEN_ASTEET) < 1e-9,
    'koneenTila jatkuu kierros kerrallaan myös kierroksen ulkopuolella');
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
  // Kamera kiertää koko maapallon ympäri.
  const alku = kameranNakyma(reitti, 0).lon;
  const loppu = kameranNakyma(reitti, reitti.kesto).lon;
  assert.ok(loppu - alku > 350, `pallo pyöri vain ${(loppu - alku).toFixed(0)}° — pitäisi olla 360°`);
});

/* ==================== COVER-SOVITUS =============================== */

/*
 * KOKO ETUSIVUN ALA (omistaja 5.9.2026 klo 21.30). Video ja SVG saavat
 * SAMAN muunnoksen: CSS object-fit: cover ≡ SVG preserveAspectRatio
 * "xMidYMid slice". Jos nämä erkanevat, kone lentäisi videon pallon
 * vierestä — juuri sitä tämä osio vartioi.
 */
test('cover-sovitus vastaa SVG:n xMidYMid slice -muunnosta pikselilleen', () => {
  assert.equal(SOVITUS_TAPA, 'cover');
  assert.equal(SVG_SOVITUS.cover, 'xMidYMid slice');
  assert.equal(SVG_SOVITUS.contain, 'xMidYMid meet');
  for (const koko of RUUTUKOOT) {
    const kotelo = { leveys: koko.leveys, korkeus: koko.korkeus };
    const s = kerroksenSovitus(MITAT, kotelo);
    /*
     * SVG:n oma laskukaava (SVG 1.1 luku 7.8, slice): skaala on
     * SUUREMPI suhteista, ja ylimenevä puoli keskitetään — sama
     * määritelmä kuin CSS:n object-fit: cover 50 % 50 %.
     */
    const skaala = Math.max(kotelo.leveys / MITAT.leveys, kotelo.korkeus / MITAT.korkeus);
    const tx = (kotelo.leveys - MITAT.leveys * skaala) / 2;
    const ty = (kotelo.korkeus - MITAT.korkeus * skaala) / 2;
    assert.ok(Math.abs(s.skaala - skaala) < 1e-12, `${koko.nimi}: skaala`);
    assert.ok(Math.abs(s.siirtoX - tx) < 1e-12, `${koko.nimi}: vaakasiirto`);
    assert.ok(Math.abs(s.siirtoY - ty) < 1e-12, `${koko.nimi}: pystysiirto`);
    // Cover TÄYTTÄÄ alan: kumpikaan siirtymä ei jätä paperia näkyviin.
    assert.ok(s.siirtoX <= 1e-12 && s.siirtoY <= 1e-12,
      `${koko.nimi}: cover jätti tyhjää reunaa (${s.siirtoX}, ${s.siirtoY})`);
  }
  // contain on sama kaava toisin päin — vanha rajaus on yhä saatavilla.
  const contain = kerroksenSovitus(MITAT, { leveys: 1400, korkeus: 900 }, 'contain');
  assert.ok(contain.skaala < kerroksenSovitus(MITAT, { leveys: 1400, korkeus: 900 }).skaala);
  // Rappeutuneet mitat eivät kaada laskentaa.
  assert.ok(Number.isFinite(kerroksenSovitus({}, {}).skaala));
});

test('kone osuu videon pallolle myös cover-rajauksessa kaikissa ruutukoissa', () => {
  for (const koko of RUUTUKOOT) {
    const sovitus = kerroksenSovitus(MITAT, { leveys: koko.leveys, korkeus: koko.korkeus });
    for (let t = 0; t <= reitti.kesto; t += 0.5) {
      const nakyma = kameranNakyma(reitti, t);
      const r = videostaRuudulle(pallonPiste(koneenTila(reitti, t), nakyma, MITAT), sovitus);
      assert.equal(r.nakyy, true);
      assert.ok(r.x > 0 && r.x < koko.leveys && r.y > 0 && r.y < koko.korkeus,
        `${koko.nimi}: kone rajautui ulos hetkellä ${t.toFixed(1)} s `
        + `(${r.x.toFixed(0)}, ${r.y.toFixed(0)})`);
    }
    // Alussa kone on Lontoossa, ja Lontoon on oltava näkyvissä.
    const alku = videostaRuudulle(
      pallonPiste(koneenTila(reitti, 0), kameranNakyma(reitti, 0), MITAT), sovitus,
    );
    assert.ok(alku.x > koko.leveys * 0.05 && alku.x < koko.leveys * 0.95,
      `${koko.nimi}: Lontoo ei ole näkyvissä kierroksen alussa`);
  }
});

test('css ja moduuli sopivat samasta rajauksesta', () => {
  const css = lue('../css/styles.css');
  const pallo = css.match(/\.etusivupallo-video,\n\.etusivupallo-juliste \{[\s\S]*?\n\}/)[0];
  assert.match(pallo, /object-fit: cover;/,
    'video täyttää koko etusivun alan (omistaja: "pallo saisi pyöriä koko etusivun alalla")');
  assert.doesNotMatch(pallo, /object-fit: contain/);
  const lahde = lue('../js/etusivupallo.js');
  assert.match(lahde, /preserveAspectRatio: SVG_SOVITUS\[SOVITUS_TAPA\]/,
    'SVG lukee rajauksen samasta vakiosta kuin CSS-kommentti lupaa');
  // Kerros on koko paneelin (.intro) lapsi eikä enää ylälohkon.
  assert.match(lahde, /const kotelo = ui\.introEl \?\?/,
    'kerros syntyy koko avauspaneeliin, ei .intro-kartta-lohkoon');
  assert.doesNotMatch(lahde, /esteet: \(\) => \[\]|esteet = \(\) =>|esteet\(paneeli\)/,
    'esteväistön asetusta ei enää ole: kuvan paikka on kiinteä');
  assert.doesNotMatch(lue('../js/ui.js'), /esteet:/,
    'js/ui.js ei enää kerää avaustekstin laatikoita kerrokselle');
});

/* ==================== VIIVA JA SEN SULKEUTUMINEN =================== */

test('punainen viiva pitenee, sulkee ympyrän Lontoossa ja häipyy vasta sen jälkeen', () => {
  let edellinen = 0;
  for (let t = 0; t <= reitti.kesto - 0.01; t += 0.5) {
    const n = jaljenPisteet(reitti, t).length;
    assert.ok(n >= edellinen, `jälki lyheni hetkellä ${t.toFixed(1)} s`);
    edellinen = n;
  }
  assert.ok(jaljenPisteet(reitti, 0).length <= 2, 'lähdössä jälkeä ei vielä ole');
  const pitoAlkaa = reitti.kesto - LOPPU_PITO_S;
  const kaikki = jaljenPisteet(reitti, pitoAlkaa);
  assert.ok(kaikki.length > 150, 'valmis jälki on tiheä näytteistys (yli 150 pistettä)');
  // VIIVA OTTAA KIINNI: kärki on koneen kohdalla JA lähtöpisteessä.
  const kone = koneenTila(reitti, pitoAlkaa);
  const karki = kaikki[kaikki.length - 1];
  assert.ok(kaarietaisyys(karki, kone) < 0.05, 'jäljen kärki on koneen kohdalla');
  assert.ok(kaarietaisyys(karki, kaikki[0]) < 0.05,
    'ympyrä sulkeutuu: jäljen kärki on samassa paikassa kuin sen alku');
  // Pysähdyksen aikana jälki ei enää kasva eikä kone liiku.
  const pidonLopussa = jaljenPisteet(reitti, reitti.kesto - 0.01);
  assert.equal(pidonLopussa.length, kaikki.length, 'pysähdys ei piirrä lisää jälkeä');
  const paikallaan = koneenTila(reitti, reitti.kesto - 0.01);
  assert.ok(kaarietaisyys(paikallaan, kone) < 1e-6, 'kone pysähtyy Lontooseen');
  // Häivytys osuu pidon loppuun: suljettu ympyrä ehtii näkyä ensin.
  const haivytys = (t) => Math.max(0, Math.min(1, t / HAIVYTYS_S, (reitti.kesto - t) / HAIVYTYS_S));
  assert.equal(haivytys(pitoAlkaa), 1, 'ympyrä on täysin näkyvissä, kun kone laskeutuu');
  assert.ok(haivytys(reitti.kesto - 0.001) < 0.01, 'viiva on häipynyt ennen loopin alkua');
});

/* ==================== ISOISÄN KUVAT ================================ */

test('jokainen laskeutuminen tuo pinoon kuvan paikan ja vuoden kuvatekstillä', () => {
  assert.equal(saapumisia(reitti, 0), 0);
  assert.equal(saapumisia(reitti, reitti.kesto), pisteet.length - 1,
    'kaikki kymmenen laskeutumista näkyvät kierroksen aikana');
  assert.equal(saapumisia(reitti, reitti.kesto), saapumisia(reitti, reitti.kesto - LOPPU_PITO_S),
    'Lontoon pysähdys ei ole yksitoista laskeutuminen');
  const eka = saapumisenKuva(1);
  const toka = saapumisenKuva(2);
  assert.ok(eka && toka);
  assert.notEqual(eka.avain, toka.avain, 'peräkkäiset laskeutumiset eivät toista samaa kuvaa');
  assert.equal(saapumisenKuva(1 + ETUSIVUN_KUVAKIERTO.length).avain, eka.avain, 'kierto');
  assert.equal(saapumisenKuva(0), null, 'lähtökaupunki ei tuo kuvaa');
  /*
   * KUVATEKSTI ON KUVAPUTKEN SANASTA SANAAN (omistajan pysyvä sääntö),
   * muotoa "Isoisä, Aden, 1873" tai "Isoisän ottama kuva, Benares,
   * 1873": paikka + vuosi, ei koskaan ulkonäön kuvausta (Raamattu:
   * ISOISA JAA ARVOITUKSEKSI, omistaja 5.9.2026 klo 22.55).
   */
  for (const kuva of ETUSIVUN_ISOISAKUVAT) {
    assert.match(kuva.kuvateksti, /^(Isoisä, |Isoisän ottama kuva, )?.+, 1873$/,
      `kuvateksti "${kuva.kuvateksti}" ei ole muotoa [Isoisä, ]paikka, 1873`);
    assert.doesNotMatch(kuva.kuvateksti, /kasvo|parta|silm|hattu|pitkä|lyhyt/i,
      'lappu ei kuvaile isoisän ulkonäköä (ISOISA JAA ARVOITUKSEKSI)');
    assert.ok(kuva.osoite.startsWith('https://'), 'osoite muodostetaan pakan juuresta');
    assert.ok(kuva.tunnus && 'kaupunki' in kuva, 'pakka on datavetoinen: tunnus ja kaupunki');
  }
  // Kaupungin oma kuva voittaa kierron: Bombay-kuva on Mumbain jaksolla.
  const mumbai = ETUSIVUN_REITTI.indexOf('mumbai');
  assert.equal(saapumisenKaupunki(reitti, mumbai), 'mumbai');
  assert.equal(saapumisenKuva(mumbai, 'mumbai').kuva.kaupunki, 'mumbai',
    'kaupungille merkitty kuva tulee juuri sen laskeutumisella');
});

/*
 * SÄVY ON KUVAKOHTAINEN (omistaja 5.9.2026 klo 22.50: kuvaputken uudet
 * kuvat ovat *"aika vaaleita (vinjetti vaaleaan)"*), jotta vaaleat eivät
 * haalistu näkymättömiin tummien vedosten asetuksilla.
 */
test('haaleus ja sumennus tulevat pakasta ja vaalea kuva jää selvemmäksi', () => {
  assert.ok(ISOISAKUVAN_SAVYT.vaalea.haalea > ISOISAKUVAN_SAVYT.tumma.haalea,
    'vaalea vinjettikuva ei saa haalistua yhtä paljon kuin tumma vedos');
  assert.ok(ISOISAKUVAN_SAVYT.tumma.haalea >= 0.45 && ISOISAKUVAN_SAVYT.tumma.haalea <= 0.6,
    'tumma vedos on omistajan haarukassa (haalea, muttei näkymätön)');
  assert.ok(ISOISAKUVAN_SAVYT.tumma.sumennus > 0 && ISOISAKUVAN_SAVYT.vaalea.sumennus > 0,
    'sumennus on molemmilla sävyillä päällä');
  const oma = isoisakuvanSavy({ savy: 'vaalea', haalea: 0.7, sumennus: 2 });
  assert.deepEqual(oma, { haalea: 0.7, sumennus: 2 }, 'kuvakohtainen arvo voittaa sävyn');
  assert.deepEqual(isoisakuvanSavy(null), ISOISAKUVAN_SAVYT.tumma, 'oletus ei kaadu');
});

/*
 * PINO SIKIN SOKIN TEKSTIN ALLE (omistaja 5.9.2026 klo 22.45:
 * *"isoisän kuvat voivat olla blurrattuja ja haalealla ja jäädä tekstin
 * alle"*, *"ne voisivat pinoutua hieman sikin sokin toistensa
 * päälle"*). Vartioidaan neljä asiaa: pinon katto, deterministinen
 * asento, kerrosjärjestys (teksti > kuvat > video) ja se, ettei
 * esteväistöä ole enää missään.
 */
test('pinon asento on siemenellinen ja pysyy annetuissa rajoissa', () => {
  for (let nro = 1; nro <= 30; nro++) {
    const a = pinonAsento(nro);
    assert.deepEqual(a, pinonAsento(nro), `laskeutuminen ${nro} ei ole deterministinen`);
    assert.ok(Math.abs(a.dx) <= PINON_SIIRTO && Math.abs(a.dy) <= PINON_SIIRTO,
      `siirto ${a.dx}/${a.dy} ylittää ±${PINON_SIIRTO} %`);
    assert.ok(Math.abs(a.kulma) <= PINON_KULMA, `kallistus ${a.kulma} ylittää ±${PINON_KULMA}°`);
  }
  // Sikin sokin: peräkkäiset kortit eivät laskeudu samaan asentoon.
  const asennot = new Set();
  for (let nro = 1; nro <= PINON_KATTO; nro++) {
    const a = pinonAsento(nro);
    asennot.add(`${a.dx},${a.dy},${a.kulma}`);
    if (nro > 1) {
      const e = pinonAsento(nro - 1);
      assert.ok(Math.hypot(a.dx - e.dx, a.dy - e.dy) > 0.5 || Math.abs(a.kulma - e.kulma) > 1,
        `laskeutumiset ${nro - 1} ja ${nro} ovat käytännössä samassa asennossa`);
    }
  }
  assert.equal(asennot.size, PINON_KATTO, 'jokainen pinon kortti on omassa asennossaan');
  assert.ok(PINON_KATTO === 5 && PINON_LASKU_MS >= 600 && PINON_LASKU_MS <= 800,
    'katto on viisi korttia ja laskeutuminen 600–800 ms');
  assert.ok(PINON_HAIVYTYS_MS > 0);
});

test('kuvat pinoutuvat haaleina ja sumeina tekstin alle', () => {
  const css = lue('../css/styles.css');
  const lahde = lue('../js/etusivupallo.js');

  /* KERROSJÄRJESTYS: teksti > kuvat > verho > video. */
  const pino = css.match(/\.etusivupallo-pino \{[\s\S]*?\n\}/)[0];
  const pallo = css.match(/\.etusivupallo \{[\s\S]*?\n\}/)[0];
  const zLuku = (osa) => Number(osa.match(/z-index: (-?\d+);/)[1]);
  const zPino = zLuku(pino);
  const zPallo = zLuku(pallo);
  const zTeksti = zLuku(css.match(
    /\.intro\.intro-pallolla \.intro-kartta,\n\.intro\.intro-pallolla \.intro-arkki \{[^}]*\}/,
  )[0]);
  const zVerho = zLuku(css.match(/\.intro\.intro-pallolla \.intro-verho \{[\s\S]*?\n\}/)[0]);
  assert.ok(zTeksti > zPino && zPino > zVerho && zVerho > zPallo,
    `kerrosjärjestyksen on oltava teksti (${zTeksti}) > kuvat (${zPino}) > verho (${zVerho}) `
    + `> video (${zPallo})`);

  /* PAIKKA JA KOKO: kiinteä alue, selvästi isompi kuin ennen. */
  assert.match(pino, /position: absolute;/);
  assert.match(pino, /bottom: /, 'pino on paneelin alaosassa');
  const leveys = pino.match(/width: clamp\((\d+)px, (\d+)vw, (\d+)px\);/);
  assert.ok(leveys, 'koko annetaan clampilla eikä JS:llä');
  assert.ok(Number(leveys[1]) >= 150,
    `puhelimen kortti ${leveys[1]}px ei ole isompi kuin entinen (110px)`);
  const poyta = css.match(
    /@media \(min-width: 900px\) \{\n {2}\/\*[\s\S]*?\n {2}\.etusivupallo-pino \{[\s\S]*?\n {2}\}\n\}/,
  );
  assert.ok(poyta, 'työpöydälle on oma media query');
  assert.match(poyta[0], /right: /, 'työpöydällä pino on paneelin oikeassa alaneljänneksessä');
  assert.match(poyta[0], /width: clamp\(300px, 46vw, 600px\);/);

  /* HAALEA JA SUMEA: arvot tulevat pakasta muuttujina, oletus varana. */
  const kuva = css.match(/\.etusivupallo-kuva img \{[\s\S]*?\n\}/)[0];
  assert.match(kuva, /opacity: calc\(var\(--kuvan-haalea, 0\.55\) \+ var\(--pino-harsokorjaus, 0\)\);/,
    'haaleus tulee pakasta, harsokorjaus pienten ruutujen tekstiharsolle');
  assert.match(kuva, /filter: blur\(var\(--kuvan-sumennus, 1\.5px\)\);/,
    'sumennus on <img>-elementillä (iOS-sääntö koskee SVG-kerrosta)');
  assert.match(css, /iOS-SÄÄNNÖN POIKKEUS/, 'poikkeus on perusteltava kommentissa');
  assert.match(lahde, /--kuvan-haalea:\$\{savy\.haalea\}/);
  assert.match(lahde, /--kuvan-sumennus:\$\{savy\.sumennus\}px/);

  /* KUVATEKSTI VAIN PÄÄLLIMMÄISELLE (luettavuus). */
  assert.match(css, /\.etusivupallo-kuva figcaption \{[\s\S]*?white-space: nowrap;/);
  assert.match(css, /\.etusivupallo-kuva\.uusin\.laskeutunut figcaption \{ opacity: 1; \}/,
    'lappu näkyy vain päällimmäisellä kortilla');

  /* PINO: katto, siemenellinen asento, pehmeä laskeutuminen. */
  assert.match(lahde, /while \(pinossa\.length > PINON_KATTO\) \{/,
    'pinon katto leikkaa alimman kortin pois');
  assert.match(lahde, /alin\.classList\.add\('haipyy'\);/, 'alin häivytetään pehmeästi');
  assert.match(lahde, /const asento = pinonAsento\(nro\);/,
    'asento on siemenellinen eikä Math.random');
  assert.doesNotMatch(lahde, /Math\.random/, 'satunnaisuus on siemenellistä (testit vakaita)');
  assert.match(css, new RegExp(`transition: opacity ${PINON_LASKU_MS}ms`),
    'CSS:n laskeutuminen ja moduulin vakio ovat samat');

  /* EI ESTEVÄISTÖÄ EIKÄ PYSTYSIIRTOA: kuvat saavat jäädä tekstin alle. */
  assert.doesNotMatch(lahde, /varmistaPaikka|valitseKuvapaikka|sijoitaKuva/,
    'esteväistö ja pystysiirto poistuivat kokonaan');
  assert.doesNotMatch(css, /--etusivupallo-kuva-siirto/, 'pystysiirron muuttujaa ei enää ole');
  assert.doesNotMatch(lahde, /addEventListener\?\.\('resize'/,
    'asettelun kuuntelija poistui esteväistön mukana');

  /* PINO SÄILYY LOOPIN YLI (perustelu kommentissa). */
  assert.match(lahde, /KIERROS ALKOI ALUSTA — PINO JÄÄ/,
    'loopin vaihteessa pinoa ei tyhjennetä, katto hoitaa');
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
  /*
   * AALTO 3A: lähtökaupunki valitaan pallolta. Nappi ei enää herätä
   * karttaa pallolaudalla — herätys jäi vain vanhalle polulle
   * (?lauta=kartta ja pallon varapolku, aloitaTasokartalta).
   */
  const nappi = ui.match(/ {2}aloitaKartalta\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.doesNotMatch(nappi, /this\.kartta\.heraa\(\)/,
    'Valitse aloituskaupunki ei saa herättää tasokarttaa pallolaudalla');
  assert.match(nappi, /if \(this\.aloituslentoPallolla\(\)\) \{ this\.aloitaPallolta\(\); return; \}/,
    'pallolaudalla valinta avautuu pallolle');
  const vanhaPolku = ui.match(/ {2}aloitaTasokartalta\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.match(vanhaPolku, /if \(this\.kartta\.lepotila && !this\.pallolauta\) \{\n\s*this\.kartta\.heraa\(\);/,
    'vanha polku herättää tasokartan lepotilasta');
});

test('ämpärin polut, saumavartija ja tiedostonimet ovat samat työkalussa ja pelissä', () => {
  const tyokalu = lue('../tools/tee-etusivupallo.mjs');
  assert.match(tyokalu, /ETUSIVUPALLO_VERSIO/, 'työkalu lukee version moduulista');
  assert.match(tyokalu, /kameranNakyma/, 'kamera lasketaan samasta funktiosta kuin pelissä');
  // Saumaton looppi: kierto tarkistetaan ennen kuin satoja kehyksiä poltetaan.
  assert.match(tyokalu, /Math\.abs\(KIERTO - KIERROKSEN_ASTEET\) > 1e-6/,
    'työkalu kieltäytyy, jos reitti ei kierrä tasan 360°');
  assert.match(tyokalu, /const KESTO = reitti\.kesto;/,
    'videon kesto on kierroksen kesto — ei kehysmäärä jaettuna fps:llä');
  assert.match(tyokalu, /const TAAJUUS = KEHYKSIA \/ KESTO;/);
  assert.match(tyokalu, /'-framerate', TAAJUUS\.toFixed\(6\)/,
    'ffmpeg saa murtolukuisen taajuuden, jotta videon kesto on tasan kierros');
  assert.doesNotMatch(tyokalu, /window\.haivyta\(/,
    'videoon ei enää polteta sauman häivytystä — looppi on saumaton');
  assert.match(tyokalu, /const SAUMA = lippu\('sauma'\);/, '--sauma-koe on olemassa');
  assert.match(tyokalu, /saumakehykset eroavat tavutasolla/,
    'saumakoe kaatuu, jos ensimmäinen ja viimeinen kehys eroavat');
  assert.equal(ETUSIVUPALLO_TIEDOSTOT.juliste, 'juliste.jpg');
  const wf = lue('../.github/workflows/tee-etusivupallo.yml');
  for (const nimi of Object.values(ETUSIVUPALLO_TIEDOSTOT)) {
    assert.ok(wf.includes(nimi), `workflow ei vie tiedostoa ${nimi}`);
  }
  assert.match(wf, /etusivu\.json/, 'luettelo on vietävä, muuten kerros ei rakennu');
  // Versio luetaan js:stä: työkalu kirjoittaa avain.txt:n, jota workflow lukee.
  assert.match(wf, /avain="\$\(cat etusivupallo-ulos\/avain\.txt\)"/,
    'workflow lukee ämpärin polun (ja siis version) työkalun tulosteesta');
  assert.match(tyokalu, /writeFileSync\(join\(ULOS, 'avain\.txt'\), AVAIN\)/);
  assert.ok(HAIVYTYS_S > 0 && HAIVYTYS_S < 3);
});


/* ============ JULISTE NÄKYY HETI, VIDEO VAIHTUU SEN TILALLE ======== */

/*
 * OMISTAJA 5.9.2026 ilta, sanatarkasti: *"tuon etusivun voisi animoida
 * niin että pallo lähtee heti pyörimään"*. Ennen koko kerros odotti
 * videon loadeddata-tapahtumaa `nakyy`-luokan takana — ja koska
 * peittävyys nollattiin JUURELTA, myös videon oma poster oli piilossa:
 * etusivu oli ensimmäiset sekunnit tyhjä pergamentti. Vartiot pitävät
 * huolen, ettei odotus palaa hiljaa takaisin.
 */
test('juliste on ruudulla ennen videon latautumista', () => {
  const lahde = lue('../js/etusivupallo.js');
  const avaa = lahde.match(/export async function avaaEtusivupallo\([\s\S]*$/)[0];
  // Juliste on aina DOMissa (myös liikkeen kanssa) ja videon ALLA.
  assert.match(avaa, /juuri\.appendChild\(juliste\);\n {2}if \(!vahennettyLiike\) juuri\.appendChild\(video\);/,
    'juliste ei ole oma kerroksensa videon alla');
  assert.match(avaa, /juliste\.addEventListener\('load', naytaJuliste/,
    'juliste ei tule näkyviin kuvan latatuttua');
  // `nakyy` lisätään DOMiin liitettäessä, ENNEN videon odotusta.
  const ennenOdotusta = avaa.split('const valmis = await new Promise')[0];
  assert.match(ennenOdotusta, /kotelo\.insertBefore\(juuri, kotelo\.firstChild\);[\s\S]*?juuri\.classList\.add\('nakyy'\);/,
    'kerros odottaa yhä videota ennen kuin se näkyy (poster jää piiloon)');
  assert.match(ennenOdotusta, /avaus\?\.classList\.add\('intro-pallolla'\);/,
    'sumuverhon kevennys jäisi odottamaan videota');
  // Video häivytetään julisteen päälle vasta kun se soi.
  assert.match(avaa, /await video\.play\(\)[\s\S]{0,220}?video\.classList\.add\('nakyy'\);/,
    'video ei vaihdu julisteen tilalle pehmeästi');
  // Kone ja viiva eivät saa seistä julisteen päällä ennen ensimmäistä
  // piirtoa (muunnos puuttuu → kone olisi nurkassa).
  assert.match(avaa, /svg\.style\.opacity = '0';/,
    'SVG-kerros näkyisi ennen ensimmäistä piirtoa');
  // Latausvirhe häivyttää kerroksen pois eikä napsauta sitä.
  assert.match(avaa, /juuri\.classList\.remove\('nakyy'\);[\s\S]{0,220}?setTimeout\(\(\) => juuri\.remove\(\), KERROKSEN_ILMESTYS_MS/,
    'lataamatta jäänyt video poistaisi näkyvän kerroksen välähtäen');
});

test('css häivyttää julisteen ja videon samalla luvulla kuin moduuli', () => {
  const css = lue('../css/styles.css');
  const lohko = css.match(/\.etusivupallo-juliste,\n\.etusivupallo-video \{[\s\S]*?\n\}/)[0];
  assert.match(lohko, /opacity: 0;/, 'kerrokset eivät ala läpinäkyvinä');
  assert.match(lohko, new RegExp(`transition: opacity ${KERROKSEN_ILMESTYS_MS}ms`),
    'css:n häivytys ei ole sama luku kuin KERROKSEN_ILMESTYS_MS');
  assert.match(css, /\.etusivupallo-juliste\.nakyy,\n\.etusivupallo-video\.nakyy \{ opacity: 1; \}/,
    'nakyy-luokka ei tuo kerrosta esiin');
});
