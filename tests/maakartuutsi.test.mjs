/*
 * MAAN NIMI, INFOLAATIKKO JA MAALEHTILINKKI TAKAISIN;
 * SAAPUMISZOOM MYÖS KEHITTÄJÄN MAAILMATILAAN
 * (omistaja 11.9.2026 ilta, Raamattu, sanatarkasti: *"Pelistä on muuten
 * hävinnyt pallokartan uudistuksen myötä maan nimi ja infolaatikko ja
 * linkki maalehteen. Ne olivat ennen vasemmassa alakulmassa. Ne saisi
 * palauttaa näkyviin. Kartta saisi muuten zoomautuu niin kun saavutaan
 * uuteen kaupunkiin niin että maa näkyy mahdollisimman isoksi
 * zoomattuna näytöllä. Normaali pelissä tämä tulee jo mutta kehittäjä
 * näkymään tämä pitää lisätä kun maailma tila on päällä."*).
 *
 * MITÄ NÄMÄ TESTIT VARTIOIVAT
 *
 *   1. KARTUUTSI ON OLEMASSA PALLOLAUDALLA. Kartuutsi, maataulu ja sen
 *      maalehtilinkki ovat js/fokusmitat.js:n elementtejä, ja niiden
 *      ainoa ehto oli maan ikkuna (FOKUS_POHJAT). Pallolaudalla
 *      tasokartta nukkuu, jolloin `fokusPohjaBbox` jää pysyvästi
 *      nulliksi — juuri siksi ne katosivat. Pallolaudalla ehtona on
 *      pelkkä maa (pallolaudanMaa).
 *   2. MAA SEURAA PELAAJAA ja tuntee samat kaksi ei-pelitilaa kuin
 *      tasokartan maan ikkuna (lähtövalinta, aloituslento) sekä
 *      katselutilan.
 *   3. LAATIKKO ON VASEMMASSA ALANURKASSA eikä mittajana/viivaimet
 *      seuraa mukana pallolle (ne lukevat tasokartan projektiota).
 *   4. MAALEHTILINKKI on taulun "+" ja se kutsuu ui.avaaMaalehteä.
 *   5. SAAPUMISRAJAUS on maan laatikko, ja se sovittuu ruutuun
 *      MOLEMMISSA suunnissa kaikilla kolmella mitatulla näytöllä.
 *   6. RAJAUS LAUKEAA MYÖS KEHITTÄJÄN MAAILMATILASSA: kaupungin
 *      napautus siellä ajaa saapumisrajauksen eikä jätä kameraa
 *      siihen leveyteen, jossa se jo oli.
 *
 * Selainpuoli (ulkoasu, päällekkäisyydet, mitatut peitto-osuudet) on
 * katsottu Chromiumilla kolmella näyttömitalla; nämä testit vartioivat
 * sen koneellisesti tarkistettavan osan.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { maanLautalaatikko, puraMaanRenkaat } from '../js/maanaariviivat.js';
import { pallolaudanMaa } from '../js/fokusmitat.js';
import {
  PALLOLAUDAN_LEVEYS, PALLOLAUDAN_SAAPUMISLEVEYS, SAAPUMISRAJAUKSEN_MARGINAALI,
  SAAPUMISRAJAUKSEN_MAX, korkeusLeveydesta, leveysKorkeudesta,
} from '../js/pallolauta/kamera.js';
import { packById } from '../js/pack.js';

const JUURI = new URL('..', import.meta.url).pathname;
const lue = (polku) => readFileSync(`${JUURI}${polku}`, 'utf8');
const data = JSON.parse(lue('assets/data/maapolygonit.json'));

const fokusmitat = lue('js/fokusmitat.js');
const lauta = lue('js/pallolauta/lauta.js');
const kamera = lue('js/pallolauta/kamera.js');
const siirto = lue('js/pallolauta/siirto.js');
const tyylit = lue('css/styles.css');

const pack = packById('maailmankartta');
const KAUPUNKI = Object.fromEntries(pack.cities.map((c) => [c.id, c]));

/** Pelin kaltainen ui-tynkä: vain ne kentät, joita pallolaudanMaa lukee. */
function teeUi({ kaupunki = 'ateena', phase = 'action', ...lisa } = {}) {
  return {
    pallolauta: {},
    game: { phase, pack, cityOf: () => (kaupunki ? KAUPUNKI[kaupunki] : null) },
    ...lisa,
  };
}

/* ================= 1. kartuutsi on olemassa pallolaudalla ============ */

test('kartuutsin ehto pallolaudalla on maa, ei maan ikkuna', () => {
  assert.match(
    fokusmitat,
    /const pallolla = Boolean\(ui\.pallolauta\);/,
    'ajaFokusmitat ei tunne pallolautaa — kartuutsi jää tasokartan ehtojen taakse',
  );
  assert.match(
    fokusmitat,
    /const nakyy = pallolla \? Boolean\(iso\) : Boolean\(pohja && iso && FOKUS_POHJAT\[iso\]\);/,
    'pallolaudalla näkyvyysehdon pitää olla pelkkä maa',
  );
  // Kalusteet päivitetään pallolaudan omasta ohjauksesta, ennen
  // avaintarkistusta (puraLauta voi nollata ne ilman pelitilan muutosta).
  const kohta = lauta.indexOf('paivitaFokusmitat(ui);');
  const avain = lauta.indexOf('if (avain === merkkiAvain) return;');
  assert.ok(kohta > 0, 'pallolauta ei kutsu paivitaFokusmitat-funktiota');
  assert.ok(kohta < avain, 'kutsu on avaintarkistuksen jälkeen — kalusteet eivät palaisi purun jälkeen');
  assert.match(lauta, /nollaaFokusmitat\(ui\);/, 'laudan purku ei poista kartuutsia karttaruudusta');
});

/* ================= 2. maa seuraa pelaajaa =========================== */

test('maa luetaan pelaajan kaupungista ja vaihtuu sen mukana', () => {
  assert.equal(pallolaudanMaa(teeUi({ kaupunki: 'ateena' })), 'GRC');
  assert.equal(pallolaudanMaa(teeUi({ kaupunki: 'sofia' })), 'BGR');
  assert.equal(pallolaudanMaa(teeUi({ kaupunki: 'lontoo' })), 'GBR');
});

test('kaksi ei-pelitilaa ja katselu jättävät kartuutsin pois', () => {
  assert.equal(pallolaudanMaa(teeUi({ phase: 'pickstart' })), null, 'lähtövalinnassa maata ei ole');
  assert.equal(
    pallolaudanMaa(teeUi({ aloituslentoKesken: true })), null,
    'aloituslento paljastaisi määränpään ennen kuin kone on perillä',
  );
  assert.equal(pallolaudanMaa(teeUi({ katselu: true })), null, 'katselutila ei ole peli');
  assert.equal(pallolaudanMaa(teeUi({ kaupunki: null })), null, 'ilman kaupunkia ei ole maata');
  const ilmanLautaa = teeUi();
  ilmanLautaa.pallolauta = null;
  assert.equal(pallolaudanMaa(ilmanLautaa), null, 'tasokartalla ehto on maan ikkuna, ei tämä');
});

/* ================= 3. paikka ja pallon karsinta ===================== */

test('kartuutsi ankkuroituu karttaruudun vasempaan alanurkkaan', () => {
  const sailio = /\.fokusmitat \{([^}]*)\}/.exec(tyylit)?.[1] ?? '';
  assert.match(sailio, /position: absolute/);
  assert.match(sailio, /left: 0\.7rem/, 'kartuutsi ei ole vasemmassa laidassa');
  assert.match(sailio, /bottom: 0\.9rem/, 'kartuutsi ei ole alalaidassa');
  // Maataulu nousee kartuutsin päältä samasta nurkasta.
  assert.match(tyylit, /\.fokus-maataulu \{[^}]*left: 0\.7rem/s, 'maataulu ei ole samassa nurkassa');
});

test('mittajana ja asteviivaimet eivät seuraa pallolle', () => {
  assert.match(
    fokusmitat,
    /if \(pallolla\) \{\s*\n\s*if \(ui\.fokusJana\) ui\.fokusJana\.hidden = true;\s*\n\s*if \(ui\.fokusViivaimet\) ui\.fokusViivaimet\.hidden = true;/,
    'mittajana ja viivaimet lukevat tasokartan projektiota — pallolla ne valehtelisivat',
  );
});

/* ================= 4. maalehtilinkki ================================ */

test('maataulun "+" avaa maalehden', () => {
  assert.match(fokusmitat, /luo\('button', 'fokus-maataulu-lehti', '\+'\)/);
  assert.match(
    fokusmitat,
    /const iso = ui\.fokusMaatauluIso;[\s\S]{0,120}ui\.avaaMaalehti\?\.\(iso\)/,
    'lehtinappi ei kutsu ui.avaaMaalehteä taulun maalla',
  );
  assert.match(
    lue('js/ui.js'),
    /avaaMaalehti\(iso, asetukset\) \{ return avaaMaalehti\(this, iso, asetukset\); \}/,
    'ui.avaaMaalehti puuttuu — linkki ei avaisi mitään',
  );
});

/* ================= 5. saapumisrajaus = maan laatikko ================ */

test('maan lautalaatikko kattaa maan ja jättää merentakaiset osat pois', () => {
  const laatikko = (id) => {
    const c = KAUPUNKI[id];
    return maanLautalaatikko(data, pack.map.cityCountry[id], { kohta: { x: c.x, y: c.y } });
  };
  const grc = laatikko('ateena');
  assert.ok(grc.w > 0 && grc.h > 0, 'Kreikalle ei tullut laatikkoa');
  // Kreikan manner ja saaret (Kreeta mukana): laatikko peittää molemmat.
  const kaikki = puraMaanRenkaat(data, 'GRC').flat();
  const sisalla = kaikki.filter(([x, y]) => x >= grc.x && x <= grc.x + grc.w
    && y >= grc.y && y <= grc.y + grc.h);
  assert.ok(sisalla.length / kaikki.length > 0.99, 'Kreikan saaristo jäi rajauksen ulkopuolelle');

  // Ranskan aineistossa on Guayana ja Réunion; Pariisiin saavuttaessa
  // rajaus on MANNER-Ranska eikä puoli maailmaa.
  const fra = laatikko('pariisi');
  assert.ok(fra.w < 900, `Ranskan rajaus levisi merentakaisiin osiin: ${Math.round(fra.w)}`);
  assert.ok(fra.h < 900, `Ranskan rajaus levisi merentakaisiin osiin: ${Math.round(fra.h)}`);

  // Tuntematon maa on turvallinen tila, ei virhe.
  assert.equal(maanLautalaatikko(data, 'XXX'), null);
  assert.equal(maanLautalaatikko(null, 'GRC'), null);
});

test('sauman yli ulottuva maa ei saa maailman levyistä laatikkoa', () => {
  // Fidži ja Venäjä ovat laudan molemmissa laidoissa; pelkkä min/max
  // antaisi niille lähes koko laudan leveyden.
  for (const iso of ['FJI', 'RUS']) {
    const b = maanLautalaatikko(data, iso);
    if (!b) continue;
    assert.ok(
      b.w < PALLOLAUDAN_LEVEYS * 0.95,
      `${iso}: laatikko ${Math.round(b.w)} on lähes koko lauta — sauma jäi purkamatta`,
    );
  }
});

test('maan laatikko mahtuu ruutuun molemmissa suunnissa kolmella näytöllä', () => {
  const vara = 1 + 2 * SAAPUMISRAJAUKSEN_MARGINAALI;
  const NAYTOT = [[834, 1194], [1194, 834], [390, 844]];
  for (const id of ['ateena', 'sofia', 'pariisi', 'rooma']) {
    const c = KAUPUNKI[id];
    const bbox = maanLautalaatikko(data, pack.map.cityCountry[id], { kohta: { x: c.x, y: c.y } });
    assert.ok(bbox, `${id}: ei laatikkoa`);
    for (const [w, h] of NAYTOT) {
      // Sama kaava kuin kameranKohde (js/pallolauta/kamera.js).
      const leveys = Math.max(bbox.w * vara, (bbox.h * vara * w) / h);
      const kuvasuhde = w / h;
      const korkeus = korkeusLeveydesta(leveys, { kuvasuhde });
      const nakyvaLev = leveysKorkeudesta(korkeus, { kuvasuhde });
      const nakyvaKork = nakyvaLev / kuvasuhde;
      assert.ok(
        nakyvaLev >= bbox.w - 1e-6,
        `${id} ${w}x${h}: maa (${bbox.w.toFixed(0)}) ei mahdu leveyteen ${nakyvaLev.toFixed(0)}`,
      );
      assert.ok(
        nakyvaKork >= bbox.h - 1e-6,
        `${id} ${w}x${h}: maa (${bbox.h.toFixed(0)}) ei mahdu korkeuteen ${nakyvaKork.toFixed(0)}`,
      );
      /*
       * "MAHDOLLISIMMAN ISONA": tiukempi suunta täyttää ruudun
       * marginaalia vaille. Ilman tätä ehtoa rajaus voisi mahtua
       * ruutuun olemalla vain kaukana.
       */
      const tayttoLev = bbox.w / nakyvaLev;
      const tayttoKork = bbox.h / nakyvaKork;
      assert.ok(
        Math.max(tayttoLev, tayttoKork) > 0.85,
        `${id} ${w}x${h}: maa täyttää vain ${(Math.max(tayttoLev, tayttoKork) * 100).toFixed(0)} % tiukemmasta suunnasta`,
      );
    }
  }
});

test('pallolta näkymätön maa saa entisen kaupunkinäkymän', () => {
  /*
   * Venäjä on 171° ja Yhdysvallat 121° leveä: pallosta näkyy kerrallaan
   * vajaa puolikas, joten niiden laatikkoa ei voi rajata — rajaus
   * karkaisi maailmankuvaksi. Katto on kameran raja (kamera.js).
   */
  assert.equal(SAAPUMISRAJAUKSEN_MAX, 2000);
  assert.match(
    kamera,
    /if \(tarve <= SAAPUMISRAJAUKSEN_MAX\) \{/,
    'kamera ei tunne saapumisrajauksen kattoa',
  );
  const vara = 1 + 2 * SAAPUMISRAJAUKSEN_MARGINAALI;
  const yli = [];
  for (const iso of Object.keys(data.maat)) {
    const b = maanLautalaatikko(data, iso);
    if (b && b.w * vara > SAAPUMISRAJAUKSEN_MAX) yli.push(iso);
  }
  assert.deepEqual(yli.sort(), ['CAN', 'CHN', 'GRL', 'RUS', 'USA'],
    'katon ylittävien maiden joukko muuttui — mittaa rajaus uudelleen');
});

test('kamera ottaa saapumisrajauksen laatikkona ja säilyttää varapolun', () => {
  assert.ok(SAAPUMISRAJAUKSEN_MARGINAALI > 0 && SAAPUMISRAJAUKSEN_MARGINAALI < 0.2,
    'marginaali ei ole "mahdollisimman iso" eikä nollakaan');
  assert.match(
    kamera,
    /const kotiin = \(\{ kesto = 0, bbox = null \} = \{\}\)/,
    'kamera.kotiin ei ota laatikkoa vastaan',
  );
  assert.match(
    kamera,
    /if \(bbox\?\.w > 0 && bbox\?\.h > 0\) \{[\s\S]{0,400}?ajaKamera\(\{ bbox, marginaali: SAAPUMISRAJAUKSEN_MARGINAALI \}/,
  );
  // Ilman laatikkoa entinen kaupunkinäkymä pätee yhä.
  assert.match(kamera, /leveys: PALLOLAUDAN_SAAPUMISLEVEYS, saapuminen: true/);
  assert.ok(PALLOLAUDAN_SAAPUMISLEVEYS > 0);
  // Laatikko luetaan maapolygoneista laudalla, ei kamerassa.
  assert.match(lauta, /const saapumisrajaus = async \(\) => \{/);
  assert.match(lauta, /maanLautalaatikko\(data, iso, \{ kohta \}\)/);
  assert.match(lauta, /kamera\.kotiin\(\{\s*\n?\s*kesto, bbox: await saapumisrajaus\(\),/);
});

/* ================= 6. myös kehittäjän maailmatilassa ================ */

test('kehittäjän maailmatilan hyppy ajaa saapumisrajauksen', () => {
  assert.match(
    lauta,
    /const maailmahyppy = kehittajaTilaPaalla\(\) && kehittajaMaailmaPaalla\(\) && !ui\.katselu/,
    'maailmanäkymän hyppyä ei eroteta muusta napautuksesta',
  );
  /*
   * Ajo tulee teleporttihaarasta (`paivita`), joka näkee jo uuden
   * paikan: napautuksesta ajettu rajaus osuisi vielä lähtömaahan.
   */
  assert.match(
    lauta,
    /if \(nappulanPaikka !== null && nappulanPaikka !== posAvain\) \{\s*\n\s*void saavu\(\{ kesto: PALLOKAMERAN_AJO_MS \}\);/,
    'teleportti (kehittäjäsiirto, tallenteen lataus) ei aja saapumisrajausta',
  );
  // Vanha "jää siihen leveyteen, jossa jo olet" ei saa enää osua hyppyyn.
  const hyppy = lauta.indexOf('if (maailmahyppy) {');
  const pysy = lauta.indexOf('leveys: kamera.kameranTila()?.leveys');
  assert.ok(hyppy > 0 && pysy > hyppy, 'paikallaan pysyvä zoomi ajetaan yhä ennen hyppyä');
});

test('pelin oma lento saapuu rajaukseen, avauslento pitää oman maalinsa', () => {
  assert.match(
    siirto,
    /if \(omaKamera\) void kamera\.kotiin\(\{ kesto: PALLOKAMERAN_AJO_MS \}\);\s*\n\s*else void lauta\.saavu\(\{ kesto: PALLOKAMERAN_AJO_MS \}\);/,
    'lennon laskeutuminen ei aja saapumisrajausta (tai avauslento menettää nolla-ajonsa)',
  );
});
