#!/usr/bin/env node
/*
 * MAASTOLAATAT NATIIVIPELILLE: Copernicus GLO-30/GLO-90 → Cesiumin quantized-mesh.
 * (Karttaseppä 23.9.2026, Fablen tilaus: natiivi käyttää Cesiumia; ensin Ranska,
 * sitten "maailma": koko maailma GLO-90:stä ja Eurooppa tarkemmin GLO-30:stä.)
 *
 *   node tools/maasto/tee-maasto.mjs [--dem <glo30>] [--dem90 <glo90>] --ulos <kansio>
 *        [--alue -6,41,10,52] [--tasot 0-11] [--ruudukko 65] [--osa i/n]
 *        [--maailma 6] [--vain-maa-alkaen 7] [--glo30-kynnys 0.001]
 *        [--luettelo] [--lista]
 *
 * --maailma Z (korjaus 23.9.2026): tasot 0…Z tehdään koko maailmalle
 * (DEM:n ulkopuolella 0 m), jotta Cesium ei ylinäytteistä alueen
 * ulkopuolta z0:n jättiläislaatasta vaan tason Z laatoista.
 *
 * TASON ALUE JA LÄHDE (maailma-ajo 24.9.2026) ovat yhdessä puhtaassa
 * funktiossa `tasonSuunnitelma`: tasot 0…maailma koko maailmalle, sitä
 * syvemmät vain `--alue`-laatikkoon; tasosta `--vain-maa-alkaen` lähtien
 * tehdään vain laatat, jotka leikkaavat jonkin olemassa olevan DEM-ruudun
 * (merilaattaa ei tehdä, Cesium ylinäytteistää emolaatan). Suunniteltu ajo:
 * `--maailma 10 --alue -25,34,45,72 --tasot 0-12 --vain-maa-alkaen 7`.
 * `--lista` on kuiva ajo: laattamäärät tasoittain ja osittain, ei laattoja.
 *
 * KAKSI LÄHDETTÄ: `--dem` = GLO-30 (vain COG_10-nimet), `--dem90` = GLO-90
 * (vain COG_30-nimet), jotta aineistot eivät sekoitu vaikka kansiossa olisi
 * vieraita tiedostoja. Ilman `--dem90`:tä työkalu toimii kuten Ranska-ajossa
 * tavu tavulta (testi). Ks. `lahdeJarjestys`: GLO-30 vasta kun näyteväli
 * on alle GLO30_KYNNYS.
 *
 * TIILITYS on Cesiumin GeographicTilingScheme (EPSG:4326, TMS): tasolla z on
 * 2^(z+1) × 2^z laattaa, laatta (x, y) kattaa lon −180 + x·180/2^z …, lat
 * −90 + y·180/2^z … (y kasvaa pohjoiseen). Laatta on (ruudukko)² näytettä
 * (2^k + 1), ja RTIN (rtin.mjs) harventaa sen virherajaan, joka on puolet
 * Cesiumin tasokohtaisesta geometrisesta virheestä (CesiumTerrainProvider:
 * 6378137 · 2π · 0,25 / (65 · 2) / 2^z ≈ 77 067 m / 2^z).
 *
 * NÄYTTEISTYS: jokainen näyte luetaan siitä 1°-ruudusta, johon se osuu,
 * bilineaarisesti siltä overview-tasolta, jonka pikseli on näyteväliä
 * pienempi (geotiff.mjs). Sama koordinaatti valitsee aina saman ruudun,
 * joten naapurilaattojen reunat täsmäävät. Puuttuva ruutu (avomeri tai
 * alueen ulkopuoli) = 0 m. Lähteen valinta riippuu vain tasosta (näyteväli)
 * ja 1°-ruudusta, ei koskaan laatasta, joten sama sääntö pätee kahdella
 * lähteellä: GLO-30:n peiton reunakin on laattojen välillä saumaton.
 *
 * RAJOITUS: `--alue`-laatikon ulkopuolella syvät tasot puuttuvat
 * luettelosta (Cesium ottaa silloin emolaatan) — tasoa 0 lukuun ottamatta,
 * joka on aina olemassa. Ranska-ajossa alueen ulkopuolen maa on 0 m:ssä.
 *
 * Tulos: <ulos>/<z>/<x>/<y>.terrain (gzip) ja <ulos>/layer.json.
 * Ämpäriin: Content-Type application/vnd.quantized-mesh, Content-Encoding gzip.
 */
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

import { avaaGeotiff } from './geotiff.mjs';
import { rtinVerkko, rtinVirheet } from './rtin.mjs';
import { koodaaLaatta } from './quantized-mesh.mjs';

export const CESIUM_TASO0_VIRHE = (6378137 * 2 * Math.PI * 0.25) / (65 * 2);
const MAAN_SADE = 6371008.8;
const RAD = Math.PI / 180;

/** Jänteen keskipisteen painuma (m) kahden pisteen (lon, lat asteina) välillä. */
export function janteenPainuma(lon1, lat1, lon2, lat2) {
  const s = Math.sin(((lat2 - lat1) * RAD) / 2) ** 2
    + Math.cos(lat1 * RAD) * Math.cos(lat2 * RAD) * Math.sin(((lon2 - lon1) * RAD) / 2) ** 2;
  const kulma = 2 * Math.asin(Math.min(1, Math.sqrt(s)));
  return MAAN_SADE * (1 - Math.cos(kulma / 2));
}
export const LAHDEMAININTA = 'Produced using Copernicus WorldDEM-30 © DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018 provided under COPERNICUS by the European Union and ESA; all rights reserved.';
export const LAHDEMAININTA_90 = 'Produced using Copernicus WorldDEM-90 © DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018 provided under COPERNICUS by the European Union and ESA; all rights reserved.';

/** Laatan rajat asteina. */
export function laatanAlue(z, x, y) {
  const koko = 180 / 2 ** z;
  return { west: -180 + x * koko, south: -90 + y * koko, east: -180 + (x + 1) * koko, north: -90 + (y + 1) * koko };
}

/** Tason laatat, jotka leikkaavat alueen (lon0, lat0, lon1, lat1). */
export function tasonLaatat(z, [lon0, lat0, lon1, lat1]) {
  if (z === 0) return { x0: 0, x1: 1, y0: 0, y1: 0 };
  const koko = 180 / 2 ** z;
  const x0 = Math.max(0, Math.floor((lon0 + 180) / koko));
  const x1 = Math.min(2 ** (z + 1) - 1, Math.ceil((lon1 + 180) / koko) - 1);
  const y0 = Math.max(0, Math.floor((lat0 + 90) / koko));
  const y1 = Math.min(2 ** z - 1, Math.ceil((lat1 + 90) / koko) - 1);
  return { x0, x1, y0, y1 };
}

/**
 * Copernicus-tiedostonimi → { tunnus, lat, lon } tai null. Tunnus '10' =
 * GLO-30 (1″), '30' = GLO-90 (3″). macOS:n `._`-tiedostot ja muut nimet
 * hylätään (nimen on alettava "Copernicus_DSM_COG_").
 */
export function demNimi(f) {
  const m = /^Copernicus_DSM_COG_(\d\d)_([NS])(\d\d)_00_([EW])(\d\d\d)_00_DEM\.tif$/.exec(f);
  if (!m) return null;
  return {
    tunnus: m[1],
    lat: (m[2] === 'N' ? 1 : -1) * Number(m[3]),
    lon: (m[4] === 'E' ? 1 : -1) * Number(m[5]),
  };
}

/**
 * DEM-hakemisto: "44,3" → polku, ja avatut ruudut pienessä LRU:ssa.
 * `tunnus` rajaa aineiston (GLO-30 = '10', GLO-90 = '30'): samassa kansiossa
 * voi olla toisen aineiston tiedostoja (23.9.2026 GLO-30-kansiossa oli
 * yksi COG_30-nimi), eikä niitä saa sekoittaa.
 *
 * LRU (maailma-ajo): laatat kuljetaan sarakeryhmä kerrallaan etelästä
 * pohjoiseen (`tasonLaatatJarjestyksessa`), joten syvillä tasoilla
 * samanaikaisesti tarvitaan vain 2 × 2 ruutua ja jokainen ruutu käydään
 * ryhmässä kerran: LRU 12. Matalilla tasoilla (z ≤ 6) yksi näyterivi
 * ylittää kymmeniä ruutuja (z2: 65 ruutua, seuraava rivi samoissa), joten
 * LRU on 96 — silloin ruuduista luetaan vain pienin overview (GLO-90 300²,
 * alle 0,4 Mt). 96 pitää avoimet tiedostot macOS:n oletusrajan (256)
 * alla kahdellakin lähteellä. Avoin ruutu pitää geotiff.mjs:ssä enintään
 * 25 purettua 1024²-ruutua (4 Mt kpl), joten syvillä tasoilla 12 ruutua ≈
 * enintään 1,2 Gt prosessia kohti (käytännössä 2 × 2 ruutua kerrallaan).
 */
export function demHakemisto(kansio, avaa = avaaGeotiff, { tunnus = '10', lru = 48 } = {}) {
  const polut = new Map();
  for (const f of existsSync(kansio) ? readdirSync(kansio) : []) {
    const d = demNimi(f);
    if (!d || d.tunnus !== tunnus) continue;
    polut.set(`${d.lat},${d.lon}`, join(kansio, f));
  }
  const auki = new Map();
  let koko = lru;
  const karsi = () => {
    while (auki.size > koko) { const [k, v] = auki.entries().next().value; v?.sulje(); auki.delete(k); }
  };
  const ruutu = (lat, lon) => {
    const avain = `${lat},${lon}`;
    if (auki.has(avain)) { const g = auki.get(avain); auki.delete(avain); auki.set(avain, g); return g; }
    const polku = polut.get(avain);
    const g = polku ? avaa(polku) : null;
    auki.set(avain, g);
    karsi();
    return g;
  };
  return {
    ruutuja: polut.size,
    /*
     * Onko 1°-ruutu (lat, lon = lounaisnurkan kokonaisluvut) kansiossa?
     * Pyramidin syvät tasot (dem-ikkuna.mjs, 23.9.2026) tarvitsevat eron
     * "ruutu puuttuu" ja "korkeus on 0 m" välillä: puuttuva ruutu ei ole
     * merenpinta vaan paikka, jossa käytetään vanhaa 1′-aineistoa.
     * Ei avaa tiedostoa, joten `korkeus` pysyy entisellään (puuttuva = 0).
     */
    onRuutu: (lat, lon) => polut.has(`${lat},${lon}`),
    asetaLru(n) { koko = n; karsi(); },
    /** Korkeus (m) näytevälille `vali` (asteina) sopivalta tasolta. */
    korkeus(lon, lat, vali) {
      const g = ruutu(Math.floor(lat), Math.floor(lon));
      if (!g) return 0;
      let ti = 0;
      while (ti + 1 < g.tasot.length && g.pikselinAsteet(ti + 1) <= vali) ti += 1;
      return g.korkeus(lon, lat, ti);
    },
    sulje() { for (const g of auki.values()) g?.sulje(); auki.clear(); },
  };
}

/*
 * GLO-30 VAI GLO-90 (maailma-ajo 24.9.2026). GLO-90:n pikseli on 3″ ≈
 * 0,000833° (leveyssuunnassa kaikkialla; pituussuunnassa 50°:n pohjois-
 * puolella harvempi). GLO-90 on laskettu GLO-30:stä, joten niin kauan kuin
 * näyteväli on vähintään GLO-90:n pikseli, GLO-30 ei tuo lisää: näyte
 * luetaan kummastakin käytännössä samalta tarkkuudelta. Kynnys 0,001° on
 * tasojen 11 ja 12 välissä (ruudukolla 65: z11 = 0,00137°, z12 = 0,00069°),
 * eli GLO-30:tä käytetään tasosta 12 alkaen. Kynnys on näytevälissä, joten
 * valinta riippuu vain tasosta, ei laatasta.
 */
export const GLO30_KYNNYS = 0.001;

/**
 * Lähteiden kokeilujärjestys näytevälille (asteina): tarkalla tasolla ensin
 * GLO-30, muuten ensin GLO-90. Toinen on varalla, jos ensimmäisen ruutua ei
 * ole (esim. Euroopan GLO-30-laatikon reunalla tai jos GLO-90:ssä on aukko);
 * molempien puuttuessa 0 m.
 */
export const lahdeJarjestys = (vali, kynnys = GLO30_KYNNYS) => (vali < kynnys ? ['glo30', 'glo90'] : ['glo90', 'glo30']);

/**
 * Kaksi lähdettä yhdeksi: `korkeus(lon, lat, vali)` valitsee ruudun
 * (floor lat, floor lon) ensimmäisestä lähteestä, jossa ruutu on. Sama
 * koordinaatti ja sama taso → sama lähde ja sama arvo kaikissa laatoissa.
 */
export function kaksiLahdetta({ glo30 = null, glo90 = null, kynnys = GLO30_KYNNYS }) {
  const lahteet = { glo30, glo90 };
  const lahde = (lon, lat, vali) => {
    const la = Math.floor(lat); const lo = Math.floor(lon);
    for (const nimi of lahdeJarjestys(vali, kynnys)) if (lahteet[nimi]?.onRuutu(la, lo)) return nimi;
    return null;
  };
  return {
    ruutuja: (glo30?.ruutuja ?? 0) + (glo90?.ruutuja ?? 0),
    onRuutu: (lat, lon) => Boolean(glo30?.onRuutu(lat, lon) || glo90?.onRuutu(lat, lon)),
    /** Näytteen lähde ('glo30' | 'glo90' | null = 0 m), testejä ja tarkistusta varten. */
    lahde,
    asetaLru(n) { glo30?.asetaLru(n); glo90?.asetaLru(n); },
    korkeus(lon, lat, vali) {
      const nimi = lahde(lon, lat, vali);
      return nimi ? lahteet[nimi].korkeus(lon, lat, vali) : 0;
    },
    sulje() { glo30?.sulje(); glo90?.sulje(); },
  };
}

/** Yksi laatta tavuiksi (gzip). */
export function teeLaatta(dem, z, x, y, n = 65) {
  const a = laatanAlue(z, x, y);
  const vali = (a.east - a.west) / (n - 1);
  const h = new Float32Array(n * n);
  for (let j = 0; j < n; j += 1) {
    const lat = a.north - j * vali;
    for (let i = 0; i < n; i += 1) h[j * n + i] = dem.korkeus(a.west + i * vali, lat, vali);
  }
  const kynnys = Math.max(0.5, (CESIUM_TASO0_VIRHE / 2 ** z) * 0.5);
  // Ruutupiste (i, j) → (lon, lat); kaarevuus virheeseen (ks. rtin.mjs).
  const kaarevuus = (ax, ay, bx, by) => janteenPainuma(a.west + ax * vali, a.north - ay * vali, a.west + bx * vali, a.north - by * vali);
  const { pisteet, kolmiot } = rtinVerkko(h, n, kynnys, rtinVirheet(h, n, kaarevuus));
  const P = pisteet.map(([i, j]) => [i / (n - 1), 1 - j / (n - 1), h[j * n + i]]);
  // Kiertosuunta vastapäivään (u itään, v pohjoiseen) jokaiselle kolmiolle.
  const T = kolmiot.map(([p, q, r]) => {
    const [ax, ay] = P[p]; const [bx, by] = P[q]; const [cx, cy] = P[r];
    return (bx - ax) * (cy - ay) - (by - ay) * (cx - ax) >= 0 ? [p, q, r] : [p, r, q];
  });
  const raaka = koodaaLaatta({ alue: a, pisteet: P, kolmiot: T });
  return { tavut: gzipSync(raaka, { level: 9 }), pisteita: P.length, kolmioita: T.length, hMax: Math.max(...h) };
}

/** layer.json (Cesium CesiumTerrainProvider). */
export const MAAILMA = [-180, -90, 180, 90];
/** Tason z alue: koko maailma tasoilla 0…maailma, muuten `alue`. */
export const tasonAlue = (z, alue, maailma = -1) => (z <= maailma ? MAAILMA : alue);

/**
 * TASON SUUNNITELMA (puhdas funktio, maailma-ajo 24.9.2026): mikä alue,
 * tehdäänkö vain maalaatat, näyteväli ja missä järjestyksessä lähteitä
 * kokeillaan. Taso 0 on aina koko maailma eikä koskaan vain-maa (juuri on
 * pakollinen).
 */
export function tasonSuunnitelma(z, {
  alue, maailma = -1, vainMaaAlkaen = Infinity, n = 65, kynnys = GLO30_KYNNYS,
}) {
  const vali = 180 / 2 ** z / (n - 1);
  return {
    z,
    alue: tasonAlue(z, alue, maailma),
    vainMaa: z > 0 && z >= vainMaaAlkaen,
    vali,
    lahteet: lahdeJarjestys(vali, kynnys),
  };
}

/** Leikkaako laatta (puoliavoimesti) jonkin olemassa olevan 1°-ruudun. */
export function laattaOnMaalla(z, x, y, onRuutu) {
  const a = laatanAlue(z, x, y);
  const lat0 = Math.max(-90, Math.floor(a.south)); const lat1 = Math.min(89, Math.ceil(a.north) - 1);
  const lon0 = Math.max(-180, Math.floor(a.west)); const lon1 = Math.min(179, Math.ceil(a.east) - 1);
  for (let lat = lat0; lat <= lat1; lat += 1) {
    for (let lon = lon0; lon <= lon1; lon += 1) if (onRuutu(lat, lon)) return true;
  }
  return false;
}

/**
 * Sarakeryhmä: tasolla z ≥ 7 yhden z7-sarakkeen (1,40625°) laatat, sitä
 * matalammilla yksi sarake. Osat (`--osa i/n`) jaetaan ryhmittäin
 * (ryhmä mod n), joten tasoilla 0…7 jako on sama kuin ennen (x mod n) ja
 * syvillä tasoilla yksi 1°-ruutu kuuluu enintään kahdelle osalle —
 * ruutuja ei pureta kahdeksaan kertaan.
 */
export const sarakeRyhma = (z) => 2 ** Math.max(0, z - 7);

/**
 * Tason laatat tekojärjestyksessä: ryhmä kerrallaan, ryhmän sisällä rivi
 * kerrallaan etelästä pohjoiseen ja rivillä lännestä itään (DEM-ruudut
 * käydään kerran, LRU pysyy pienenä). Vain-maa-tasolla meriruudut
 * ohitetaan. Tuottaa [x, y].
 */
export function* tasonLaatatJarjestyksessa(suunnitelma, onRuutu, osa = 0, osia = 1) {
  const { z } = suunnitelma;
  const t = tasonLaatat(z, suunnitelma.alue);
  const r = sarakeRyhma(z);
  for (let g = Math.floor(t.x0 / r); g <= Math.floor(t.x1 / r); g += 1) {
    if (osia > 1 && g % osia !== osa) continue;
    const xa = Math.max(t.x0, g * r); const xb = Math.min(t.x1, g * r + r - 1);
    for (let y = t.y0; y <= t.y1; y += 1) {
      for (let x = xa; x <= xb; x += 1) {
        if (suunnitelma.vainMaa && !laattaOnMaalla(z, x, y, onRuutu)) continue;
        yield [x, y];
      }
    }
  }
}

/**
 * Tason `available`-suorakulmiot. Vain-maa-tasolla rivin maalaattojen
 * ajot yhdistetään pystysuunnassa: ajo [a, b] jatkaa edellisen rivin
 * suorakulmiota, jos sillä rivillä oli täsmälleen sama ajo. Suorakulmiot
 * kattavat täsmälleen samat laatat kuin `tasonLaatatJarjestyksessa`
 * (kaikki osat yhteensä) — testi.
 */
export function tasonSaatavuus(suunnitelma, onRuutu) {
  const { z } = suunnitelma;
  const t = tasonLaatat(z, suunnitelma.alue);
  if (!suunnitelma.vainMaa) return [{ startX: t.x0, startY: t.y0, endX: t.x1, endY: t.y1 }];
  const valmiit = [];
  let auki = new Map();
  for (let y = t.y0; y <= t.y1; y += 1) {
    const uudet = new Map();
    let alku = -1;
    for (let x = t.x0; x <= t.x1 + 1; x += 1) {
      const maa = x <= t.x1 && laattaOnMaalla(z, x, y, onRuutu);
      if (maa && alku < 0) alku = x;
      if (!maa && alku >= 0) {
        const avain = `${alku},${x - 1}`;
        const r = auki.get(avain);
        if (r) { r.endY = y; auki.delete(avain); uudet.set(avain, r); } else uudet.set(avain, { startX: alku, startY: y, endX: x - 1, endY: y });
        alku = -1;
      }
    }
    valmiit.push(...auki.values());
    auki = uudet;
  }
  valmiit.push(...auki.values());
  return valmiit.sort((p, q) => p.startY - q.startY || p.startX - q.startX);
}

export function kerroksenKuvaus({
  tasot, alue, versio, maailma = -1, vainMaaAlkaen = Infinity, onRuutu = null, n = 65, maininta = LAHDEMAININTA,
}) {
  const available = [];
  for (let z = 0; z <= tasot[1]; z += 1) {
    if (z < tasot[0]) { available.push([]); continue; }
    const s = tasonSuunnitelma(z, { alue, maailma, vainMaaAlkaen, n });
    if (s.vainMaa && !onRuutu) throw new Error('vain-maa-luettelo tarvitsee DEM-ruudut (--dem/--dem90)');
    available.push(tasonSaatavuus(s, onRuutu));
  }
  return {
    tilejson: '2.1.0', name: 'Matkakirja maasto', version: '1.0.0', format: 'quantized-mesh-1.0',
    scheme: 'tms', tiles: [`{z}/{x}/{y}.terrain?v=${versio}`], projection: 'EPSG:4326',
    bounds: [-180, -90, 180, 90], minzoom: 0, maxzoom: tasot[1], extensions: ['octvertexnormals'],
    attribution: maininta, available,
  };
}

/**
 * layer.json tekstiksi. Ranska-muoto (sisennys 1) säilyy, kun suorakulmioita
 * on vähän; vain-maa-luettelossa niitä on kymmeniätuhansia, jolloin tiivis
 * JSON (Cesium lukee sen kerran käynnistyksessä).
 */
export function kerrosTekstiksi(k) {
  const maara = k.available.reduce((s, l) => s + l.length, 0);
  return `${JSON.stringify(k, null, maara > 200 ? undefined : 1)}\n`;
}

/** Komentorivi → asetukset. */
export function lueAsetukset(argv) {
  const arvo = (nimi, oletus) => { const i = argv.indexOf(`--${nimi}`); return i >= 0 ? argv[i + 1] : oletus; };
  const [osa, osia] = arvo('osa', '0/1').split('/').map(Number);
  return {
    demKansio: arvo('dem'), dem90Kansio: arvo('dem90'), ulos: arvo('ulos'),
    alue: arvo('alue', '-6,41,10,52').split(',').map(Number),
    tasot: arvo('tasot', '0-11').split('-').map(Number),
    n: Number(arvo('ruudukko', 65)),
    osa, osia,
    versio: arvo('versio', '2026-09-23a'),
    maailma: Number(arvo('maailma', -1)),
    vainMaaAlkaen: Number(arvo('vain-maa-alkaen', Infinity)),
    kynnys: Number(arvo('glo30-kynnys', GLO30_KYNNYS)),
    luettelo: argv.includes('--luettelo'),
    lista: argv.includes('--lista'),
  };
}

/**
 * DEM-lähde asetuksista. Ilman --dem90:tä pelkkä GLO-30-hakemisto kuten
 * Ranska-ajossa (sama koodipolku, tavu tavulta sama tulos).
 */
export function avaaLahteet({ demKansio, dem90Kansio, kynnys }) {
  const glo30 = demKansio ? demHakemisto(demKansio, avaaGeotiff, { tunnus: '10' }) : null;
  if (!dem90Kansio) return { dem: glo30, maininta: LAHDEMAININTA };
  const glo90 = demHakemisto(dem90Kansio, avaaGeotiff, { tunnus: '30' });
  return {
    dem: kaksiLahdetta({ glo30, glo90, kynnys }),
    maininta: glo30 ? `${LAHDEMAININTA} ${LAHDEMAININTA_90}` : LAHDEMAININTA_90,
  };
}

/** Koko ajo (komentorivi ja testit). Palauttaa tehtyjen laattojen määrät tasoittain. */
export async function aja(argv, loki = console.log) {
  const a = lueAsetukset(argv);
  const { tasot, alue, n, osa, osia, versio, maailma, vainMaaAlkaen, kynnys } = a;
  if ((!a.demKansio && !a.dem90Kansio) || (!a.ulos && !a.lista)) {
    throw new Error('käyttö: [--dem <glo30>] [--dem90 <glo90>] --ulos <kansio> [--alue] [--tasot 0-11] [--osa i/n] [--maailma Z] [--vain-maa-alkaen Z] [--luettelo | --lista]');
  }
  const { dem, maininta } = avaaLahteet(a);
  const suunnitelmat = [];
  for (let z = tasot[0]; z <= tasot[1]; z += 1) suunnitelmat.push(tasonSuunnitelma(z, { alue, maailma, vainMaaAlkaen, n, kynnys }));
  const maarat = {};

  if (a.lista) {
    // Kuiva ajo: laatat tasoittain ja osittain, suorakulmiot ja layer.jsonin koko.
    let yht = 0;
    const osittain = new Array(osia).fill(0);
    for (const s of suunnitelmat) {
      let tasolla = 0;
      for (let o = 0; o < osia; o += 1) {
        let m = 0;
        const it = tasonLaatatJarjestyksessa(s, dem.onRuutu, o, osia);
        while (!it.next().done) m += 1;
        osittain[o] += m; tasolla += m;
      }
      const suorakulmioita = tasonSaatavuus(s, dem.onRuutu).length;
      maarat[s.z] = tasolla; yht += tasolla;
      const lahde = !a.dem90Kansio ? 'GLO-30' : s.lahteet[0] === 'glo30' && a.demKansio ? 'GLO-30 (varalla GLO-90)' : 'GLO-90';
      loki(`  z${s.z}: ${tasolla} laattaa, ${suorakulmioita} suorakulmiota, alue ${s.alue.join(',')}${s.vainMaa ? ', vain maa' : ''}, ${lahde}`);
    }
    const teksti = kerrosTekstiksi(kerroksenKuvaus({ tasot: [0, tasot[1]], alue, versio, maailma, vainMaaAlkaen, onRuutu: dem.onRuutu, n, maininta }));
    loki(`yhteensä ${yht} laattaa; osat ${osittain.join(' / ')}; layer.json ${(teksti.length / 1e3).toFixed(0)} kt`);
    dem.sulje();
    return maarat;
  }

  mkdirSync(a.ulos, { recursive: true });
  if (a.luettelo) {
    const k = kerroksenKuvaus({ tasot, alue, versio, maailma, vainMaaAlkaen, onRuutu: dem.onRuutu, n, maininta });
    writeFileSync(join(a.ulos, 'layer.json'), kerrosTekstiksi(k));
    loki(`layer.json: tasot ${tasot.join('–')}, alue ${alue.join(',')}`);
    dem.sulje();
    return maarat;
  }
  loki(`DEM-ruutuja ${dem.ruutuja}, tasot ${tasot.join('–')}, ruudukko ${n}, osa ${osa}/${osia}`);
  const alku = Date.now();
  let laattoja = 0; let tavuja = 0; let kolmioita = 0;
  for (const s of suunnitelmat) {
    // Matalilla tasoilla näyterivi ylittää kymmeniä ruutuja (z2: 65); syvillä 2 × 2 riittää.
    dem.asetaLru(s.z <= 6 ? 96 : 12);
    const tz = Date.now(); let tasolla = 0;
    const kansiot = new Set();
    for (const [x, y] of tasonLaatatJarjestyksessa(s, dem.onRuutu, osa, osia)) {
      if (!kansiot.has(x)) { mkdirSync(join(a.ulos, String(s.z), String(x)), { recursive: true }); kansiot.add(x); }
      const l = teeLaatta(dem, s.z, x, y, n);
      writeFileSync(join(a.ulos, String(s.z), String(x), `${y}.terrain`), l.tavut);
      laattoja += 1; tasolla += 1; tavuja += l.tavut.length; kolmioita += l.kolmioita;
    }
    maarat[s.z] = tasolla;
    loki(`  z${s.z}: ${tasolla} laattaa, ${((Date.now() - tz) / 1000).toFixed(1)} s`);
  }
  dem.sulje();
  loki(`valmis: ${laattoja} laattaa, ${(tavuja / 1e6).toFixed(1)} Mt, ka ${Math.round(kolmioita / Math.max(1, laattoja))} kolmiota, ${((Date.now() - alku) / 1000).toFixed(0)} s`);
  return maarat;
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  try { await aja(process.argv.slice(2)); } catch (e) {
    if (!e.message.startsWith('käyttö')) throw e;
    console.error(e.message); process.exit(2);
  }
}
