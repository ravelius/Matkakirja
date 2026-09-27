#!/usr/bin/env node
/*
 * OFFLINE-MANIFESTI NATIIVILLE (Siirtoseppä 23.9.2026, skeema 1.9).
 *
 *   node tools/vienti/offline.mjs --paivita-koot [--vienti dist/vienti]
 *
 * Natiivin Alueet/IOfflineLataus (Natiiviseppä, proto RAJAPINTA.md osa 7)
 * lataa pelaajan valitsemat maat offline-käyttöön. Vienti kirjoittaa
 * pakettiin offline.json:n (kokoaOffline): mitä ladataan maailmalle
 * kerran ja mitä maittain, sekä arvio tavuista.
 *
 * Natiivisepän sopimus 23.9.2026:
 *   - rasteri: XYZ Web Mercator, 256 px, z0–z8; globaalisti z0–z5,
 *     maittain z6–z8.
 *   - maasto: quantized-mesh, TMS, EPSG:4326 (z0 = 2 × 1 laattaa);
 *     globaalisti z0–z6, maittain z7–maxzoom siellä, missä layer.json:n
 *     available kattaa.
 *   - latauslista maan rajaavina laattaväleinä {z: [x0, y0, x1, y1]};
 *     tavut lasketaan vain laatoista, jotka leikkaavat maan muotoa
 *     (countryShapes), ettei Norjan tai Chilen bbox yliarvioi.
 *   - media: maan kuvat ja äänet url:eina (kokoelmien kaupunki/maa-
 *     viittauksista ja raakakerroksen esiintymistä). Maahan sitomaton media
 *     ei ole globaalissa osassa vaan valinnaisina ryhminä (aanet, kuvat,
 *     linssit), jotka pelaaja lataa erikseen.
 *
 * Tavut ovat ARVIOITA: laattojen ja median keskikoot haetaan otoksella
 * (julkiset HEAD-pyynnöt, --paivita-koot) tiedostoon offline-koot.json,
 * joka commitoidaan. Vienti ei käytä verkkoa, joten sama lähde antaa
 * tavulleen saman offline.json:n.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { laudaltaAsteiksi } from '../../js/fokusmitat.js';
import { ISO2 } from './iso2.mjs';

const TAMA = dirname(fileURLToPath(import.meta.url));
const KOOT_TIEDOSTO = join(TAMA, 'offline-koot.json');

export const OFFLINE_LAHTEET = {
  /*
   * Skeema 1.40 (Natiiviseppä, Fablen päätös 25.9.2026, build 13): pohja
   * Karttasepän sarjaan 2026-09-25 (Z0–Z9, viivaton). Z0–Z8 kuten ennen
   * (globaalisti z0–z5, maittain z6–z8); Z9 vain kaupunkien ympärillä
   * (kaupunkitaso): sama kaupunkilista ja rajaus kuin satelliittipinnan
   * Z8–Z11 (Karttasepän tools/tee-satelliitti.mjs kaupunginLaatikko:
   * kokoelman kaupungit, tyyppi 'kaupunki', säde 60 km). Maan rasteri[9]
   * on siksi LISTA välejä, yksi kaupunkia kohti.
   * 26.9.2026: sarja 2026-09-26-pohja-20260926 (omistaja hyväksyi pohja 26:n myös natiiviin; kaikki 41 413
   * offline-laattaa tarkistettu ämpäristä). Ei skeemamuutosta, vain osoite ja koot.
   * Skeema 1.51 (Fable 27.9.2026): Z10 samaan sarjaan kaikkien kokoelman kaupunkien ympärille (± 1°), TARKKA
   * laattajoukko Karttasepän poltosta (tools/tee-pallolaatat.mjs kaupunkienLaatat, PR #3393) tiedostossa
   * tools/vienti/pallo-z10.json ({ sarja, laatat: ["x/y", …] }). Z10 on OMASSA avaimessa: lahteet.rasteri.kaupunkiRasteri
   * ja maan kaupunkiRasteri["10"] = lista välejä (rivien juoksut kaupungin laatikossa), joten jokainen väli on kokonaan
   * poltettu. Natiiviseppä 27.9.: vanhat buildit (≤ 1.0.30) lataavat kaikki maan rasteri-kentän tasot mutta piirtävät
   * enintään z9:n, joten rasteri["10"] olisi niille ~0,4 Gt hukkaa; maxzoom, kaupunkitaso ja tavuja.yht pysyvät
   * ennallaan. Ilman tiedostoa kaupunkiRasteri jää pois.
   */
  rasteri: {
    url: 'https://media.matkakirja.app/julisteet/pallo/laatat/2026-09-26-pohja-20260926/{z}/{x}/{y}.jpg',
    skeema: 'xyz', projektio: 'EPSG:3857', koko: 256, minzoom: 0, maxzoom: 9, globaaliMax: 5, maaMax: 8,
    kaupunkitaso: { tasot: [9], sadeKm: 60, kaupungit: "kokoelma kaupungit, tyyppi 'kaupunki'" },
  },
  maasto: {
    layer: 'https://media.matkakirja.app/julisteet/maasto/2026-09-23b/layer.json',
    url: 'https://media.matkakirja.app/julisteet/maasto/2026-09-23b/{z}/{x}/{y}.terrain?v=2026-09-23b',
    skeema: 'tms', projektio: 'EPSG:4326', globaaliMax: 6,
    /*
     * Skeema 1.53 (Fable 27.9.2026, ehdotus B1+C docs/raportit/siirtoseppa-maasto-offline-ehdotus-20260927.md):
     * maan maasto-kenttä enintään kokoMaaMax (z10), ja tarkemmat tasot vain kaupunkien ympäriltä omassa avaimessa
     * maat.*.kaupunkiMaasto (vanhat buildit ohittavat). Verkossa maasto haetaan ennallaan layer.json-tasoille asti.
     */
    kokoMaaMax: 10,
    kaupunkiMaasto: { tasot: [11, 12], sadeKm: 50 },
  },
};
const MERCATOR_MAX = 85.05112878;
const PALLO_Z10 = join(TAMA, 'pallo-z10.json');
/** Skeema 1.51: Karttasepän Z10-laattajoukko ("x/y") tai null. */
function palloZ10() {
  if (!existsSync(PALLO_Z10)) return null;
  const d = JSON.parse(readFileSync(PALLO_Z10, 'utf8'));
  if (!Array.isArray(d.laatat)) throw new Error('pallo-z10.json: laatat puuttuu');
  return new Set(d.laatat);
}
const Z10 = palloZ10();
if (Z10) {
  OFFLINE_LAHTEET.rasteri.kaupunkiRasteri = { tasot: [10], laatikkoAste: 1, kaupungit: 'kaikki kokoelman kaupungit',
    laattoja: Z10.size, lahde: 'tools/vienti/pallo-z10.json (Karttaseppä, tools/tee-pallolaatat.mjs kaupunkienLaatat)' };
}
// Sama rajaus kuin tools/vienti/tarkista-media.mjs: linkit, säännöttömät
// tiedostonimet ja ulkoiset kuva-, ääni- ja video-URLit (hahmotelmien
// viitekuvat, lähdelinkit) eivät ole pelin omaa mediaa.
const EI_MEDIAA = new Set(['linkki', 'tiedosto', 'kuva-url', 'aani-url', 'video-url']);
/*
 * Eheystarkistus 27.9.2026: absoluuttinen kuva- tai ääniosoite PELIN OMAAN ämpäriin (fokuskohteiden ja maakuntien
 * nostokuvat, saapumis- ja Livian puheet, aikajanat) on pelin omaa mediaa, vaikka laji on kuva-url/aani-url.
 * Ennen tätä ne jäivät offline-latauksesta pois (4 142 kuvaa ja 56 ääntä koko paketissa).
 */
const OMA_AMPARI = 'https://media.matkakirja.app/';
/*
 * Natiiviseppä 27.9.2026: vanhat buildit (≤ 1.0.31) lataavat maat.*.media-listan offline-kansioon, mutta natiivin Kuvat
 * ja Puhe eivät lue sitä, joten nämä lisäykset olisivat niille pelkkää latausta. Siksi ne ovat OMASSA avaimessa
 * maat.*.mediaKuvat (+ tavuja.mediaKuvat, ei yht:ssä); natiivi lukee sen 1.0.32:sta (Kuvat/Puhe offline-kansiosta).
 */
/*
 * Skeema 1.52: MERENTAKAISET ALUEET omiksi offline-kohteikseen (Fable 27.9.2026: VAIN EUROOPPA on maantieteellinen;
 * Bermuda, Falkland, Cayenne ja Nouméa eivät kuulu emämaan GBR/FRA pakettiin, jotta maakatto pysyy mielekkäänä).
 * Kaupungin maa on kokoelmassa emämaa; offline-jaossa alue saa oman ISO3-koodinsa, rasterin ± ALUE_ASTE kaupungin
 * ympäriltä ja maanosan kaupungin mantereesta.
 */
export const MERENTAKAISET = {
  bermuda: { iso: 'BMU', iso2: 'BM', nimi: 'Bermuda' },
  falkland: { iso: 'FLK', iso2: 'FK', nimi: 'Falklandinsaaret' },
  cayenne: { iso: 'GUF', iso2: 'GF', nimi: 'Ranskan Guayana' },
  noumea: { iso: 'NCL', iso2: 'NC', nimi: 'Uusi-Kaledonia' },
};
const ALUE_ASTE = 1.5;
function alueenMaa(c) { return MERENTAKAISET[c.id]?.iso ?? c.maa; }

/** Skeema 1.52: mediaKuvat-asetukset (Fable 27.9.2026: pienennetyt, katto 100 Mt maata kohden). */
export const MEDIAKUVAT = {
  katto: 100_000_000,
  // 1.54: 1024 px / JPEG 75 / kynnys 100 kt (Euroopan tavoite ≤ ~1,2 Gt; 1280/80 oli ~2,5 Gt).
  pieni: { juuri: 'pieni/', pitkaSivu: 1024, laatu: 75, kynnysTavut: 100_000 },
  // Järjestys katon sisällä (Fable 27.9.): karttanostot → miniatyyrit → Livian ja saapumisen puheet → luennat → muut.
  jarjestys: { karttavalot: 1, takynostot: 1, fokusvirrat: 1, miniatyyrit: 2, livianpuhe: 3,
    livianrepliikit: 3, saapumispuheet: 3, saapuminen: 3, luennat: 4 },
};
const MEDIAKUVAT_TIEDOSTO = join(TAMA, 'mediakuvat.json');
/** tools/vienti/mediakuvat.json (tools/vienti/mediakuvat.mjs --paivita): { tiedostot: { avain: [alkuperäinen, pieni|null] } }. */
export function lueMediakuvat(tiedosto = MEDIAKUVAT_TIEDOSTO) {
  return existsSync(tiedosto) ? JSON.parse(readFileSync(tiedosto, 'utf8')).tiedostot ?? {} : {};
}
/** Ämpärin avain osoitteesta (ilman kyselyä) ja pienennetyn kuvan avain. */
export const ampariAvain = (url) => url.slice(OMA_AMPARI.length).split(/[?#]/)[0];
export const pieniAvain = (avain) => `${MEDIAKUVAT.pieni.juuri}${avain.replace(/\.[a-z0-9]+$/i, '')}.jpg`;
const MEDIAKUVAT_KUVAUS = {
  kuvaus: 'Maan koko offline-media natiiville 1.0.32+ (skeema 1.54): kaikki pelin omat kuvat ämpärissä (myös media-'
    + 'listan kuvat, karttanostot, miniatyyrit, lehtikuvat) pienennettyinä sekä äänet ja puheet, jotka ovat jo ämpärissä. '
    + 'Alkio { url, pieni? }: lataa pieni jos on, tallenna url:n polulle. media-lista on vain vanhoille buildeille; '
    + 'alkuperäiskokoinen kuva haetaan verkosta, kun iso kuva avataan.',
  korvaaMedian: true,
  pieniKaava: `https://media.matkakirja.app/${MEDIAKUVAT.pieni.juuri}<avain ilman päätettä>.jpg|png `
    + `(pitkä sivu ${MEDIAKUVAT.pieni.pitkaSivu} px, JPEG ${MEDIAKUVAT.pieni.laatu}, kun alkuperäinen > ${MEDIAKUVAT.pieni.kynnysTavut} t)`,
  katto: MEDIAKUVAT.katto,
  jarjestys: 'karttanostot → miniatyyrit → Livian ja saapumisen puheet → luennat → muut kuvat; yli katon jäävät pois; musiikki, äänimaisemat ja tehosteet eivät offline-latauksessa',
};
const AANI_TIEDOSTO = /\.(mp3|ogg|oga|opus|m4a|aac|wav)$/i;
const SUORA_TIEDOSTO = /\.(jpe?g|png|webp|gif|svg|mp3|ogg|m4a|json|glb)$/i;
/** Skeema 1.52: mediaKuviin kuuluva viite (oma ämpäri, mutta laji kuva-url/aani-url tai kokoelmavaiheen suora osoite). */
export const onLisamedia = (v) => Boolean(v.url) && (v.laji === 'ampari-suora'
  || ((v.laji === 'kuva-url' || v.laji === 'aani-url') && v.url.startsWith(OMA_AMPARI)));
export const onOffline = (v) => Boolean(v.url) && (!EI_MEDIAA.has(v.laji) || onLisamedia(v));

/* ------------------------------------------------------------ geometria */

/** countryShapes-renkaat (laudan Miller-yksiköt) → [[lon, lat], …] per rengas. */
function renkaatAsteina(maa) {
  return maa.renkaat.map((r) => r.map(([x, y]) => {
    const a = laudaltaAsteiksi('maailmankartta', x, y);
    return [a.lon, a.lat];
  }));
}

function bbox(renkaat) {
  let [w, s, e, n] = [180, 90, -180, -90];
  for (const r of renkaat) for (const [lon, lat] of r) {
    w = Math.min(w, lon); e = Math.max(e, lon); s = Math.min(s, lat); n = Math.max(n, lat);
  }
  return { w, s, e, n };
}

/** Parillisuussääntö kaikkien renkaiden yli (saaret ja reiät). */
function sisalla(renkaat, lon, lat) {
  let sis = false;
  for (const r of renkaat) {
    for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
      const [xi, yi] = r[i]; const [xj, yj] = r[j];
      if ((yi > lat) !== (yj > lat) && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) sis = !sis;
    }
  }
  return sis;
}

function janaLeikkaa(ax, ay, bx, by, { w, s, e, n }) {
  // Liang–Barsky: leikkaako jana suorakaiteen.
  let t0 = 0; let t1 = 1;
  const dx = bx - ax; const dy = by - ay;
  for (const [p, q] of [[-dx, ax - w], [dx, e - ax], [-dy, ay - s], [dy, n - ay]]) {
    if (p === 0) { if (q < 0) return false; continue; }
    const t = q / p;
    if (p < 0) { if (t > t1) return false; if (t > t0) t0 = t; } else { if (t < t0) return false; if (t < t1) t1 = t; }
  }
  return true;
}

/** Leikkaako laatta (asteina) maan muotoa. */
function laattaLeikkaa(renkaat, laatta) {
  if (sisalla(renkaat, (laatta.w + laatta.e) / 2, (laatta.s + laatta.n) / 2)) return true;
  for (const r of renkaat) {
    for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
      if (janaLeikkaa(r[j][0], r[j][1], r[i][0], r[i][1], laatta)) return true;
    }
  }
  return false;
}

/* ---------------------------------------------------------- laattakaaviot */

const xyzX = (lon, z) => Math.floor(((lon + 180) / 360) * 2 ** z);
const xyzY = (lat, z) => {
  const l = Math.max(-MERCATOR_MAX, Math.min(MERCATOR_MAX, lat)) * (Math.PI / 180);
  return Math.floor(((1 - Math.log(Math.tan(l) + 1 / Math.cos(l)) / Math.PI) / 2) * 2 ** z);
};
const xyzLat = (y, z) => (Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / 2 ** z))) * 180) / Math.PI;
const rajaa = (v, z) => Math.max(0, Math.min(2 ** z - 1, v));

/** XYZ-laatat, jotka leikkaavat muotoa: { vali: [x0, y0, x1, y1], laattoja }. */
function rasteriLaatat(renkaat, b, z) {
  const x0 = rajaa(xyzX(b.w, z), z); const x1 = rajaa(xyzX(b.e, z), z);
  const y0 = rajaa(xyzY(b.n, z), z); const y1 = rajaa(xyzY(b.s, z), z);
  let laattoja = 0;
  for (let x = x0; x <= x1; x++) {
    for (let y = y0; y <= y1; y++) {
      const laatta = { w: (x / 2 ** z) * 360 - 180, e: ((x + 1) / 2 ** z) * 360 - 180, n: xyzLat(y, z), s: xyzLat(y + 1, z) };
      if (laattaLeikkaa(renkaat, laatta)) laattoja++;
    }
  }
  return { vali: [x0, y0, x1, y1], laattoja };
}

/*
 * KAUPUNGIN LAATIKKO (Karttasepän tee-satelliitti.mjs kaupunginLaatikko,
 * sama kaava): leveyssuunnassa säde/R radiaaneina, pituussuunnassa sama
 * jaettuna cos(lat):lla, pyöristys 4 desimaaliin.
 */
const MAAN_SADE_KM = 6371.0088;
const RAD = Math.PI / 180;
function kaupunginLaatikko(lon, lat, sadeKm) {
  const dLat = (sadeKm / MAAN_SADE_KM) / RAD;
  const dLon = dLat / Math.cos(lat * RAD);
  const p = (v) => Math.round(v * 1e4) / 1e4;
  return { w: p(Math.max(-180, lon - dLon)), s: p(Math.max(-MERCATOR_MAX, lat - dLat)),
    e: p(Math.min(180, lon + dLon)), n: p(Math.min(MERCATOR_MAX, lat + dLat)) };
}

/** Kaupunkitason välit maittain: { iso: { z: [[x0, y0, x1, y1], …] } } ja laattojen joukot. */
function kaupunkitasonValit(kaupungit, taso) {
  const maat = new Map();
  for (const c of kaupungit) {
    if (c.tyyppi !== 'kaupunki' || !c.maa || !Number.isFinite(c.lat) || !Number.isFinite(c.lon)) continue;
    const b = kaupunginLaatikko(c.lon, c.lat, taso.sadeKm);
    if (!maat.has(alueenMaa(c))) maat.set(alueenMaa(c), new Map());
    for (const z of taso.tasot) {
      const x0 = rajaa(xyzX(b.w, z), z); const x1 = rajaa(xyzX(b.e, z), z);
      const y0 = rajaa(xyzY(b.n, z), z); const y1 = rajaa(xyzY(b.s, z), z);
      const m = maat.get(alueenMaa(c));
      if (!m.has(z)) m.set(z, { valit: [], laatat: new Set() });
      m.get(z).valit.push([x0, y0, x1, y1]);
      for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) m.get(z).laatat.add(`${x}/${y}`);
    }
  }
  return maat;
}

/**
 * Skeema 1.51: Z10-välit maittain. Kaupungin laatikon (± laatikkoAste) poltetut laatat riveittäin juoksuiksi
 * [x0, y, x1, y]; sama laatta voi kuulua kahden maan kaupungille (laatat lasketaan tavuihin maittain kerran).
 */
function syvanTasonValit(kaupungit, maat, syva, joukko) {
  for (const c of kaupungit) {
    if (!c.maa || !Number.isFinite(c.lat) || !Number.isFinite(c.lon)) continue;
    const a = syva.laatikkoAste;
    const x0 = rajaa(xyzX(Math.max(-180, c.lon - a), 10), 10); const x1 = rajaa(xyzX(Math.min(180, c.lon + a), 10), 10);
    const y0 = rajaa(xyzY(Math.min(MERCATOR_MAX, c.lat + a), 10), 10); const y1 = rajaa(xyzY(Math.max(-MERCATOR_MAX, c.lat - a), 10), 10);
    if (!maat.has(alueenMaa(c))) maat.set(alueenMaa(c), new Map());
    const m = maat.get(alueenMaa(c));
    if (!m.has(10)) m.set(10, { valit: [], laatat: new Set() });
    const t = m.get(10);
    for (let y = y0; y <= y1; y++) {
      let alku = null;
      for (let x = x0; x <= x1 + 1; x++) {
        const on = x <= x1 && joukko.has(`${x}/${y}`) && !t.laatat.has(`${x}/${y}`);
        if (on && alku === null) alku = x;
        if (!on && alku !== null) { t.valit.push([alku, y, x - 1, y]); for (let k = alku; k < x; k++) t.laatat.add(`${k}/${y}`); alku = null; }
      }
    }
    if (!t.valit.length) m.delete(10);
  }
}

/** TMS EPSG:4326 -laatat (z0 = 2 × 1), rajattuna available-väleihin. */
function maastoLaatat(renkaat, b, z, saatavilla) {
  const leveys = 180 / 2 ** z;
  const x0 = Math.floor((b.w + 180) / leveys); const x1 = Math.min(2 ** (z + 1) - 1, Math.floor((b.e + 180) / leveys));
  const y0 = Math.floor((b.s + 90) / leveys); const y1 = Math.min(2 ** z - 1, Math.floor((b.n + 90) / leveys));
  const onSaatavilla = (x, y) => saatavilla.some((a) => x >= a.startX && x <= a.endX && y >= a.startY && y <= a.endY);
  let laattoja = 0; let [ax0, ay0, ax1, ay1] = [Infinity, Infinity, -1, -1];
  for (let x = x0; x <= x1; x++) {
    for (let y = y0; y <= y1; y++) {
      if (!onSaatavilla(x, y)) continue;
      const laatta = { w: x * leveys - 180, e: (x + 1) * leveys - 180, s: y * leveys - 90, n: (y + 1) * leveys - 90 };
      if (!laattaLeikkaa(renkaat, laatta)) continue;
      laattoja++;
      ax0 = Math.min(ax0, x); ay0 = Math.min(ay0, y); ax1 = Math.max(ax1, x); ay1 = Math.max(ay1, y);
    }
  }
  return laattoja ? { vali: [ax0, ay0, ax1, ay1], laattoja } : null;
}

/* ------------------------------------------------------------------ media */

/**
 * Median jako maihin: 1) kokoelman alkio, jolla on maa (ISO3) tai
 * kaupunki (→ maa), omistaa alkiossa esiintyvät mediaviitteet;
 * 2) raakakerroksen esiintymä, jonka moduulin nimi päättyy maakoodiin
 * (hahmotelma-fin.js) tai jonka polussa on maakoodi tai kaupunki-id.
 * Viite voi kuulua usealle maalle; loput ovat globaaleja.
 */
export function jaaMedia(tiedostot, manifest) {
  const lue = (p) => JSON.parse(tiedostot.get(p));
  const kaupungit = new Map(lue('kokoelmat/kaupungit.json').alkiot.map((k) => [k.id, alueenMaa(k)]));
  const { viitteet } = lue(manifest.media.tiedosto);
  const omat = viitteet.filter(onOffline);
  const arvot = new Map(omat.map((v) => [v.arvo, v]));
  const maat = new Set(Object.keys(lue('moduulit/js/packs/maailmankartta.json').exportit.MAAILMANKARTTA.map.countryShapes));
  for (const m of kaupungit.values()) if (m) maat.add(m);
  const jako = new Map();
  // Skeema 1.52: (maa, arvo) → pienin järjestysnumero (MEDIAKUVAT.jarjestys; 5 = muu).
  const jarjestys = new Map();
  const lisaa = (maa, arvo, j = 5) => {
    if (!jako.has(maa)) jako.set(maa, new Set());
    jako.get(maa).add(arvo);
    const k = `${maa}\t${arvo}`;
    jarjestys.set(k, Math.min(jarjestys.get(k) ?? 9, j));
  };
  for (const k of manifest.kokoelmat) {
    if (k.nimi === 'esilasketut') continue;
    for (const a of lue(k.tiedosto).alkiot) {
      // Skeema 1.52: merentakaisen alueen kaupungin alkio kuuluu alueelle, vaikka maa on emämaa.
      const maa = MERENTAKAISET[a.kaupunki] ? MERENTAKAISET[a.kaupunki].iso
        : (typeof a.maa === 'string' && maat.has(a.maa)) ? a.maa : (a.kaupunki ? kaupungit.get(a.kaupunki) : null);
      if (!maa) continue;
      const j = MEDIAKUVAT.jarjestys[k.nimi] ?? 5;
      const kay = (o) => {
        if (typeof o === 'string') {
          // Eheystarkistus 27.9.2026: kokoelmavaiheessa johdetut suorat osoitteet omaan ämpäriin (miniatyyrit, Livian
          // puheet ja eleet, luentojen äänet ja aikaleimat, lehtien valmiit kuvaosoitteet) eivät ole media.jsonissa.
          if (!arvot.has(o) && o.startsWith(OMA_AMPARI) && SUORA_TIEDOSTO.test(o.split(/[?#]/)[0])) {
            arvot.set(o, { arvo: o, laji: 'ampari-suora', url: o, esiintymat: [] });
          }
          if (arvot.has(o)) lisaa(maa, o, j);
        } else if (Array.isArray(o)) for (const v of o) kay(v);
        else if (o && typeof o === 'object') {
          // `<kenttä>Tila: 'puuttuu'` (livianpuhe.eleetTila): tiedostoa ei ole tarkoituksella, ei offline-listalle.
          for (const [avain, v] of Object.entries(o)) if (o[`${avain}Tila`] !== 'puuttuu') kay(v);
        }
      };
      kay(a);
    }
  }
  const esiintymanMaa = (e) => {
    const paate = e.moduuli.match(/-([a-z]{3})\.js$/);
    if (paate && maat.has(paate[1].toUpperCase())) return paate[1].toUpperCase();
    for (const osa of e.polku.split('/')) {
      if (MERENTAKAISET[osa]) return MERENTAKAISET[osa].iso;
      if (maat.has(osa)) return osa;
      if (kaupungit.get(osa)) return kaupungit.get(osa);
    }
    return null;
  };
  for (const v of omat) for (const e of v.esiintymat) { const m = esiintymanMaa(e); if (m) lisaa(m, v.arvo); }
  const sidotut = new Set([...jako.values()].flatMap((s) => [...s]));
  // Skeema 1.52: maahan sitomaton lisamedia ei mene valinnaisiin ryhmiin (vanhat buildit lataavat ne).
  return { jako, jarjestys, globaali: omat.filter((v) => !sidotut.has(v.arvo) && !onLisamedia(v)).map((v) => v.arvo), arvot };
}

/* ------------------------------------------------------------------ kokoaja */

export function lueKoot() {
  return JSON.parse(readFileSync(KOOT_TIEDOSTO, 'utf8'));
}

/**
 * offline.json: { $skeema, arvio, lahteet, globaali, valinnaiset, maat: { ISO3: … } }.
 * countryShapes: MAAILMANKARTTA.map.countryShapes (ISO3 → { nimi, renkaat }).
 */
/*
 * MAANOSARYHMÄT (skeema 1.23, omistajan päätös 23.9.2026: offline-lataus
 * maanosittain tai "Kaikki", ei yksittäisiä maita). Maan maanosa = sen
 * kaupunkien enemmistön maanosa (map.cityManner); tasatilanteessa ja
 * kaupungittomalla maalla maan keskipistettä (countryShapes.keskus)
 * lähimmän kaupungin maanosa laudan koordinaateissa.
 */
export function maidenMaanosat({ countryShapes, cities, cityCountry, cityManner }) {
  const tulos = {};
  // keskus on laudan pisteenä [x, y].
  const lahin = ([kx, ky]) => {
    let paras = null; let d = Infinity;
    for (const c of cities) {
      const e = (c.x - kx) ** 2 + (c.y - ky) ** 2;
      if (e < d) { d = e; paras = c; }
    }
    return paras ? cityManner[paras.id] : null;
  };
  for (const iso of Object.keys(countryShapes).sort()) {
    const laskut = {};
    for (const [c, m] of Object.entries(cityCountry)) if (m === iso && cityManner[c]) laskut[cityManner[c]] = (laskut[cityManner[c]] ?? 0) + 1;
    const jarj = Object.entries(laskut).sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1));
    const keskus = countryShapes[iso].keskus;
    tulos[iso] = jarj.length && (jarj.length === 1 || jarj[0][1] > jarj[1][1]) ? jarj[0][0]
      : (keskus ? lahin(keskus) : jarj[0]?.[0] ?? null);
  }
  return tulos;
}

function summaa(lista) {
  const t = { rasteri: 0, maasto: 0, media: 0, yht: 0, ...(Z10 ? { kaupunkiRasteri: 0 } : {}), mediaKuvat: 0, levy: 0, kaupunkiMaasto: 0, offline: 0 };
  for (const x of lista) for (const k of Object.keys(t)) t[k] += x[k] ?? 0;
  return t;
}

export function kokoaOffline({ tiedostot, manifest, countryShapes, kartta = null, mannerNimet = {}, koot = lueKoot(),
  mediakuvat = lueMediakuvat() }) {
  const { jako, jarjestys, globaali, arvot } = jaaMedia(tiedostot, manifest);
  const ehdokkaat = {};
  const mediaTavut = (lista) => lista.reduce((a, arvo) => a + (koot.media[arvot.get(arvo).laji] ?? koot.media.muu ?? 0), 0);
  const url = (arvo) => arvot.get(arvo).url;
  const R = OFFLINE_LAHTEET.rasteri; const M = OFFLINE_LAHTEET.maasto;
  const saatavilla = koot.maasto.available ?? [];

  const globaaliRasteri = {}; let globaaliRasteriTavut = 0;
  for (let z = R.minzoom; z <= R.globaaliMax; z++) {
    globaaliRasteri[z] = [0, 0, 2 ** z - 1, 2 ** z - 1];
    globaaliRasteriTavut += 4 ** z * (koot.rasteri.keskitavut[z] ?? 0);
  }
  const globaaliMaasto = {}; let globaaliMaastoTavut = 0; let globaaliMaastoLevy = 0;
  for (let z = 0; z <= M.globaaliMax && z < saatavilla.length; z++) {
    globaaliMaasto[z] = saatavilla[z].map((a) => [a.startX, a.startY, a.endX, a.endY]);
    const n = saatavilla[z].reduce((s, a) => s + (a.endX - a.startX + 1) * (a.endY - a.startY + 1), 0);
    globaaliMaastoTavut += n * (koot.maasto.keskitavut[z] ?? 0);
    globaaliMaastoLevy += n * (koot.maasto.purettu?.[z] ?? koot.maasto.keskitavut[z] ?? 0);
  }
  // Maahan sitomaton media ei kuulu "kerran kaikille" -osaan (Natiiviseppä
  // 23.9.2026): se jaetaan valinnaisiksi ryhmiksi, jotka pelaaja voi ladata
  // erikseen. Ryhmä: linssit (js/linssit/-esiintymä), äänet (aani-*-lajit),
  // kuvat (muut).
  const ryhma = (arvo) => {
    const v = arvot.get(arvo);
    if (v.esiintymat.some((e) => e.moduuli.startsWith('js/linssit/'))) return 'linssit';
    return v.laji.startsWith('aani-') ? 'aanet' : 'kuvat';
  };
  const ryhmat = new Map();
  for (const arvo of [...globaali].sort()) {
    const r = ryhma(arvo);
    if (!ryhmat.has(r)) ryhmat.set(r, []);
    ryhmat.get(r).push(arvo);
  }
  const valinnaiset = Object.fromEntries(['aanet', 'kuvat', 'linssit'].filter((r) => ryhmat.has(r)).map((r) => {
    const lista = ryhmat.get(r);
    return [r, { media: lista.map(url), tavuja: Math.round(mediaTavut(lista)) }];
  }));

  const kaupunginMaa = new Map(JSON.parse(tiedostot.get('kokoelmat/kaupungit.json')).alkiot.map((k) => [k.id, k.maa]));
  const maamerkit = new Map();
  if (tiedostot.has('kokoelmat/maamerkit.json')) {
    for (const a of JSON.parse(tiedostot.get('kokoelmat/maamerkit.json')).alkiot) {
      const iso = kaupunginMaa.get(a.kaupunki);
      if (!iso) continue;
      if (!maamerkit.has(iso)) maamerkit.set(iso, []);
      maamerkit.get(iso).push(a.malli);
    }
  }

  const kaupunkiKokoelma = tiedostot.get('kokoelmat/kaupungit.json');
  const kaupunkiLista = kaupunkiKokoelma ? JSON.parse(kaupunkiKokoelma).alkiot : [];
  const kaupunkiValit = kaupunkitasonValit(kaupunkiLista, R.kaupunkitaso);
  const syvatValit = new Map();
  if (Z10) syvanTasonValit(kaupunkiLista, syvatValit, R.kaupunkiRasteri, Z10);
  const maat = {};
  // Skeema 1.52: merentakaiset alueet omina kohteinaan (renkaana laatikko ± ALUE_ASTE kaupungin ympärillä).
  const alueet = Object.fromEntries(kaupunkiLista.filter((c) => MERENTAKAISET[c.id] && Number.isFinite(c.lat))
    .map((c) => [MERENTAKAISET[c.id].iso, { nimi: MERENTAKAISET[c.id].nimi, manner: c.manner ?? null, asteina: [[
      [c.lon - ALUE_ASTE, c.lat - ALUE_ASTE], [c.lon + ALUE_ASTE, c.lat - ALUE_ASTE], [c.lon + ALUE_ASTE, c.lat + ALUE_ASTE],
      [c.lon - ALUE_ASTE, c.lat + ALUE_ASTE], [c.lon - ALUE_ASTE, c.lat - ALUE_ASTE]]] }]));
  for (const [iso, maa] of [...Object.entries(countryShapes), ...Object.entries(alueet)]) {
    if (!maa.renkaat?.length && !maa.asteina) continue;
    const renkaat = maa.asteina ?? renkaatAsteina(maa);
    const b = bbox(renkaat);
    const rasteri = {}; const maasto = {}; const laattoja = { rasteri: 0, maasto: 0 };
    let rTavut = 0; let mTavut = 0; let mLevy = 0;
    for (let z = R.globaaliMax + 1; z <= R.maaMax; z++) {
      const t = rasteriLaatat(renkaat, b, z);
      rasteri[z] = t.vali; laattoja.rasteri += t.laattoja; rTavut += t.laattoja * (koot.rasteri.keskitavut[z] ?? 0);
    }
    // Kaupunkitaso: päällekkäiset laatat lasketaan tavuihin kerran.
    for (const [z, t] of kaupunkiValit.get(iso) ?? []) {
      rasteri[z] = t.valit; laattoja.rasteri += t.laatat.size;
      rTavut += t.laatat.size * (koot.rasteri.keskitavut[z] ?? koot.rasteri.keskitavut[R.maaMax] ?? 0);
    }
    // Skeema 1.51: Z10 omaan avaimeen (ei rasteri-kenttään eikä yht-summaan, ks. OFFLINE_LAHTEET.rasteri).
    const kaupunkiRasteri = {}; let kTavut = 0;
    for (const [z, t] of syvatValit.get(iso) ?? []) {
      kaupunkiRasteri[z] = t.valit; laattoja.kaupunkiRasteri = (laattoja.kaupunkiRasteri ?? 0) + t.laatat.size;
      kTavut += t.laatat.size * (koot.rasteri.keskitavut[z] ?? koot.rasteri.keskitavut[z - 1] ?? 0);
    }
    for (let z = M.globaaliMax + 1; z < saatavilla.length && z <= M.kokoMaaMax; z++) {
      const t = maastoLaatat(renkaat, b, z, saatavilla[z]);
      if (!t) continue;
      maasto[z] = t.vali; laattoja.maasto += t.laattoja; mTavut += t.laattoja * (koot.maasto.keskitavut[z] ?? 0);
      mLevy += t.laattoja * (koot.maasto.purettu?.[z] ?? koot.maasto.keskitavut[z] ?? 0);
    }
    // Skeema 1.53: tarkemmat maastotasot kaupunkien ympäriltä (± sadeKm), vain available-väleissä olevat laatat.
    const kaupunkiMaasto = {}; let kmTavut = 0;
    const omatKaupungit = kaupunkiLista.filter((c) => alueenMaa(c) === iso && Number.isFinite(c.lat) && Number.isFinite(c.lon));
    for (const z of M.kaupunkiMaasto.tasot) {
      if (z >= saatavilla.length || !omatKaupungit.length) continue;
      const w = 180 / 2 ** z; const nx = 2 ** (z + 1) - 1; const ny = 2 ** z - 1;
      const on = (x, y) => saatavilla[z].some((a) => x >= a.startX && x <= a.endX && y >= a.startY && y <= a.endY);
      const nahty = new Set(); const valit = [];
      for (const c of omatKaupungit) {
        const dla = M.kaupunkiMaasto.sadeKm / 111; const dlo = M.kaupunkiMaasto.sadeKm / (111 * Math.max(0.2, Math.cos(c.lat * Math.PI / 180)));
        const x0 = Math.max(0, Math.floor((c.lon - dlo + 180) / w)); const x1 = Math.min(nx, Math.floor((c.lon + dlo + 180) / w));
        const y0 = Math.max(0, Math.floor((c.lat - dla + 90) / w)); const y1 = Math.min(ny, Math.floor((c.lat + dla + 90) / w));
        for (let y = y0; y <= y1; y++) {
          let alku = null;
          for (let x = x0; x <= x1 + 1; x++) {
            const k = `${x}/${y}`;
            const ok = x <= x1 && !nahty.has(k) && on(x, y);
            if (ok && alku === null) alku = x;
            if (!ok && alku !== null) { valit.push([alku, y, x - 1, y]); for (let i = alku; i < x; i++) nahty.add(`${i}/${y}`); alku = null; }
          }
        }
      }
      if (!valit.length) continue;
      kaupunkiMaasto[z] = valit;
      laattoja.kaupunkiMaasto = (laattoja.kaupunkiMaasto ?? 0) + nahty.size;
      kmTavut += nahty.size * (koot.maasto.keskitavut[z] ?? 0);
    }
    const kaikkiMedia = [...(jako.get(iso) ?? [])].sort();
    const media = kaikkiMedia.filter((a) => !onLisamedia(arvot.get(a)));
    // Skeema 1.52: mediaKuvat järjestyksessä, ilman media-listan osoitteita, katon (MEDIAKUVAT.katto) sisällä.
    // Koko tools/vienti/mediakuvat.json:sta; mittaamaton tai puuttuva (alkuperäinen 0) jää pois.
    // Skeema 1.54 (Fable 27.9.2026): mediaKuvat on natiivin 1.0.32+ KOKO offline-media — myös media-listan kuvat
    // (pienennettyinä) ja äänet — yhden 100 Mt:n katon alla; media-lista jää vanhoille buildeille ennalleen.
    const urlinJarjestys = new Map();
    for (const a of kaikkiMedia) {
      const u = url(a);
      if (!u?.startsWith(OMA_AMPARI)) continue;
      const j = jarjestys.get(`${iso}\t${a}`) ?? 5;
      // Fable 27.9.: offline-media = kuvat + puhe. Ääni vain puhekokoelmista (järjestys 3–4); musiikki, äänimaisemat
      // ja tehosteet haetaan verkosta.
      if (AANI_TIEDOSTO.test(ampariAvain(u)) && j > 4) continue;
      urlinJarjestys.set(u, Math.min(urlinJarjestys.get(u) ?? 9, j));
    }
    const jarj = [...urlinJarjestys].sort((a, b) => a[1] - b[1] || (a[0] < b[0] ? -1 : 1));
    if (jarj.length) ehdokkaat[iso] = jarj;
    const mediaKuvat = []; let kuvaTavut = 0;
    for (const [u] of jarj) {
      const koko = mediakuvat[ampariAvain(u)];
      if (!koko || !(koko[0] > 0)) continue;
      const t = koko[1] ?? koko[0];
      if (kuvaTavut + t > MEDIAKUVAT.katto) continue;
      kuvaTavut += t;
      mediaKuvat.push(koko[1] != null
        ? { url: u, pieni: OMA_AMPARI + pieniAvain(ampariAvain(u)).replace(/\.jpg$/, `.${koko[2] ?? 'jpg'}`) } : { url: u });
    }
    // Skeema 1.33: maan kaupunkien 3D-maamerkit (tarkka koko kokoelmasta).
    const mallit = (maamerkit.get(iso) ?? []).sort((a, b) => (a.url < b.url ? -1 : 1));
    const medTavut = mediaTavut(media) + mallit.reduce((s, m) => s + m.tavuja, 0);
    maat[iso] = {
      iso2: ISO2[iso] ?? Object.values(MERENTAKAISET).find((a) => a.iso === iso)?.iso2 ?? null, nimi: maa.nimi, rasteri, ...(Object.keys(kaupunkiRasteri).length ? { kaupunkiRasteri } : {}), maasto, laattoja,
      media: [...media.map(url), ...mallit.map((m) => m.url)],
      ...(mediaKuvat.length ? { mediaKuvat } : {}),
      ...(Object.keys(kaupunkiMaasto).length ? { kaupunkiMaasto } : {}),
      tavuja: { rasteri: Math.round(rTavut), maasto: Math.round(mTavut), media: Math.round(medTavut),
        yht: Math.round(rTavut + mTavut + medTavut), ...(Z10 ? { kaupunkiRasteri: Math.round(kTavut) } : {}),
        mediaKuvat: kuvaTavut,
        // Skeema 1.52 (Natiiviseppä 27.9.): levykoko = yht, jossa maasto purettuna (iOS purkaa gzipin latauksessa).
        levy: Math.round(rTavut + mLevy + medTavut),
        // Skeema 1.53: kaupunkien ympäristön tarkka maasto (gzip-siirtokoko; natiivi 1.0.32+ tallentaa pakattuna,
        // Natiiviseppä 27.9.), ei yht:ssä eikä levy:ssä.
        kaupunkiMaasto: Math.round(kmTavut),
        // Skeema 1.54: natiivin 1.0.32+ offline-lataus siirtona (ei media-listaa): rasteri, maasto, Z10, kaupunkimaasto
        // ja mediaKuvat.
        offline: Math.round(rTavut + mTavut + kTavut + kmTavut + kuvaTavut) },
    };
  }
  const globaaliTavut = { rasteri: Math.round(globaaliRasteriTavut), maasto: Math.round(globaaliMaastoTavut),
    media: 0, yht: Math.round(globaaliRasteriTavut + globaaliMaastoTavut),
    levy: Math.round(globaaliRasteriTavut + globaaliMaastoLevy) };
  const tulos = {
    $skeema: 'matkakirja-vienti/1/offline',
    arvio: true,
    koot: { haettu: koot.haettu, otos: koot.otos },
    lahteet: { ...OFFLINE_LAHTEET, mediaKuvat: MEDIAKUVAT_KUVAUS },
    globaali: {
      rasteri: globaaliRasteri, maasto: globaaliMaasto, media: [], tavuja: globaaliTavut,
    },
    valinnaiset,
    maat,
    ...(kartta ? { ryhmat: kokoaRyhmat(maat, kartta, mannerNimet, globaaliTavut,
      Object.fromEntries(Object.entries(alueet).map(([iso, a]) => [iso, a.manner]))) } : {}),
  };
  // Ei pakettiin: kaikki mediaKuvat-ehdokkaat maittain järjestyksessä [[url, järjestys], …] ennen kattoa ja kokoja
  // (tools/vienti/mediakuvat.mjs --paivita mittaa ja pienentää niistä).
  Object.defineProperty(tulos, 'mediaKuvaEhdokkaat', { value: ehdokkaat, enumerable: false });
  return tulos;
}

/*
 * ryhmat: pelaajan valittavat lataukset. maailma = globaali osa (aina
 * ensin); <maanosa> = maanosan maat (laatat, maasto ja media summattuina;
 * maiden jakama media voi laskea kahdesti, joten arvio on yläraja);
 * kaikki = maailma + kaikki maat. maat-rivit jäävät Natiivisepän
 * sisäiseen käyttöön (lataaja käy ryhmän maat läpi).
 */
function kokoaRyhmat(maat, kartta, mannerNimet, globaaliTavut, alueidenManner = {}) {
  const maanosa = { ...maidenMaanosat(kartta), ...alueidenManner };
  const ryhmat = { maailma: { nimi: 'Maailma', maat: [], tavuja: globaaliTavut } };
  const mantereet = [...new Set(Object.values(maanosa).filter(Boolean))]
    .sort((a, b) => Object.keys(mannerNimet).indexOf(a) - Object.keys(mannerNimet).indexOf(b));
  for (const m of mantereet) {
    const isot = Object.keys(maat).filter((iso) => maanosa[iso] === m).sort();
    ryhmat[m] = { nimi: mannerNimet[m]?.nimi ?? m, maat: isot, tavuja: summaa(isot.map((iso) => maat[iso].tavuja)) };
  }
  const kaikki = Object.keys(maat).sort();
  ryhmat.kaikki = { nimi: 'Kaikki', maat: kaikki, tavuja: summaa([globaaliTavut, ...kaikki.map((iso) => maat[iso].tavuja)]) };
  for (const iso of Object.keys(maat)) maat[iso].manner = maanosa[iso] ?? null;
  return ryhmat;
}

/* ------------------------------------------------- kokojen päivitys (verkko) */

async function koko(osoite) {
  try {
    const r = await fetch(osoite, { method: 'HEAD', redirect: 'follow' });
    const n = Number(r.headers.get('content-length'));
    return r.ok && n > 0 ? n : null;
  } catch { return null; }
}

async function keskiarvo(osoitteet) {
  const koot = [];
  for (let i = 0; i < osoitteet.length; i += 8) {
    koot.push(...(await Promise.all(osoitteet.slice(i, i + 8).map(koko))));
  }
  const ok = koot.filter((k) => k);
  return ok.length ? Math.round(ok.reduce((a, b) => a + b, 0) / ok.length) : null;
}

/** Deterministinen otos: tasavälein. */
const otos = (lista, n) => (lista.length <= n ? lista : Array.from({ length: n }, (_, i) => lista[Math.floor((i * lista.length) / n)]));

async function paivitaKoot(vienti, n = 24) {
  const R = OFFLINE_LAHTEET.rasteri; const M = OFFLINE_LAHTEET.maasto;
  const rasteri = {};
  for (let z = R.minzoom; z <= R.maxzoom; z++) {
    // Otos pallon asutulta vyöltä (lat 60N–40S), jossa laatoissa on sisältöä.
    const y0 = xyzY(60, z); const y1 = xyzY(-40, z); const laatat = [];
    for (let i = 0; i < n; i++) {
      const x = Math.floor(((i + 0.5) / n) * 2 ** z); const y = y0 + Math.floor(((i * 7 + 3) % n / n) * (y1 - y0 + 1));
      laatat.push(R.url.replace('{z}', z).replace('{x}', x).replace('{y}', y));
    }
    rasteri[z] = await keskiarvo(laatat);
  }
  // Skeema 1.51: kaupunkiRasteri-tasot otoksena Karttasepän poltetusta joukosta (27.9. kaikki 13 856: 13 075 t).
  for (const z of R.kaupunkiRasteri?.tasot ?? []) {
    rasteri[z] = await keskiarvo(otos([...Z10].sort(), n * 4).map((xy) => R.url.replace('{z}', z).replace('{x}/{y}', xy)));
  }
  const layer = await (await fetch(M.layer)).json();
  const maasto = {};
  for (let z = 0; z < layer.available.length; z++) {
    const laatat = [];
    for (const a of layer.available[z]) {
      for (let i = 0; i < Math.ceil(n / layer.available[z].length); i++) {
        const x = a.startX + Math.floor(((i + 0.5) / n) * (a.endX - a.startX + 1));
        const y = a.startY + Math.floor((((i * 7 + 3) % n) / n) * (a.endY - a.startY + 1));
        laatat.push(M.url.replace('{z}', z).replace('{x}', x).replace('{y}', y));
      }
    }
    maasto[z] = await keskiarvo(otos(laatat, n));
  }
  const { viitteet } = JSON.parse(readFileSync(join(vienti, 'media.json'), 'utf8'));
  const lajeittain = new Map();
  for (const v of viitteet) {
    if (!onOffline(v)) continue;
    if (!lajeittain.has(v.laji)) lajeittain.set(v.laji, []);
    lajeittain.get(v.laji).push(v.url);
  }
  const media = {};
  for (const [laji, osoitteet] of [...lajeittain].sort()) media[laji] = await keskiarvo(otos(osoitteet, n));
  const kaikki = Object.values(media).filter(Boolean);
  media.muu = Math.round(kaikki.reduce((a, b) => a + b, 0) / kaikki.length);
  const tulos = {
    haettu: new Date().toISOString().slice(0, 10), otos: n,
    rasteri: { poltto: R.url.split('/').at(-4), keskitavut: rasteri },
    // purettu (levykoko) mitataan GET-otoksella erikseen (27.9.2026); säilytetään edellisestä.
    maasto: { poltto: M.layer.split('/').at(-2), available: layer.available, keskitavut: maasto,
      ...(lueKoot().maasto.purettu ? { purettu: lueKoot().maasto.purettu } : {}) },
    media,
  };
  writeFileSync(KOOT_TIEDOSTO, `${JSON.stringify(tulos, null, 1)}\n`);
  return tulos;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const i = process.argv.indexOf('--vienti');
  const vienti = resolve(i > 0 ? process.argv[i + 1] : join(TAMA, '../../dist/vienti'));
  if (process.argv.includes('--paivita-koot')) {
    const t = await paivitaKoot(vienti);
    console.log(`offline-koot.json: rasteri ${JSON.stringify(t.rasteri.keskitavut)}, maasto z0–${t.maasto.available.length - 1}, media ${Object.keys(t.media).length} lajia`);
  } else {
    console.log('käyttö: node tools/vienti/offline.mjs --paivita-koot [--vienti dist/vienti]');
  }
}
