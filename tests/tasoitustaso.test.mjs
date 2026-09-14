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
import { piirraTasoitustaso, polttaVariLeikkuri } from '../tools/fokuskartta/maailmapiirto.js';

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
  /* 2000 × 1000 = kuvasuhde 2,0 (kaistat-raportin suositus 1, 14.9.2026):
     rootin 2560 × 1352 on 1,89 eikä mahtunut 1,778:n laatikkoon. */
  for (const [rw, rh] of [[390, 844], [768, 1024], [1440, 900], [1920, 1080], [2000, 1000]]) {
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

/*
 * ====== ASIAKKAAN KERMA-MAALAUS (kaistat, 13.9.2026) ================
 *
 * Rootin live-QA näki v1856:ssa laajalla ruudulla suoria teräviä
 * kaistoja: laatasto loppuu laatikkoon (ja laattaruudukon reunaan), ja
 * sen ulkopuolella kartta on tasoittamaton. `maalaaTasoitus` maalaa sen
 * alan samalla kermalla ja peitolla ja piirtää laatan VAIN suojatun
 * suorakaiteen sisään.
 *
 * KAKSI ASIAA VOI RIKKOUTUA HILJAA, JA MOLEMMAT NÄKYVÄT VAIN LAAJALLA
 * RUUDULLA — eli ei yhdelläkään muulla vartijalla:
 *
 *   1. MAALAUS LAATAN PÄÄLLE. Jos maalaus tulisi laatan päälle eikä
 *      sen sijaan, peitto kertautuisi (1 − 0,15² = 0,977) siinä
 *      marginaalissa, jossa laatassa on jo täysi kerma: uusi porras
 *      vanhan tilalle. Siksi laatta piirretään leikattuna.
 *   2. MURTO-OSAPIKSELIN RAKO. Jos maalauksen ja laatan reunat
 *      laskettaisiin eri luvuista, väliin jäisi pikselin rako, jossa
 *      pohjan seepia näkyisi peittämättä — yhden pikselin terävä viiva
 *      on sekin terävä viiva.
 */
test('maalaaTasoitus: puuttuva laatta saa täyden kerman koko alalleen', async () => {
  const { maalaaTasoitus } = await import('../js/pallolaatat.js');
  const teot = [];
  const ctx = {
    set fillStyle(v) { teot.push(['fillStyle', v]); },
    fillRect: (...a) => teot.push(['fillRect', ...a]),
    drawImage: (...a) => teot.push(['drawImage', ...a]),
  };
  const tasoitus = {
    kerma: '#faf4d6', peitto: 0.85, suoja: { x: 9000, y: 9000, w: 10, h: 10 },
  };
  const maalattu = maalaaTasoitus(ctx, {
    tasoitus,
    kartta: { leveys: 512, korkeus: 512, kansX0: 0, kansY0: 0 },
    ppu: 0.9,
    arkki: { x: 0, y: 0 },
    kuva: null,
  });
  assert.equal(maalattu, true);
  assert.deepEqual(teot[0], ['fillStyle', 'rgba(250,244,214,0.85)'],
    'kerma ja peitto luetaan luettelosta eivätkä ole vakioita maalauksessa');
  assert.deepEqual(teot[1], ['fillRect', 0, 0, 512, 512],
    'suojan ulkopuolinen laatta maalataan kokonaan');
  assert.ok(!teot.some((t) => t[0] === 'drawImage'), 'ilman kuvaa ei piirretä mitään');
});

test('maalaaTasoitus: suojan sisus jää laatalle, eikä väliin jää rakoa', async () => {
  const { maalaaTasoitus } = await import('../js/pallolaatat.js');
  const teot = [];
  const ctx = {
    set fillStyle(v) { teot.push(['fillStyle', v]); },
    fillRect: (...a) => teot.push(['fillRect', ...a]),
    drawImage: (...a) => teot.push(['drawImage', ...a]),
  };
  /* Suoja 100…300 laudan yksikköinä, ppu 1 ja arkin origo 0 → 100…300 px. */
  const tasoitus = {
    kerma: '#faf4d6', peitto: 0.85, suoja: { x: 100, y: 100, w: 200, h: 200 },
  };
  maalaaTasoitus(ctx, {
    tasoitus,
    kartta: { leveys: 512, korkeus: 512, kansX0: 0, kansY0: 0 },
    ppu: 1,
    arkki: { x: 0, y: 0 },
    kuva: { width: 512, height: 512 },
  });
  const taytot = teot.filter((t) => t[0] === 'fillRect').map((t) => t.slice(1));
  assert.deepEqual(taytot, [
    [0, 0, 512, 100],     // ylä
    [0, 300, 512, 212],   // ala
    [0, 100, 100, 200],   // vasen
    [300, 100, 212, 200], // oikea
  ], 'suojan ulkopuoli maalataan neljänä kaistaleena eikä suojan päälle');
  const kuva = teot.find((t) => t[0] === 'drawImage');
  assert.deepEqual(kuva.slice(1), [{ width: 512, height: 512 }, 100, 100, 200, 200, 100, 100, 200, 200],
    'laatta piirretään VAIN suojan sisään, samoista kokonaisista pikseleistä kuin maalaus');
});

test('maalaaTasoitus: ilman tasoitusta tai kangasta ei maalata mitään', async () => {
  const { maalaaTasoitus } = await import('../js/pallolaatat.js');
  const ctx = { fillRect: () => assert.fail('ei saa maalata'), drawImage: () => assert.fail('ei saa piirtää') };
  const kartta = { leveys: 512, korkeus: 512, kansX0: 0, kansY0: 0 };
  assert.equal(maalaaTasoitus(null, { tasoitus: { suoja: {} }, kartta, ppu: 1, arkki: { x: 0, y: 0 } }), false);
  assert.equal(maalaaTasoitus(ctx, { tasoitus: null, kartta, ppu: 1, arkki: { x: 0, y: 0 } }), false);
  assert.equal(maalaaTasoitus(ctx, {
    tasoitus: { kerma: '#faf4d6', peitto: 0.85, suoja: { x: 0, y: 0, w: 1, h: 1 } },
    kartta: { leveys: 0, korkeus: 0, kansX0: 0, kansY0: 0 },
    ppu: 1,
    arkki: { x: 0, y: 0 },
  }), false);
});

/* ------------------- 6. häive piirretään laatikon reunasta ULOSPÄIN */

/*
 * MITATTU VIKA (kaistat-raportti 13.9.2026, luvut 2.1–2.2 ja
 * suositus 1). Häive piirrettiin laatikon reunasta SISÄÄNPÄIN:
 * `destination-out` pyyhki kerman TÄYTEEN juuri laatikon reunalla ja
 * nollaan `feidausReuna` yksikköä sisempänä. Laatikon ULKOPUOLELLA
 * — samassa laatassa — ei pyyhitty mitään, joten kerma oli siellä taas
 * täysi. Lopputulos oli kaksi suoraa viivaa: laatikon reunalla 37,3 ja
 * 10,2 luminanssiyksikön porras, ja laataston uloimmalla reunalla 45,3
 * ja 41,6 (siellä kerma vain loppui kesken laattojen mukana).
 *
 * OIKEA MUOTO ON KOLME VYÖHYKETTÄ, ja juuri ne tämä vartio mittaa
 * piirtokutsuista (ei pikseleistä — kangas on stubi, joka kirjaa
 * jokaisen `destination-out`-vedon):
 *
 *   1. LAATIKON SISÄLLE EI KOSKETA. Yksikään pyyhkäisy ei saa osua
 *      laatikon sisäpuolelle: siellä kerman on oltava täysi, ja
 *      kohdemaan reikä tehdään renkailla eikä suorakaiteilla.
 *   2. LIUKU MENEE ULOSPÄIN: alfa 0 laatikon reunalla, alfa 1
 *      `feidausReuna` yksikköä ULKONA. Näin reunalla ei ole porrasta.
 *   3. HÄIVEEN TAKANA KERMA ON POIS kokonaan, jolloin laataston uloin
 *      reuna rajautuu nollaan kermaan eikä täyteen.
 *
 * Vartio ei lue lukuja koodista vaan laskee ne samoista syötteistä
 * (laatikko, feidausReuna, px) — jos kaava kääntyisi takaisin
 * sisäänpäin, väite 2 kaatuu eikä kukaan tarvitse selainta nähdäkseen sen.
 */

/** Kangasstubi, joka kirjaa jokaisen vedon. Ei selainta, ei pikseleitä. */
function stubiKangas(W, H) {
  const vedot = [];
  const teeCtx = (nimi) => {
    const ctx = {
      nimi,
      fillStyle: null,
      globalCompositeOperation: 'source-over',
      clearRect: () => {},
      drawImage: () => {},
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      closePath: () => {},
      fill: () => { vedot.push({ kangas: nimi, muoto: 'polku', tyyli: ctx.fillStyle }); },
      createLinearGradient: (x0, y0, x1, y1) => {
        const g = { x0, y0, x1, y1, stopit: [], addColorStop: (k, v) => g.stopit.push([k, v]) };
        return g;
      },
      fillRect: (x, y, w, h) => {
        vedot.push({
          kangas: nimi,
          muoto: 'suorakaide',
          tyyli: ctx.fillStyle,
          op: ctx.globalCompositeOperation,
          x, y, w, h,
        });
      },
    };
    return ctx;
  };
  const teeKangas = (nimi) => {
    const k = { width: W, height: H, __ctx: teeCtx(nimi) };
    k.getContext = () => k.__ctx;
    k.ownerDocument = { createElement: () => teeKangas('haive') };
    return k;
  };
  const kangas = teeKangas('laatta');
  return { kangas, vedot };
}

/** Alfa rgba-merkkijonosta tai liukuoliosta (viimeinen stoppi). */
const alfa = (tyyli) => (typeof tyyli === 'string'
  ? Number(tyyli.match(/rgba\([^)]*,\s*([\d.]+)\)/)?.[1] ?? 1)
  : null);

test('häive piirretään laatikon reunasta ULOSPÄIN eikä sisäänpäin', () => {
  /* px = leveys / bbox.w = 1000 / 1000 = 1, eli lautayksikkö = pikseli. */
  const W = 1000;
  const H = 500;
  const { kangas, vedot } = stubiKangas(W, H);
  const laatikko = { x: 300, y: 150, w: 400, h: 200 };
  const REUNA = 50;
  const ok = polttaVariLeikkuri(
    kangas,
    { bbox: { x: 0, y: 0, w: W, h: H }, leveys: W },
    {
      tasoitus: true,
      paperi: KERMA,
      feidaus: 0.85,
      feidausReuna: REUNA,
      laatikko,
      laudanLeveys: 0,
      renkaat: [[[450, 200], [550, 200], [550, 300], [450, 300]]],
    },
  );
  assert.equal(ok, true, 'leikkuria ei poltettu lainkaan');

  const lx0 = laatikko.x;
  const lx1 = laatikko.x + laatikko.w;
  const ly0 = laatikko.y;
  const ly1 = laatikko.y + laatikko.h;

  /* Häivekankaan vedot: ensimmäinen on kerman täyttö koko alalle. */
  const haive = vedot.filter((v) => v.kangas === 'haive' && v.muoto === 'suorakaide');
  assert.ok(haive.length >= 2, 'häivekangasta ei piirretty');
  const pohja = haive[0];
  assert.deepEqual([pohja.x, pohja.y, pohja.w, pohja.h], [0, 0, W, H],
    'kerma on maalattava koko kankaalle ennen reikää');
  const pyyhkaisyt = haive.slice(1);
  assert.ok(pyyhkaisyt.length >= 8,
    `pyyhkäisyjä ${pyyhkaisyt.length}: neljä liukua ja neljä umpea odotettiin`);

  /* 1. LAATIKON SISÄLLE EI KOSKETA. */
  for (const v of pyyhkaisyt) {
    const osuu = v.x < lx1 && v.x + v.w > lx0 && v.y < ly1 && v.y + v.h > ly0;
    assert.ok(!osuu,
      `pyyhkäisy ${JSON.stringify(v)} ulottuu laatikon sisälle — `
      + 'siellä kerman on oltava täysi (tämä oli 13.9. mitattu porras)');
  }

  /* 2. LIUKU MENEE ULOSPÄIN: alfa 0 reunalla, alfa 1 ulkona. */
  const liuut = pyyhkaisyt.filter((v) => typeof v.tyyli === 'object' && v.tyyli?.stopit);
  assert.equal(liuut.length, 4, 'neljä liukukaistaletta odotettiin');
  for (const v of liuut) {
    const { x0, y0, x1, y1, stopit } = v.tyyli;
    assert.deepEqual(stopit.map((s) => s[0]), [0, 1]);
    assert.equal(alfa(stopit[0][1]), 0,
      `liuku alkaa alfalla ${alfa(stopit[0][1])} eikä nollasta — reunalle jää porras`);
    assert.equal(alfa(stopit[1][1]), 1, 'liuku ei päädy täyteen pyyhkäisyyn');
    /* Alkupiste on laatikon reunalla, loppupiste `REUNA` yksikköä ULKONA. */
    const vaaka = x0 !== x1;
    const [alku, loppu] = vaaka ? [x0, x1] : [y0, y1];
    const [r0, r1] = vaaka ? [lx0, lx1] : [ly0, ly1];
    assert.ok(alku === r0 || alku === r1,
      `liuku ei ala laatikon reunalta (${alku}, reunat ${r0}/${r1})`);
    const ulos = alku === r0 ? alku - REUNA : alku + REUNA;
    assert.equal(loppu, ulos,
      `liuku menee sisäänpäin (${alku} → ${loppu}); ulospäin olisi ${ulos}`);
  }

  /* 3. HÄIVEEN TAKANA KERMA ON POIS: uloin kaistale saa täyden pyyhkäisyn. */
  const umpi = pyyhkaisyt.filter((v) => alfa(v.tyyli) === 1);
  assert.ok(umpi.length >= 4, 'häiveen takaista umpipyyhkäisyä ei ole');
  const peittaa = (x, y) => umpi.some((v) => x >= v.x && x <= v.x + v.w
    && y >= v.y && y <= v.y + v.h);
  assert.ok(peittaa(lx0 - REUNA - 1, (ly0 + ly1) / 2),
    'laataston läntinen laita jäi kermalle — se oli mitattuna 45,3 yksikön kaista');
  assert.ok(peittaa(lx1 + REUNA + 1, (ly0 + ly1) / 2),
    'laataston itäinen laita jäi kermalle');
  assert.ok(peittaa((lx0 + lx1) / 2, ly0 - REUNA - 1), 'laataston pohjoislaita jäi kermalle');
  assert.ok(peittaa((lx0 + lx1) / 2, ly1 + REUNA + 1), 'laataston eteläinen laita jäi kermalle');
});
