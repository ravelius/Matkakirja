/*
 * KORKEUSPALOJEN LUKIJA: 1′-ruudukko 10°-paloista koottuna.
 *
 * Vastapari tools/tee-korkeuspalat.mjs:lle. Se PILKKOO ETOPO1:n
 * paloiksi ja vie ne R2-ämpäriin; tämä KOKOAA paloista takaisin sen
 * ruudukonpalasen, jonka kutsuja tarvitsee — eikä yhtään enempää.
 *
 * === MIKSI KOKOAJA ON OMA TIEDOSTONSA ===============================
 *
 * Omistajan tilaus 2.9.2026: pohjalaatat poltetaan uudestaan yhden
 * kaariminuutin korkeusdatalla. Aineisto on jo ämpärissä paloina
 * (v1436–v1437), mutta laattapyramidin generaattori odottaa YHTÄ
 * ruudukkoa samoilla suunnilla kuin repon 3′-aineisto. Tämä tiedosto
 * on juuri se muunnos, eikä se kuulu kumpaankaan päähän:
 * tee-korkeuspalat.mjs on kirjoittaja eikä sen tarvitse osata lukea
 * ämpäriä, ja hae-korkeusruudukko.mjs on aineiston valitsija eikä sen
 * tarvitse tuntea palojen nimeämistä.
 *
 * PURKUKOODIA EI OLE KOPIOITU. `puraPala` tuodaan kirjoittajalta
 * sellaisenaan — kaksi kopiota erotuskoodauksen purusta olisi kaksi
 * paikkaa, joissa Int16:n kierto voi mennä väärin, eikä se virhe näy
 * muuna kuin outona maastona (tests/korkeuspalat.test.mjs vartioi
 * purkua, ja tämä tiedosto perii sen vartioinnin ilmaiseksi).
 *
 * === MAAILMANHILA ON SOPIMUS ========================================
 *
 * Kokoaja puhuu MAAILMANHILAN sarakkeista ja riveistä, ei asteista.
 * Hila on sama kuin tools/korkeusaineisto/LUEMINUT.md:n sopimus, vain
 * tiheämpänä:
 *
 *   sarakkeita 21601   x = 0 on lon −180, x kasvaa itään
 *   rivejä     10801   y = 0 on lat −90 (etelänapa), y kasvaa pohjoiseen
 *   solu (x, y)        lon = −180 + x/60, lat = −90 + y/60
 *
 * Sarakkeet 0 ja 21600 ovat SAMA MERIDIAANI kahdesti, ja siksi
 * sarakeindeksi kiertää modulo 21600 eikä 21601: sarakkeen 0
 * länsinaapuri on 21599, kuten 3′-aineistollakin (`leveys − 2`).
 * Ikkunan `x0` saa siis olla mikä tahansa kokonaisluku ja ikkuna saa
 * kiertää maailman ympäri — lauta on 361 astetta leveä, joten se
 * kiertää.
 *
 * NAVAT EIVÄT OLE MISSÄÄN PALASSA. Palat kattavat lat −90…+90 niin,
 * että palan yläreuna kuuluu jo seuraavaan palaan; ylin hilarivi
 * (y = 10800, lat +90) jää siksi kaikkien palojen ulkopuolelle.
 * Kokoaja lainaa siihen alapuolisen rivin. Se on napapiste, jossa
 * kaikki sarakkeet ovat sama piste, eikä laudan arkki (84 °N…66 °S)
 * yllä sinne lainkaan.
 *
 * === MISTÄ PALAT TULEVAT ============================================
 *
 * Kolme lähdettä samassa järjestyksessä, ja ensimmäinen joka vastaa
 * voittaa:
 *
 *   1. `--korkeuspalat <kansio>` — paikallinen kansio. TÄMÄ ON
 *      AJOKONEEN TAPA: työnkulku kopioi tarvittavat palat R2:sta
 *      `aws s3 cp` -komennolla ennen polttoa, jolloin itse ajossa ei
 *      ole yhtään verkkopyyntöä eikä siis mitään, mikä voisi kaatua
 *      kesken kolmen tunnin poltton.
 *   2. levyvälimuisti (tmpdir) — sama pala haetaan kerran, vaikka
 *      generaattori ajettaisiin kymmenen kertaa peräkkäin.
 *   3. julkinen R2-osoite — kehityskoneen mukavuus.
 *
 * NOAA:AAN EI OTETA YHTEYTTÄ MISSÄÄN VAIHEESSA. Omistajan päätös
 * 30.8.2026 on yhä voimassa: yksikään ajo ei saa riippua NOAA:n
 * tavoitettavuudesta, ja R2 on meidän oma ämpärimme.
 *
 * Lähde ja lisenssi: NOAA NGDC ETOPO1 Global Relief Model, Ice
 * Surface, 1 kaariminuutti (Amante & Eakins 2009,
 * doi:10.7289/V5C8276M) — public domain.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { gunzipSync } from 'node:zlib';

import {
  PALAN_ASTEITA, PALAN_SOLUJA, kaikkiPalat, palanNimi, puraPala,
} from './tee-korkeuspalat.mjs';

/* ------------------------------------------------------- maailmanhila */

/** Ruudun koko asteina: yksi kaariminuutti. */
export const RUUTU_1MIN = 1 / 60;
/** Maailmanhilan sarakkeita 1′:llä (−180 … +180, molemmat mukana). */
export const HILA_SARAKKEITA = 21601;
/** Maailmanhilan rivejä 1′:llä (−90 … +90, molemmat mukana). */
export const HILA_RIVEJA = 10801;
/**
 * Kierros SARAKKEINA. 21600 eikä 21601, koska ensimmäinen ja viimeinen
 * sarake ovat sama meridiaani — sarakkeen 0 länsinaapuri on 21599.
 */
export const HILAN_KIERROS = HILA_SARAKKEITA - 1;

/** Palojen julkinen juuri R2:ssa. */
export const PALOJEN_URL = 'https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev'
  + '/julisteet/korkeus/1min/';

/** Levyvälimuistin oletuspaikka; ei kuulu repoon. */
const VALIMUISTI = process.env.KORKEUSPALAT_VALIMUISTI
  || join(tmpdir(), 'matkakirja-korkeuspalat-lukija');

/** Solun keskipisteen pituusaste maailmanhilan sarakkeesta. */
export const hilaLon = (x) => -180 + x / 60;
/** Solun keskipisteen leveysaste maailmanhilan rivistä. */
export const hilaLat = (y) => -90 + y / 60;

/** Palan nimi, jonka sisään maailmanhilan solu (x, y) osuu. */
export function palaSolulle(x, y) {
  const kx = ((x % HILAN_KIERROS) + HILAN_KIERROS) % HILAN_KIERROS;
  const ky = Math.min(HILA_RIVEJA - 2, Math.max(0, y));
  const lon0 = -180 + Math.floor(kx / PALAN_SOLUJA) * PALAN_ASTEITA;
  const lat0 = -90 + Math.floor(ky / PALAN_SOLUJA) * PALAN_ASTEITA;
  return palanNimi(lon0, lat0);
}

/* ------------------------------------------------------------ palasto */

/*
 * Verkkoon mennään vasta kun paikallista palaa ei ole. Noden fetch ei
 * lue HTTPS_PROXYa ilman NODE_USE_ENV_PROXYa (ks. tools/hae-radiot.mjs),
 * ja se sanotaan ääneen sen sijaan että annettaisiin neljä yritystä
 * epäonnistua salaperäisesti.
 */
async function nouda(url) {
  if (!process.env.NODE_USE_ENV_PROXY && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
    throw new Error('välityspalvelin on asetettu mutta NODE_USE_ENV_PROXY ei — '
      + 'aja kutsuva työkalu komennolla NODE_USE_ENV_PROXY=1 node ..., tai anna '
      + 'palat paikallisesta kansiosta (--korkeuspalat)');
  }
  let viimeisin = null;
  for (let yritys = 1; yritys <= 4; yritys += 1) {
    try {
      const v = await fetch(url, { signal: AbortSignal.timeout(300000) });
      if (!v.ok) throw new Error(`HTTP ${v.status}`);
      return Buffer.from(await v.arrayBuffer());
    } catch (e) {
      viimeisin = e;
      if (yritys === 4) break;
      await new Promise((r) => { setTimeout(r, 2000 * yritys); });
    }
  }
  throw new Error(`${url}: ${viimeisin?.message ?? 'ei vastausta'}`);
}

/**
 * Palojen lähde: kansio, välimuisti ja ämpäri yhtenä oliona.
 *
 * `pala(nimi)` palauttaa puretun palan `{ solut, lon0, lat0, leveys,
 * korkeus }`. Palasto EI pidä paloja muistissa: 648 palaa olisi 466
 * megatavua, ja kokoaja käy ne läpi yksi kerrallaan.
 */
export function avaaPalasto({
  kansio = null, url = PALOJEN_URL, valimuisti = VALIMUISTI, hiljaa = false,
} = {}) {
  const kerro = (t) => { if (!hiljaa) process.stderr.write(t); };
  let noudettuja = 0;
  let paikallisia = 0;
  return {
    noudettuja: () => noudettuja,
    paikallisia: () => paikallisia,
    async pala(nimi) {
      const tiedosto = `${nimi}.bin.gz`;
      if (kansio) {
        const polku = join(kansio, tiedosto);
        if (existsSync(polku)) {
          paikallisia += 1;
          return puraPala(gunzipSync(readFileSync(polku)));
        }
      }
      mkdirSync(valimuisti, { recursive: true });
      const vali = join(valimuisti, tiedosto);
      if (existsSync(vali)) {
        paikallisia += 1;
        return puraPala(gunzipSync(readFileSync(vali)));
      }
      /*
       * PUUTTUVA PALA ON VIRHE EIKÄ MERTA. Jos kokoaja täyttäisi
       * puuttuvan palan nollilla, tulos olisi merenpinnan tasainen
       * levy keskellä Alppeja — kartta, joka näyttää oikealta ja on
       * väärä. Se pysäytetään tähän (nouda heittää).
       */
      const puskuri = await nouda(url + tiedosto);
      writeFileSync(vali, puskuri);
      noudettuja += 1;
      if (noudettuja === 1) kerro(`  palat ämpäristä: ${url}\n`);
      return puraPala(gunzipSync(puskuri));
    },
  };
}

/* ----------------------------------------------------------- kokoaja */

/**
 * Yhtenäiset jaksot: mille palasarakkeelle kukin kohdesarake kuuluu.
 *
 * Peräkkäiset kohdesarakkeet osuvat peräkkäisiin hilasarakkeisiin,
 * joten yhden palasarakkeen kohdalle osuu aina YHTENÄINEN jakso
 * kohdesarakkeita — ja jakson voi kopioida yhdellä `set`-kutsulla
 * silmukan sijaan. Ikkuna saa kiertää maailman ympäri useammin kuin
 * kerran (lauta on 361 astetta), joten sama palasarake voi saada
 * useamman jakson.
 */
export function sarakejaksot(x0, leveys) {
  const jaksot = [];
  let nyt = null;
  for (let j = 0; j < leveys; j += 1) {
    const kx = (((x0 + j) % HILAN_KIERROS) + HILAN_KIERROS) % HILAN_KIERROS;
    const pc = Math.floor(kx / PALAN_SOLUJA);
    const tx = kx % PALAN_SOLUJA;
    if (nyt && nyt.pc === pc && nyt.txAlku + nyt.pituus === tx) {
      nyt.pituus += 1;
      continue;
    }
    nyt = {
      pc, jAlku: j, txAlku: tx, pituus: 1,
    };
    jaksot.push(nyt);
  }
  return jaksot;
}

/** Ikkunan rivit palariveittäin; napa lainaa alapuolisen rivin. */
function riviJaksot(y0, korkeus) {
  const palarivit = new Map();
  for (let i = 0; i < korkeus; i += 1) {
    const y = Math.min(HILA_RIVEJA - 2, Math.max(0, y0 + i));
    const pr = Math.floor(y / PALAN_SOLUJA);
    if (!palarivit.has(pr)) palarivit.set(pr, []);
    palarivit.get(pr).push({ i, ty: y % PALAN_SOLUJA });
  }
  return palarivit;
}

/**
 * Kokoaa maailmanhilan ikkunan paloista.
 *
 * @param {object} p
 * @param {number} p.x0      ikkunan vasen sarake maailmanhilassa (saa kiertää)
 * @param {number} p.leveys  sarakkeita
 * @param {number} p.y0      ikkunan alin rivi maailmanhilassa (y kasvaa pohjoiseen)
 * @param {number} p.korkeus rivejä
 * @param {boolean} p.pohjoinenEnsin  jos tosi, tuloksen rivi 0 on
 *        POHJOISIN (kuten laattapyramidin ruudukossa) eikä eteläisin.
 *        Kääntö tehdään täytön yhteydessä, jottei sataa megatavua
 *        tarvitse kopioida toiseen kertaan pelkän suunnan vuoksi.
 * @returns {Promise<Int16Array>} leveys × korkeus metriä merenpinnasta
 */
export async function kokoaIkkuna({
  x0, leveys, y0, korkeus, palasto = null, pohjoinenEnsin = false, hiljaa = false,
}) {
  const lahde = palasto ?? avaaPalasto({ hiljaa });
  const ulos = new Int16Array(leveys * korkeus);
  const palasarakkeet = new Map();
  for (const j of sarakejaksot(x0, leveys)) {
    if (!palasarakkeet.has(j.pc)) palasarakkeet.set(j.pc, []);
    palasarakkeet.get(j.pc).push(j);
  }
  const palarivit = riviJaksot(y0, korkeus);

  let luettu = 0;
  for (const [pr, rivit] of [...palarivit.entries()].sort((a, b) => a[0] - b[0])) {
    for (const [pc, omat] of [...palasarakkeet.entries()].sort((a, b) => a[0] - b[0])) {
      const nimi = palanNimi(-180 + pc * PALAN_ASTEITA, -90 + pr * PALAN_ASTEITA);
      // eslint-disable-next-line no-await-in-loop -- pala kerrallaan: koko
      // maailma yhtä aikaa muistissa olisi 466 Mt.
      const pala = await lahde.pala(nimi);
      luettu += 1;
      if (pala.leveys !== PALAN_SOLUJA || pala.korkeus !== PALAN_SOLUJA) {
        throw new Error(`pala ${nimi} on ${pala.leveys}×${pala.korkeus}, `
          + `odotettiin ${PALAN_SOLUJA}×${PALAN_SOLUJA}`);
      }
      for (const { i, ty } of rivit) {
        const kohdeRivi = (pohjoinenEnsin ? (korkeus - 1 - i) : i) * leveys;
        const lahdeRivi = ty * PALAN_SOLUJA;
        for (const jakso of omat) {
          ulos.set(
            pala.solut.subarray(lahdeRivi + jakso.txAlku, lahdeRivi + jakso.txAlku + jakso.pituus),
            kohdeRivi + jakso.jAlku,
          );
        }
      }
    }
  }
  if (!hiljaa) {
    process.stderr.write(`  1′-ruudukko ${leveys} × ${korkeus} `
      + `(${(ulos.byteLength / 1e6).toFixed(0)} Mt) ${luettu} palasta\n`);
  }
  return ulos;
}

/** Ikkunan tarvitsemien palojen nimet — työnkulun kopiointilistaa varten. */
export function ikkunanPalat({
  x0, leveys, y0, korkeus,
}) {
  const sarakkeet = new Set(sarakejaksot(x0, leveys).map((j) => j.pc));
  const rivit = new Set([...riviJaksot(y0, korkeus).keys()]);
  const ulos = [];
  for (const pr of [...rivit].sort((a, b) => a - b)) {
    for (const pc of [...sarakkeet].sort((a, b) => a - b)) {
      ulos.push(palanNimi(-180 + pc * PALAN_ASTEITA, -90 + pr * PALAN_ASTEITA));
    }
  }
  return ulos;
}

/** Kaikkien palojen nimet — sama järjestys kuin kirjoittajalla. */
export const kaikkienPalojenNimet = () => kaikkiPalat().map((p) => p.nimi);
