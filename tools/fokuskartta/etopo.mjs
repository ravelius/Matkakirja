/*
 * YHTEINEN KORKEUSRUUDUKKO — yksi Euroopan kokoinen ETOPO1-levy, josta
 * jokainen fokuskartta leikkaa oman palansa.
 *
 * === MIKSI YKSI LEVY EIKÄ KAISTOJA MAATA KOHTI ===
 *
 * Kreikan pilotissa aineisto haettiin yhden maan ikkunalle
 * (etopo-band-*.csv, ks. aineisto.mjs). Kun maita on neljäkymmentä,
 * sama tapa hakisi saman meren kymmeneen kertaan: Egeanmeri kuuluu
 * Kreikan, Turkin, Bulgarian ja Pohjois-Makedonian ikkunoihin, ja
 * naapurin maasto on koko jatkuvan pinnan idea — jokainen kuva ulottuu
 * naapurin puolelle.
 *
 * Siksi ETOPO1 haetaan KERRAN koko Euroopan ruudukoksi ja tallennetaan
 * raakana Int16-levynä. Levy on noin 22 Mt (4441 x 2431 pistettä yhden
 * kaariminuutin välein), eli murto-osa siitä CSV-massasta, jonka sama
 * alue veisi tekstinä — ja se asuu REPON ULKOPUOLELLA kuten kaikki muukin
 * raaka-aineisto.
 *
 * === MIKSI YKSI KAARIMINUUTTI RIITTÄÄ JOKAISELLE MAALLE ===
 *
 * Kuvan leveys valitaan lautayksikköä kohti vakiotiheydellä (ks.
 * tools/tee-fokuskartta.mjs), ja maailmankartan lieriössä pituusaste on
 * aina sama määrä lautayksikköjä. Siitä seuraa, että KUVAPIKSELEITÄ
 * KAARIMINUUTTIA KOHTI on sama luku pikkuruisessa Albaniassa ja
 * Ranskassa — noin kuusi. Ruudukkoa ei siis tarvitse tihentää pienille
 * maille eikä harventaa suurille.
 *
 * === PUUTTUVA ARVO ===
 *
 * Levy luodaan täyteen arvoa PUUTTUVA (-32768), ja hakija täyttää sen
 * pala kerrallaan. Näin haun voi keskeyttää ja jatkaa myöhemmin, ja
 * leikkuri osaa kertoa, jos maan ikkunaan jäi aukko — hiljainen nolla
 * olisi merenpinta keskellä Alppeja.
 *
 * Lähde: ETOPO1 Global Relief (NOAA, Amante & Eakins 2009,
 * doi:10.7289/V5C8276M) — public domain, haettuna ERDDAPista
 * (coastwatch.pfeg.noaa.gov/erddap/griddap/etopo360).
 */
import {
  existsSync, mkdirSync, readFileSync, readdirSync, renameSync, statSync, writeFileSync,
} from 'node:fs';
import { join } from 'node:path';

/** Ruudukon askel asteina: yksi kaariminuutti, ETOPO1:n oma tarkkuus. */
export const ASKEL = 1 / 60;
/** Arvo, joka tarkoittaa "ei vielä haettu". */
export const PUUTTUVA = -32768;

export const LEVY_JSON = 'etopo-eurooppa.json';
export const LEVY_BIN = 'etopo-eurooppa.bin';

/** Asteet ruudukon indeksiksi. Pyöristys sietää CSV:n liukulukukohinan. */
export const idxLon = (lon) => Math.round(lon * 60);
export const idxLat = (lat) => Math.round(lat * 60);

/**
 * Luo tyhjän levyn tai lataa olemassa olevan.
 *
 * `alue` on { lon0, lon1, lat0, lat1 } asteina ja käytetään vain uutta
 * levyä luotaessa; olemassa olevan levyn rajoja ei muuteta, koska
 * ruudukon leventäminen tarkoittaisi koko tiedoston uudelleenladontaa.
 */
export function avaaLevy(kansio, alue) {
  mkdirSync(kansio, { recursive: true });
  const jsonPolku = join(kansio, LEVY_JSON);
  const binPolku = join(kansio, LEVY_BIN);
  if (existsSync(jsonPolku) && existsSync(binPolku)) {
    const otsikko = JSON.parse(readFileSync(jsonPolku, 'utf8'));
    const puskuri = readFileSync(binPolku);
    const grid = new Int16Array(
      puskuri.buffer, puskuri.byteOffset, puskuri.byteLength / 2,
    );
    if (grid.length !== otsikko.w * otsikko.h) {
      throw new Error(`Levy ${binPolku} on väärän kokoinen: ${grid.length} `
        + `!= ${otsikko.w} x ${otsikko.h}. Poista tiedostot ja hae uudestaan.`);
    }
    return { ...otsikko, grid, kansio };
  }
  if (!alue) {
    throw new Error(`Levyä ei ole kansiossa ${kansio} eikä aluetta annettu.\n`
      + 'Aja tools/hae-etopo-eurooppa.mjs ensin.');
  }
  const x0 = idxLon(alue.lon0); const x1 = idxLon(alue.lon1);
  const y0 = idxLat(alue.lat0); const y1 = idxLat(alue.lat1);
  const w = x1 - x0 + 1;
  const h = y1 - y0 + 1;
  const grid = new Int16Array(w * h).fill(PUUTTUVA);
  return {
    lon0: x0 / 60, lon1: x1 / 60, lat0: y0 / 60, lat1: y1 / 60, w, h, grid, kansio,
  };
}

/**
 * Kirjoittaa levyn levylle. Kutsutaan joka palan jälkeen.
 *
 * KIRJOITUS ON ATOMINEN: ensin väliaikaiseen tiedostoon, sitten
 * nimenvaihto. Haku ja renderöinti ajetaan rinnakkain — haku täydentää
 * levyä samalla kun tee-fokuskartta.mjs lukee sitä — ja suora
 * `writeFileSync` katkaisisi tiedoston hetkeksi 27 megatavun ajaksi.
 * Lukija saisi puolikkaan levyn ja kaataisi ajon.
 */
export function tallennaLevy(levy) {
  const {
    lon0, lon1, lat0, lat1, w, h, grid, kansio,
  } = levy;
  const tilapainen = join(kansio, `${LEVY_BIN}.uusi`);
  writeFileSync(tilapainen, Buffer.from(grid.buffer, grid.byteOffset, grid.byteLength));
  renameSync(tilapainen, join(kansio, LEVY_BIN));
  writeFileSync(join(kansio, LEVY_JSON), `${JSON.stringify({
    lon0, lon1, lat0, lat1, w, h, askel: ASKEL, puuttuva: PUUTTUVA, tiedosto: LEVY_BIN,
    lahde: 'ETOPO1 Global Relief (NOAA, Amante & Eakins 2009) — public domain',
  }, null, 2)}\n`);
}

/**
 * Levyn indeksi asteista. y = 0 on POHJOISIN rivi (sama suunta kuin
 * piirtomoottorin `korkeus`-haussa), x = 0 on läntisin.
 */
const sijainti = (levy, lon, lat) => {
  const x = idxLon(lon) - idxLon(levy.lon0);
  const y = idxLat(levy.lat1) - idxLat(lat);
  if (x < 0 || y < 0 || x >= levy.w || y >= levy.h) return -1;
  return y * levy.w + x;
};

/**
 * Lukee ERDDAPin CSV-vastauksen levylle.
 *
 * Rivi on `latitude,longitude,altitude`, kaksi otsikkoriviä ensin, ja
 * pituusaste on 0..360-akselilla — yli 180 asteen lukemat ovat läntisiä
 * ja niistä vähennetään täysi kierros (ks. fokusdata/RAPORTTI.md).
 * Palauttaa, montako pistettä osui levylle.
 */
export function lueCsv(levy, teksti) {
  let osui = 0;
  let alku = 0;
  let rivi = 0;
  while (alku < teksti.length) {
    let loppu = teksti.indexOf('\n', alku);
    if (loppu < 0) loppu = teksti.length;
    const r = teksti.slice(alku, loppu);
    alku = loppu + 1;
    rivi += 1;
    if (rivi <= 2 || !r) continue;
    const a = r.indexOf(',');
    const b = r.indexOf(',', a + 1);
    if (a < 0 || b < 0) continue;
    const lat = Number(r.slice(0, a));
    let lon = Number(r.slice(a + 1, b));
    const arvo = Number(r.slice(b + 1));
    if (!Number.isFinite(arvo) || !Number.isFinite(lat) || !Number.isFinite(lon)) continue;
    if (lon > 180) lon -= 360;
    const i = sijainti(levy, lon, lat);
    if (i < 0) continue;
    levy.grid[i] = Math.max(-32000, Math.min(32000, Math.round(arvo)));
    osui += 1;
  }
  return osui;
}

/**
 * Lukee kansiollisen vanhoja ERDDAP-CSV-tiedostoja levylle.
 *
 * Kreikan, Britannian, Italian, Ranskan ja Espanjan kaistat haettiin jo
 * kertaalleen (scratchpad/fokusdata*, ks. sen RAPORTTI.md), ja ne ovat
 * täsmälleen samaa aineistoa samalta palvelimelta. Niiden lukeminen
 * levylle säästää sen verran verkkoa, ja hakija hakee vain aukot.
 */
export function lueCsvKansio(levy, kansio) {
  if (!existsSync(kansio)) return { tiedostoja: 0, pisteita: 0 };
  let tiedostoja = 0;
  let pisteita = 0;
  const kayLapi = (polku) => {
    for (const nimi of readdirSync(polku)) {
      const p = join(polku, nimi);
      if (statSync(p).isDirectory()) { kayLapi(p); continue; }
      if (!nimi.endsWith('.csv')) continue;
      tiedostoja += 1;
      pisteita += lueCsv(levy, readFileSync(p, 'utf8'));
    }
  };
  kayLapi(kansio);
  return { tiedostoja, pisteita };
}

/**
 * Leikkaa levystä yhden kuvan ruudukon.
 *
 * Palautus on täsmälleen se olio, jonka piirtomoottori odottaa
 * (`aineisto.korkeus`): w, h, kulmat asteina ja ruudukko base64:nä,
 * y = 0 pohjoisin rivi.
 *
 * Aukot: jos leikattuun alueeseen jäi hakematta jääneitä pisteitä, ne
 * täytetään lähimmällä tunnetulla arvolla ja määrä palautetaan
 * `aukkoja`-kentässä. Kutsuja päättää, onko se varoitus vai virhe.
 */
export function leikkaa(levy, laatikko) {
  const x0 = Math.max(0, idxLon(laatikko.lon0) - idxLon(levy.lon0));
  const x1 = Math.min(levy.w - 1, idxLon(laatikko.lon1) - idxLon(levy.lon0));
  const y0 = Math.max(0, idxLat(levy.lat1) - idxLat(laatikko.lat1));
  const y1 = Math.min(levy.h - 1, idxLat(levy.lat1) - idxLat(laatikko.lat0));
  if (x1 < x0 || y1 < y0) {
    throw new Error('Leikkaus on kokonaan levyn ulkopuolella: '
      + `lon ${laatikko.lon0}..${laatikko.lon1} lat ${laatikko.lat0}..${laatikko.lat1}, `
      + `levy lon ${levy.lon0}..${levy.lon1} lat ${levy.lat0}..${levy.lat1}.`);
  }
  const w = x1 - x0 + 1;
  const h = y1 - y0 + 1;
  const ulos = new Int16Array(w * h);
  let aukkoja = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const v = levy.grid[(y0 + y) * levy.w + (x0 + x)];
      if (v === PUUTTUVA) aukkoja += 1;
      ulos[y * w + x] = v;
    }
  }
  // Aukot pois: vasemmalta oikealle, sitten oikealta vasemmalle, sitten
  // ylhäältä alas. Yksinkertainen leviäminen riittää, koska aukko on
  // aina hakematon reuna eikä keskellä maastoa oleva reikä.
  if (aukkoja) {
    const paikkaa = (jarjestys) => {
      for (const i of jarjestys) {
        if (ulos[i.kohde] !== PUUTTUVA) continue;
        if (ulos[i.lahde] !== PUUTTUVA) ulos[i.kohde] = ulos[i.lahde];
      }
    };
    const rivi = [];
    for (let y = 0; y < h; y++) {
      for (let x = 1; x < w; x++) rivi.push({ kohde: y * w + x, lahde: y * w + x - 1 });
    }
    paikkaa(rivi);
    const takaisin = [];
    for (let y = 0; y < h; y++) {
      for (let x = w - 2; x >= 0; x--) takaisin.push({ kohde: y * w + x, lahde: y * w + x + 1 });
    }
    paikkaa(takaisin);
    const alas = [];
    for (let y = 1; y < h; y++) {
      for (let x = 0; x < w; x++) alas.push({ kohde: y * w + x, lahde: (y - 1) * w + x });
    }
    paikkaa(alas);
    const ylos = [];
    for (let y = h - 2; y >= 0; y--) {
      for (let x = 0; x < w; x++) ylos.push({ kohde: y * w + x, lahde: (y + 1) * w + x });
    }
    paikkaa(ylos);
    for (let i = 0; i < ulos.length; i++) if (ulos[i] === PUUTTUVA) ulos[i] = 0;
  }
  return {
    w,
    h,
    lon0: (idxLon(levy.lon0) + x0) / 60,
    lon1: (idxLon(levy.lon0) + x1) / 60,
    lat0: (idxLat(levy.lat1) - y1) / 60,
    lat1: (idxLat(levy.lat1) - y0) / 60,
    aukkoja,
    b64: Buffer.from(ulos.buffer).toString('base64'),
  };
}

/**
 * Harventaa leikatun ruudukon n kertaa karkeammaksi KESKIARVOISTAMALLA.
 *
 * Omistajan linjaus 29.8.2026: *"Sen voisi pudottaa heti 3
 * kaariminuuttiin jo euroopassa"*. ETOPO1:n oma ruutu on yksi
 * kaariminuutti, ja se on lehden mittakaavassa tarkempi kuin mitä
 * silmä erottaa — mutta kaikki sen kohina näkyy varjostuksessa, koska
 * varjo lasketaan naapuriruutujen EROSTA. Karkeampi ruudukko on siis
 * pehmeämpi pinta, ei köyhempi.
 *
 * KESKIARVO EIKÄ POIMINTA. Joka kolmannen pisteen ottaminen olisi
 * aliasointia: yksi terävä huippu jäisi ruudukkoon täydellä
 * korkeudellaan ja sen vieressä oleva laakso katoaisi, jolloin
 * varjostus saisi UUTTA rakeisuutta sen sijaan että menettäisi sitä.
 * n x n -lohkon keskiarvo on alipäästösuodatin, ja juuri se on tässä
 * haluttu: vuoriston muoto säilyy, yksittäisen ruudun kohina ei.
 *
 * REUNA TÄYDENNETÄÄN TOISTAMALLA, EI PUDOTETA. Jos viimeinen lohko
 * jäisi vajaaksi, sen keskipiste ei osuisi tasavälisen ruudukon
 * kohtaan, ja koko ruudukon georeferointi vinoutuisi kuvan oikeassa
 * ja alalaidassa. Siksi ruudukkoa jatketaan reuna-arvolla täyteen
 * lohkoon asti: väli pysyy tasaisena ja kate kasvaa hivenen, mikä on
 * turvallinen suunta (kuvan reuna ei jää ilman korkeutta).
 *
 * KULMAT SIIRTYVÄT PUOLI LOHKOA SISÄÄNPÄIN, koska karkean ruudun arvo
 * edustaa lohkonsa KESKIPISTETTÄ eikä sen vasenta ylänurkkaa. Ilman
 * tätä siirtoa maasto luisuisi puoli lohkoa (3' hilalla noin 1,8 km)
 * koilliseen suhteessa rantaviivaan, joka tulee vektoreista.
 *
 * RANTAVIIVA EI OLE TÄSSÄ RUUDUKOSSA. Rannan ääriviivan piirtää
 * piirto.js Natural Earthin monikulmioista (`rantaPolku`), ja meren
 * ala rasteroidaan omaksi maskikseen (aineisto.mjs `meriruudukko`)
 * SAMOISTA vektoreista tähän ruudukkoon. Harvennus tehdään siis ennen
 * maskia, jolloin maski syntyy suoraan karkeaan ruudukkoon eikä
 * hienoa maskia jouduta keskiarvoistamaan — ja itse rantaviiva pysyy
 * yhtä terävänä kuin ennen, koska se ei tule korkeushilasta.
 */
export function harvenna(pala, n) {
  if (!Number.isInteger(n) || n < 1) throw new Error(`Harvennus ${n} ei ole kelvollinen.`);
  if (n === 1) return pala;
  const puskuri = Buffer.from(pala.b64, 'base64');
  const hieno = new Int16Array(puskuri.buffer, puskuri.byteOffset, puskuri.byteLength / 2);
  const w = Math.ceil(pala.w / n);
  const h = Math.ceil(pala.h / n);
  const ulos = new Int16Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let summa = 0;
      for (let dy = 0; dy < n; dy++) {
        // Reunan täydennys: viimeisen rivin/sarakkeen arvo toistuu.
        const sy = Math.min(pala.h - 1, y * n + dy);
        for (let dx = 0; dx < n; dx++) {
          const sx = Math.min(pala.w - 1, x * n + dx);
          summa += hieno[sy * pala.w + sx];
        }
      }
      ulos[y * w + x] = Math.round(summa / (n * n));
    }
  }
  // Karkean ruudun arvo edustaa lohkonsa keskipistettä.
  const puoli = (n - 1) / 2 / 60;
  return {
    w,
    h,
    lon0: pala.lon0 + puoli,
    lon1: pala.lon0 + ((w - 1) * n) / 60 + puoli,
    lat1: pala.lat1 - puoli,
    lat0: pala.lat1 - ((h - 1) * n) / 60 - puoli,
    aukkoja: pala.aukkoja,
    kaariminuutit: n,
    b64: Buffer.from(ulos.buffer, ulos.byteOffset, ulos.byteLength).toString('base64'),
  };
}
