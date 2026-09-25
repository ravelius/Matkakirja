/*
 * KORKEUSIKKUNA — kootaanko oikea pala maailmaa, oikein päin?
 *
 * Omistajan tilaus 2.9.2026: pohjalaatat poltetaan uudestaan yhden
 * kaariminuutin korkeusdatalla. Aineisto tulee nyt R2:n 10°-paloista
 * (tools/korkeuspalat-lukija.mjs), ja generaattori kokoaa niistä vain
 * sen siivun, jonka se piirtää (tools/hae-korkeusruudukko.mjs
 * `haeKorkeusikkuna`).
 *
 * Tämä on juuri se kohta, jossa virhe ei näy virheenä. Väärin päin
 * luettu ruudukko kääntää vuoret laaksoiksi, yhden sarakkeen siirtymä
 * siirtää Alpit kilometrin sivuun ja päivämääränrajan väärä kierto
 * jättää keskelle Tyyntämerta kaistaleen jotakin muuta. Kaikki kolme
 * näyttävät kartalla uskottavilta. Siksi tässä mitataan LUVUT:
 *
 *   1. Jokainen kohdesolu on täsmälleen se palan solu, joka sen
 *      lon/lat-pisteessä on.
 *   2. Palan raja, päiväntasaaja ja ±180 eivät katkaise mitään.
 *   3. Ikkuna saa kiertää maailman ympäri (lauta on 361 astetta).
 *   4. 3′-polku on solu solulta ENTISELLÄÄN — tuotannon laattojen on
 *      pysyttävä tavulleen samoina.
 *
 * Verkkoon ei mennä: palat ovat keksittyjä ja annetaan kokoajalle
 * valepalastona. Yksi oikea gzip-kierros ajetaan erikseen, jotta myös
 * levyltä lukeva reitti tulee koetuksi.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  PALAN_ASTEITA, PALAN_SOLUJA, nimenNurkka, pakkaaPala,
} from '../tools/tee-korkeuspalat.mjs';
import {
  HILAN_KIERROS, HILA_RIVEJA, HILA_SARAKKEITA,
  avaaPalasto, hilaLat, hilaLon, ikkunanPalat, kokoaIkkuna, palaSolulle, sarakejaksot,
} from '../tools/korkeuspalat-lukija.mjs';
import { haeKorkeusikkuna, haeKorkeusruudukko, hilanMitat } from '../tools/hae-korkeusruudukko.mjs';
import { ikkunanRajat } from '../tools/fokuskartta/maailma.mjs';

/* ------------------------------------------------------- valepalasto */

/*
 * Keksitty maasto, joka on ERI jokaisessa maailmanhilan solussa.
 * Juuri se tekee testistä terävän: jos kokoaja hakee väärän solun,
 * arvo on väärä eikä vain "melkein oikea kuten naapuri".
 */
const maasto = (wx, wy) => ((((wx % HILAN_KIERROS) + HILAN_KIERROS) % HILAN_KIERROS) * 7
  + wy * 13) % 20000 - 10000;

/** Palasto, joka valmistaa palan pyydettäessä — ei levyä, ei verkkoa. */
function valepalasto() {
  const pyydetyt = [];
  return {
    pyydetyt,
    async pala(nimi) {
      const nurkka = nimenNurkka(nimi);
      assert.ok(nurkka, `kokoaja pyysi palaa, jota ei ole olemassa: ${nimi}`);
      pyydetyt.push(nimi);
      const pc = Math.round((nurkka.lon0 + 180) / PALAN_ASTEITA);
      const pr = Math.round((nurkka.lat0 + 90) / PALAN_ASTEITA);
      const solut = new Int16Array(PALAN_SOLUJA * PALAN_SOLUJA);
      for (let ty = 0; ty < PALAN_SOLUJA; ty += 1) {
        for (let tx = 0; tx < PALAN_SOLUJA; tx += 1) {
          solut[ty * PALAN_SOLUJA + tx] = maasto(pc * PALAN_SOLUJA + tx, pr * PALAN_SOLUJA + ty);
        }
      }
      return {
        lon0: nurkka.lon0,
        lat0: nurkka.lat0,
        leveys: PALAN_SOLUJA,
        korkeus: PALAN_SOLUJA,
        solut,
      };
    },
  };
}

/** Kokoaa ikkunan ja tarkistaa jokaisen solun maastokaavaa vasten. */
async function tarkistaIkkuna(nimi, ikkuna, pohjoinenEnsin = false) {
  const palasto = valepalasto();
  const z = await kokoaIkkuna({
    ...ikkuna, palasto, pohjoinenEnsin, hiljaa: true,
  });
  assert.equal(z.length, ikkuna.leveys * ikkuna.korkeus, `${nimi}: väärä koko`);
  let eroja = 0;
  let eka = null;
  for (let i = 0; i < ikkuna.korkeus; i += 1) {
    const wy = Math.min(HILA_RIVEJA - 2, Math.max(0, ikkuna.y0 + i));
    const rivi = (pohjoinenEnsin ? (ikkuna.korkeus - 1 - i) : i) * ikkuna.leveys;
    for (let j = 0; j < ikkuna.leveys; j += 1) {
      const odotus = maasto(ikkuna.x0 + j, wy);
      if (z[rivi + j] !== odotus) {
        eroja += 1;
        eka = eka ?? { j, i, sai: z[rivi + j], odotus };
      }
    }
  }
  assert.equal(eroja, 0, `${nimi}: ${eroja} väärää solua, ensimmäinen ${JSON.stringify(eka)}`);
  return { z, palasto };
}

/* ------------------------------------------------------ maailmanhila */

test('hilan mitat ja sopimus ovat samat kuin 3′-aineistolla', () => {
  assert.equal(HILA_SARAKKEITA, 21601);
  assert.equal(HILA_RIVEJA, 10801);
  // Kierros on sarakkeita MIINUS YKSI: ensimmäinen ja viimeinen sarake
  // ovat sama meridiaani, joten sarakkeen 0 länsinaapuri on 21599.
  assert.equal(HILAN_KIERROS, HILA_SARAKKEITA - 1);
  assert.equal(hilaLon(0), -180);
  assert.equal(hilaLon(HILAN_KIERROS), 180);
  assert.equal(hilaLat(0), -90);
  assert.equal(hilaLat(HILA_RIVEJA - 1), 90);
  // Sama mitta myös hae-korkeusruudukon puolelta, ettei kahta totuutta
  // pääse syntymään.
  assert.deepEqual(hilanMitat(1 / 60), { leveys: HILA_SARAKKEITA, korkeus: HILA_RIVEJA });
  assert.deepEqual(hilanMitat(0.05), { leveys: 7201, korkeus: 3601 });
});

test('solu osuu siihen palaan, jonka nimi sen lounaisnurkasta tulee', () => {
  // Lon 5, lat 45 -> N40E000; palan sisällä sarake 300, rivi 300.
  assert.equal(palaSolulle(Math.round((5 + 180) * 60), Math.round((45 + 90) * 60)), 'N40E000');
  // Päivämääränrajan molemmat päät ovat sama sarake ja sama pala.
  assert.equal(palaSolulle(0, 5400), palaSolulle(HILAN_KIERROS, 5400));
  // Napa (y = 10800) ei ole missään palassa: lainataan alapuolista riviä.
  assert.equal(palaSolulle(0, HILA_RIVEJA - 1), palaSolulle(0, HILA_RIVEJA - 2));
});

test('sarakejaksot ovat yhtenäisiä ja kattavat ikkunan tasan kerran', () => {
  const jaksot = sarakejaksot(11090, 1250);
  assert.equal(jaksot.reduce((s, j) => s + j.pituus, 0), 1250);
  let odotettuJ = 0;
  for (const j of jaksot) {
    assert.equal(j.jAlku, odotettuJ, 'jaksojen on jatkettava toisiaan aukotta');
    assert.ok(j.txAlku + j.pituus <= PALAN_SOLUJA, 'jakso ei saa vuotaa palan reunan yli');
    odotettuJ += j.pituus;
  }
});

test('ikkuna saa kiertää maailman ympäri useammin kuin kerran', () => {
  // Lauta on 361 astetta leveä, joten kierto on tuotannon tilanne
  // eikä erikoistapaus.
  const leveys = HILAN_KIERROS + 700;
  const jaksot = sarakejaksot(HILAN_KIERROS - 100, leveys);
  assert.equal(jaksot.reduce((s, j) => s + j.pituus, 0), leveys);
  // Sama palasarake saa esiintyä useasti; yhtään aukkoa ei silti tule.
  const nimet = new Set(jaksot.map((j) => j.pc));
  assert.equal(nimet.size, 36, 'kierroksen pitäisi käydä läpi kaikki 36 palasaraketta');
});

/* ------------------------------------------------------------ kokoaja */

test('yhden palan sisäinen ikkuna on solu solulta oikein', async () => {
  // Lon 5…8, lat 45…47 — kokonaan palassa N40E000.
  const { palasto } = await tarkistaIkkuna('sisäikkuna', {
    x0: Math.round((5 + 180) * 60),
    leveys: 181,
    y0: Math.round((45 + 90) * 60),
    korkeus: 121,
  });
  assert.deepEqual([...new Set(palasto.pyydetyt)], ['N40E000'],
    'yhden palan ikkuna ei saa noutaa naapureita turhaan');
});

test('palan raja ei katkaise ruudukkoa (lon 10, lat 40)', async () => {
  const { palasto } = await tarkistaIkkuna('palanraja', {
    x0: Math.round((8 + 180) * 60),
    leveys: 241, // 8…12 astetta: palanraja lon 10 keskellä
    y0: Math.round((38 + 90) * 60),
    korkeus: 241, // 38…42 astetta: palanraja lat 40 keskellä
  });
  assert.deepEqual([...new Set(palasto.pyydetyt)].sort(),
    ['N30E000', 'N30E010', 'N40E000', 'N40E010']);
});

test('päiväntasaaja on palojen raja eikä siinä ole saumaa', async () => {
  await tarkistaIkkuna('päiväntasaaja', {
    x0: Math.round((20 + 180) * 60),
    leveys: 61,
    y0: Math.round((-2 + 90) * 60),
    korkeus: 241, // lat −2 … +2
  });
});

test('päivämääränraja kiertää: sarake 21600 on sama kuin sarake 0', async () => {
  const { z } = await tarkistaIkkuna('±180', {
    x0: HILAN_KIERROS - 120, // lon 178
    leveys: 241, // 178 … −178 rajan yli
    y0: Math.round((10 + 90) * 60),
    korkeus: 5,
  });
  // Rajan solu itse: lon +180 ja lon −180 ovat sama piste ja siksi
  // sama luku. Ilman kiertoa tähän jäisi hyppy.
  const raja = 120;
  assert.equal(z[raja], maasto(0, Math.round((10 + 90) * 60)));
  assert.equal(z[raja], maasto(HILAN_KIERROS, Math.round((10 + 90) * 60)));
  // Sarakkeen 0 länsinaapuri on 21599 eikä 21600.
  assert.equal(z[raja - 1], maasto(HILAN_KIERROS - 1, Math.round((10 + 90) * 60)));
});

test('pohjoinenEnsin kääntää rivit eikä muuta muuta', async () => {
  const ikkuna = {
    x0: Math.round((5 + 180) * 60), leveys: 31, y0: Math.round((45 + 90) * 60), korkeus: 41,
  };
  const etela = await kokoaIkkuna({ ...ikkuna, palasto: valepalasto(), hiljaa: true });
  const pohjoinen = await kokoaIkkuna({
    ...ikkuna, palasto: valepalasto(), pohjoinenEnsin: true, hiljaa: true,
  });
  for (let i = 0; i < ikkuna.korkeus; i += 1) {
    for (let j = 0; j < ikkuna.leveys; j += 1) {
      assert.equal(pohjoinen[(ikkuna.korkeus - 1 - i) * ikkuna.leveys + j],
        etela[i * ikkuna.leveys + j], `rivi ${i} sarake ${j}`);
    }
  }
});

test('napa lainaa alapuolisen rivin eikä jää nollaksi', async () => {
  await tarkistaIkkuna('napa', {
    x0: 0, leveys: 5, y0: HILA_RIVEJA - 3, korkeus: 3,
  });
});

test('ikkunanPalat listaa täsmälleen ne palat, jotka kokoaja pyytää', async () => {
  const ikkuna = {
    x0: HILAN_KIERROS - 300, leveys: 900, y0: Math.round((-5 + 90) * 60), korkeus: 900,
  };
  const palasto = valepalasto();
  await kokoaIkkuna({ ...ikkuna, palasto, hiljaa: true });
  assert.deepEqual([...new Set(palasto.pyydetyt)].sort(), ikkunanPalat(ikkuna).sort(),
    'työnkulun kopioimat palat ja piirron tarvitsemat palat eivät saa erota');
});

/* -------------------------------------------------------- levyn kautta */

test('levyltä luettu pala purkautuu samaksi kuin kirjoitettaessa', async () => {
  const kansio = mkdtempSync(join(tmpdir(), 'korkeuspalat-'));
  const solut = new Int16Array(PALAN_SOLUJA * PALAN_SOLUJA);
  const pc = Math.round((0 + 180) / PALAN_ASTEITA);
  const pr = Math.round((40 + 90) / PALAN_ASTEITA);
  for (let ty = 0; ty < PALAN_SOLUJA; ty += 1) {
    for (let tx = 0; tx < PALAN_SOLUJA; tx += 1) {
      solut[ty * PALAN_SOLUJA + tx] = maasto(pc * PALAN_SOLUJA + tx, pr * PALAN_SOLUJA + ty);
    }
  }
  writeFileSync(join(kansio, 'N40E000.bin.gz'), pakkaaPala({
    lon0: 0, lat0: 40, leveys: PALAN_SOLUJA, korkeus: PALAN_SOLUJA, solut,
  }));
  const palasto = avaaPalasto({ kansio, hiljaa: true });
  const ikkuna = {
    x0: Math.round((5 + 180) * 60), leveys: 61, y0: Math.round((45 + 90) * 60), korkeus: 61,
  };
  const z = await kokoaIkkuna({ ...ikkuna, palasto, hiljaa: true });
  for (let i = 0; i < ikkuna.korkeus; i += 1) {
    for (let j = 0; j < ikkuna.leveys; j += 1) {
      assert.equal(z[i * ikkuna.leveys + j], maasto(ikkuna.x0 + j, ikkuna.y0 + i));
    }
  }
  assert.equal(palasto.noudettuja(), 0, 'paikallinen kansio ei saa mennä verkkoon');
});

/* ------------------------------------------------------- 3′ ennallaan */

/*
 * Sama ruudukko kahdella tavalla: vanha poiminta (jokaiselle
 * kohdesarakkeelle oma lähdesarake koko maailman ruudukosta) ja uusi
 * ikkuna. Jos nämä eroavat yhdessäkin solussa, 3′-tuotannon laatat
 * muuttuisivat — eikä sitä saa tapahtua tämän erän sivutuotteena.
 */
function vanhaPoiminta(maailma, laatikko, ruutu) {
  const w = Math.round((laatikko.lon1 - laatikko.lon0) / ruutu) + 1;
  const h = Math.round((laatikko.lat1 - laatikko.lat0) / ruutu) + 1;
  const grid = new Int16Array(w * h);
  const lahdeX = new Int32Array(w);
  for (let x = 0; x < w; x += 1) {
    const lon = laatikko.lon0 + x * ruutu;
    const kierretty = ((((lon + 180) % 360) + 360) % 360) - 180;
    lahdeX[x] = Math.min(maailma.leveys - 1,
      Math.max(0, Math.round((kierretty + 180) / ruutu)));
  }
  for (let y = 0; y < h; y += 1) {
    const lat = laatikko.lat1 - y * ruutu;
    const ly = Math.min(maailma.korkeus - 1, Math.max(0, Math.round((lat + 90) / ruutu)));
    const rivi = ly * maailma.leveys;
    for (let x = 0; x < w; x += 1) {
      grid[y * w + x] = Math.max(-32000, Math.min(32000, Math.round(maailma.z[rivi + lahdeX[x]])));
    }
  }
  return { grid, w, h };
}

/*
 * Repon 3′-aineisto puretaan KERRAN: se on 26 miljoonaa solua, ja
 * jokainen purku on sekunteja. Testit jakavat saman lupauksen.
 */
let maailmaKerran = null;
const maailma3 = () => {
  maailmaKerran = maailmaKerran ?? haeKorkeusruudukko({ ruutu: 0.05, hiljaa: true });
  return maailmaKerran;
};

test('3′-ikkuna on solu solulta sama kuin vanha poiminta', async () => {
  const ruutu = 0.05;
  const snap = (v, alas) => (alas ? Math.floor(v / ruutu) : Math.ceil(v / ruutu)) * ruutu;
  const maailma = await maailma3();
  const laatikot = {
    // Koko lauta: −175,5 … 185,5 eli kierto päivämääränrajan yli.
    lauta: {
      lon0: snap(-175.5, true), lon1: snap(185.5, false), lat0: snap(-67.1, true), lat1: snap(84.9, false),
    },
    // Yhden shardin kaista laudan länsilaidalta.
    kaista: {
      lon0: snap(-175.5, true), lon1: snap(-80, false), lat0: snap(-67.1, true), lat1: snap(84.9, false),
    },
    // Rajan yli menevä pieni laatikko.
    raja: {
      lon0: 160, lon1: 200, lat0: -10, lat1: 10,
    },
  };
  for (const [nimi, laatikko] of Object.entries(laatikot)) {
    const odotus = vanhaPoiminta(maailma, laatikko, ruutu);
    // eslint-disable-next-line no-await-in-loop -- kolme laatikkoa, ei kuormaa
    const ikkuna = await haeKorkeusikkuna({
      ruutu, ...ikkunanRajat({ laatikko, ruutu }), pohjoinenEnsin: true, hiljaa: true,
    });
    assert.equal(ikkuna.z.length, odotus.grid.length, `${nimi}: koko`);
    let eroja = 0;
    for (let i = 0; i < odotus.grid.length; i += 1) if (ikkuna.z[i] !== odotus.grid[i]) eroja += 1;
    assert.equal(eroja, 0, `${nimi}: ${eroja} solua eroaa vanhasta poiminnasta`);
  }
});

test('koko maailman 3′-ikkuna on koko maailman ruudukko', async () => {
  const ruutu = 0.05;
  const maailma = await maailma3();
  const ikkuna = await haeKorkeusikkuna({ ruutu, hiljaa: true });
  assert.equal(ikkuna.leveys, 7201);
  assert.equal(ikkuna.korkeus, 3601);
  assert.equal(ikkuna.z.length, maailma.z.length);
  /*
   * Vertailu silmukalla eikä assert.deepEqualilla: 26 miljoonan solun
   * eroraportin rakentaminen kaataisi ajon muistiin, jos ero olisi.
   */
  let eroja = 0;
  for (let i = 0; i < maailma.z.length; i += 1) if (ikkuna.z[i] !== maailma.z[i]) eroja += 1;
  assert.equal(eroja, 0, 'täysi ikkuna ei saa poiketa koko maailman ruudukosta');
});

/* -------------------------------------------- luettelon korkeus-kenttä */

/*
 * TARKKUUS ON TASON OMINAISUUS, JA LUETTELO ON AINOA PAIKKA, JOSTA SEN
 * NÄKEE. Laatta ei kanna mukanaan tietoa siitä, mistä aineistosta se on
 * poltettu; jos luettelo ei kirjaa sitä, kysymys "onko tämä versio se
 * 1′-poltto" on ikuisesti arvailua.
 */
const GENERAATTORI = fileURLToPath(new URL('../tools/generoi-laattapyramidi.mjs', import.meta.url));

function ajaLuettelo(lisa = []) {
  const kansio = mkdtempSync(join(tmpdir(), 'korkeusluettelo-'));
  execFileSync(process.execPath, [
    GENERAATTORI, kansio, '--tasot', '0-7', '--versio', 'koe', '--vain-luettelo', ...lisa,
  ], { stdio: 'pipe' });
  return JSON.parse(readFileSync(join(kansio, 'pyramidi.json'), 'utf8'));
}

test('luettelo kirjaa korkeustarkkuuden tasoittain: z7 tarkka, muut karkeat', () => {
  const l = ajaLuettelo(['--kaariminuutit', '1']);
  assert.ok(l.korkeus, 'korkeus-kenttä puuttuu luettelosta');
  assert.deepEqual(l.korkeus.kaariminuutit, {
    0: 3, 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 1,
  });
  assert.match(l.korkeus.aineisto, /1′/);
  assert.match(l.korkeus.aineisto, /3′/);
  // Sama luku myös tason omassa rivissä, jotta se kulkee `tasot`-taulukon
  // mukana erästä toiseen samalla koodilla kuin laatasto.
  for (const t of l.tasot) assert.equal(t.kaariminuutit, t.z >= 7 ? 1 : 3, `z${t.z}`);
});

test('--kaariminuutit 3 palauttaa yhtenäisen vanhan ajon', () => {
  const l = ajaLuettelo(['--kaariminuutit', '3']);
  assert.deepEqual(Object.values(l.korkeus.kaariminuutit), Array(8).fill(3));
  assert.doesNotMatch(l.korkeus.aineisto, /1′/);
});

test('piirtoajo, jonka tasot tarvitsisivat eri ruudukot, pysähtyy', () => {
  const kansio = mkdtempSync(join(tmpdir(), 'korkeusluettelo-'));
  assert.throws(() => execFileSync(process.execPath, [
    GENERAATTORI, kansio, '--tasot', '6-7', '--kaariminuutit', '1',
    '--alue', '6,45,8,46', '--versio', 'koe',
  ], { stdio: 'pipe' }), (e) => {
    assert.match(String(e.stderr), /eri korkeusruudukot/,
      'virheen on kerrottava MIKSI ajo pysähtyi, tai se korjataan väärästä päästä');
    return true;
  });
});
