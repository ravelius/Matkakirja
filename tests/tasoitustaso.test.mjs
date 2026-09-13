/*
 * TASOITUSTASO — kohdemaa alkuperäisenä, muut maat kermalla
 * (karttauudistus, erä 1c; omistajan PÄÄTÖS 4 13.9.2026 klo 14.10 UTC,
 * sanatarkasti: *"Jätä ranska alkuperäiseen. Kaikki muut ihan kamalia.
 * Poistetaan muista maista korkeus erot kokonaan tai lähes
 * kokonaan."*).
 *
 * === MITÄ TÄMÄ VARTIOI ==============================================
 *
 * Neljä asiaa, ja kolme niistä voi rikkoutua HILJAA — ilman
 * virheilmoitusta, pelkkänä kartalta kadonneena päätöksenä:
 *
 *   1. PALETTI ON OLEMASSA JA KERMA ON PAPERIA VAALEAMPI. Jos kerma
 *      valuisi paperin sävyyn, tasoitus TUMMENTAISI naapurien tasaisia
 *      alankoja — juuri se virhe, jonka erän 1b raportti mittasi
 *      (luku 7.2: Belgian alanko rgb(246,243,204) on paperia
 *      rgb(232,220,188) vaaleampi). Kartalla se näkyisi siltä, että
 *      tasoitus toimii — paitsi siellä, missä maa on tasaista.
 *
 *   2. TASOITUSPALETTI EI SAA PÄÄTYÄ MAASTOMOOTTORILLE. Siinä ei ole
 *      asteikkoa eikä syvyyttä (se ei piirrä maastoa), joten moottori
 *      lukisi `paletti.asteikko`ksi undefinedin. Virheen on oltava
 *      äänekäs.
 *
 *   3. LUETTELON MUOTO. Peli lukee kerroksen `varitasot[ISO]`-taulusta,
 *      ja tasoitusajon on kirjattava sinne `tasoitus`, `peitto`,
 *      `kerma` ja `leikkurinPuskuri` — ilman niitä ämpäristä ei voi
 *      nähdä, millä asetuksilla laatasto on poltettu, eikä savuke voi
 *      lukea peittoa laatastosta (se lukisi omaa vakiotaan).
 *
 *   4. LEIKKURIN PUSKURI ON TASOITUKSESSA 0. Päätös 4: *"Aluevesien
 *      sininen ei kuulu alkuperäiseen."* Ilman sinistä 12 mpk:n
 *      kaistaleella ei ole tehtävää, ja jos puskuri palaisi, kaistale
 *      jäisi tasoittamatta eli näkyisi ympäristöään tummempana
 *      renkaana kohdemaan ympärillä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { KERMA, PAPERI, VARIPALETIT } from '../tools/fokuskartta/piirto.js';
import { piirraTasoitustaso } from '../tools/fokuskartta/maailmapiirto.js';

const JUURI = fileURLToPath(new URL('..', import.meta.url));
const GENERAATTORI = join(JUURI, 'tools/generoi-laattapyramidi.mjs');

const kanavat = (heksa) => [1, 3, 5].map((i) => parseInt(heksa.slice(i, i + 2), 16));

/** Tasoitusajon luettelo tuoreena; `--kuiva` ei piirrä eikä tarvitse selainta. */
function ajaLuettelo(lisa = []) {
  const kansio = mkdtempSync(join(tmpdir(), 'tasoitus-'));
  execFileSync(process.execPath, [
    GENERAATTORI, kansio,
    '--tasot', '4-5',
    '--versio', 'pohja-koe',
    '--vari', 'FRA',
    '--variversio', 'tasoitus-koe',
    '--paletti', 'tasoitus',
    '--vain-luettelo',
    ...lisa,
  ], { stdio: 'pipe' });
  return JSON.parse(readFileSync(join(kansio, 'pyramidi.json'), 'utf8'));
}

/* ----------------------------------------------- 1. kerma ja paletti */

test('kerma on paperia vaaleampi joka kanavalla', () => {
  const kerma = kanavat(KERMA);
  const paperi = kanavat(PAPERI);
  for (let i = 0; i < 3; i += 1) {
    assert.ok(kerma[i] > paperi[i],
      `kerma ${KERMA} ei ole paperia ${PAPERI} vaaleampi kanavalla ${i} `
      + `(${kerma[i]} vs. ${paperi[i]}) — silloin tasoitus tummentaisi tasaiset alangot`);
  }
});

test('tasoituspaletissa ei ole asteikkoa vaan peitto ja väri', () => {
  const p = VARIPALETIT.tasoitus;
  assert.equal(p.tasoitus, true);
  assert.equal(p.asteikko, undefined, 'tasoitus ei piirrä maastoa — asteikkoa ei saa olla');
  assert.equal(p.syvyys, undefined, 'tasoitus ei piirrä vettä — syvyyttä ei saa olla');
  assert.ok(p.peitto > 0.5 && p.peitto < 1,
    `peitto ${p.peitto} ei ole mielekäs: 0 ei tasoita ja 1 peittää rantaviivatkin`);
  assert.equal(p.vari, KERMA);
});

/* --------------------------------- 2. paletti ei saa mennä moottorille */

test('tasoituspaletti maastomoottorille on äänekäs virhe', async () => {
  const { piirraMaailma } = await import('../tools/fokuskartta/maailmapiirto.js');
  const asetukset = {
    bbox: { x: 0, y: 0, w: 10, h: 10 }, leveys: 10, variPaletti: 'tasoitus',
  };
  assert.throws(
    () => piirraMaailma({ getContext: () => null }, {}, asetukset),
    /[Tt]asoitus/,
    'tuntematon tai piirtokelvoton paletti ei saa pudota hiljaa seepiaan',
  );
});

/* ---------------------------------------- 3. piirraTasoitustaso mitat */

test('piirraTasoitustaso mitoittaa kankaan ja jättää sen läpinäkyväksi', () => {
  let tyhjennetty = null;
  const kangas = {
    width: 0,
    height: 0,
    getContext: () => ({ clearRect: (...a) => { tyhjennetty = a; } }),
  };
  // px = leveys / bbox.w = 512 / 128 = 4; korkeus = bbox.h * px = 64 * 4 = 256.
  piirraTasoitustaso(kangas, { bbox: { x: 0, y: 0, w: 128, h: 64 }, leveys: 512 });
  assert.equal(kangas.width, 512);
  assert.equal(kangas.height, 256);
  assert.deepEqual(tyhjennetty, [0, 0, 512, 256],
    'kangas on jätettävä läpinäkyväksi — kohdemaan alfa on 0');
});

/* ------------------------------------------------- 4. luettelon muoto */

test('tasoitusajo kirjaa peiton, kerman ja nollapuskurin varitasot-tauluun', () => {
  const luettelo = ajaLuettelo(['--peitto', '0.95']);
  const kirjaus = luettelo.varitasot?.FRA;
  assert.ok(kirjaus, 'varitasot.FRA puuttuu — peli ei löytäisi kerrosta');
  assert.equal(kirjaus.paletti, 'tasoitus');
  assert.equal(kirjaus.tasoitus, true);
  assert.equal(kirjaus.peitto, 0.95, 'peitto on luettava luettelosta, ei savukkeen vakiosta');
  assert.equal(kirjaus.kerma, KERMA);
  assert.equal(kirjaus.leikkurinPuskuri, 0,
    'päätös 4: aluevesien sininen ei kuulu alkuperäiseen, joten leikkuri on maan polygoni');
  assert.equal(kirjaus.vesi, null, 'tasoituksessa ei ole veden peittävyyttä');
});

test('murrettu paletti pitää aluevesipuskurinsa eikä saa tasoituskenttiä', () => {
  const kansio = mkdtempSync(join(tmpdir(), 'murrettu-'));
  execFileSync(process.execPath, [
    GENERAATTORI, kansio,
    '--tasot', '4-5', '--versio', 'pohja-koe',
    '--vari', 'FRA', '--variversio', 'murrettu-koe',
    '--paletti', 'murrettu', '--vain-luettelo',
  ], { stdio: 'pipe' });
  const kirjaus = JSON.parse(readFileSync(join(kansio, 'pyramidi.json'), 'utf8')).varitasot.FRA;
  assert.equal(kirjaus.paletti, 'murrettu');
  assert.equal(kirjaus.tasoitus, undefined);
  assert.equal(kirjaus.peitto, undefined);
  assert.ok(kirjaus.leikkurinPuskuri > 6,
    `murretun paletin leikkuri tarvitsee aluevesipuskurin (12 mpk = 6,7 yksikköä), `
    + `sai ${kirjaus.leikkurinPuskuri}`);
});

/* ------------------------------- 5. laatikko koko näkyvään alaan (luku 9) */

/*
 * MIKSI TÄMÄ VARTIO ON: omistaja näki kuvasta karttauudistus-1c-peitto085,
 * että puhelimen pystyruudulla Britannia ja Espanja jäivät tasoittamatta ja
 * keskelle jäi vaalea vyö. Syy oli laatikko: kerroin 1,15 kattaa laataston
 * laatikon, ei ruutua. `--laatikko-nakyma` kasvattaa laatikon kuvasuhteiden
 * unioniin, ja UNIONIN ON OLTAVA VÄHINTÄÄN se, minkä pelin oma kamera
 * näyttää uloimmalla sallitulla zoomilla — muuten vyö palaa. Testi laskee
 * vaatimuksen kameran omalla kaavalla (laatikonTarve), ei generaattorin
 * kopiolla siitä.
 */
test('--laatikko-nakyma kattaa kameran näkymän puhelimella ja työpöydällä', async () => {
  const { maanLautalaatikko } = await import('../js/maanaariviivat.js');
  const { ULOSZOOMAUKSEN_KERROIN } = await import('../js/pallolauta/kamera.js');
  const polygonit = JSON.parse(
    readFileSync(new URL('../assets/data/maapolygonit.json', import.meta.url), 'utf8'),
  );
  const maa = maanLautalaatikko(polygonit, 'FRA');
  assert.ok(maa?.w > 0 && maa?.h > 0, 'FRA:n laatikkoa ei saatu aineistosta');

  const laaja = ajaLuettelo(['--laatikko-nakyma']).varitasot.FRA;
  const suppea = ajaLuettelo([]).varitasot.FRA;
  assert.equal(laaja.laatikkoNakyma, true, 'luettelon on kerrottava, että laatikko on unioni');
  assert.equal(suppea.laatikkoNakyma, undefined, 'oletusajo ei saa väittää unionia');

  /* Laatikko luettelossa on lon/lat; lautayksiköt saa leveydestä. */
  const laudanLeveys = polygonit?.lauta?.leveys > 0 ? polygonit.lauta.leveys : 12000;
  const leveysYks = ((laaja.alue.lon1 - laaja.alue.lon0) / 360) * laudanLeveys;
  const suppeaYks = ((suppea.alue.lon1 - suppea.alue.lon0) / 360) * laudanLeveys;
  assert.ok(leveysYks > suppeaYks, 'unionin on oltava kerroinlaatikkoa leveämpi');

  /* Kameran kaava: näkyvä leveys = max(w·k, h·k·W/H) (kamera.js laatikonTarve). */
  const tarve = (rw, rh) => Math.max(maa.w * ULOSZOOMAUKSEN_KERROIN,
    (maa.h * ULOSZOOMAUKSEN_KERROIN * rw) / rh);
  for (const [rw, rh] of [[390, 844], [768, 1024], [1440, 900], [1920, 1080]]) {
    const nakyvaLeveys = tarve(rw, rh);
    assert.ok(leveysYks >= nakyvaLeveys - 0.5,
      `laatikko ${leveysYks.toFixed(1)} yks on kapeampi kuin ruudun ${rw}x${rh} näkymä `
      + `${nakyvaLeveys.toFixed(1)} yks — tasoittamaton kaistale jäisi ruudulle`);
  }
  /* Kapein ruutu määrää korkeuden; lat-suunta mitataan laudan y:stä. */
  const { laudanProjektio } = await import('../tools/fokuskartta/piirto.js');
  const kaava = laudanProjektio({
    tyyppi: 'miller', leveys: laudanLeveys, lon0: -175, pohjoinen: 76,
  });
  const korkeusYks = Math.abs(kaava.lautaY(laaja.alue.lat0) - kaava.lautaY(laaja.alue.lat1));
  const kapein = tarve(390, 844) * (844 / 390);
  assert.ok(korkeusYks >= kapein - 0.5,
    `laatikko ${korkeusYks.toFixed(1)} yks on matalampi kuin puhelimen näkymä `
    + `${kapein.toFixed(1)} yks — juuri tästä syntyi omistajan näkemä vaalea vyö`);
});
