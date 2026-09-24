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
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { laudaltaAsteiksi } from '../../js/fokusmitat.js';
import { ISO2 } from './iso2.mjs';

const TAMA = dirname(fileURLToPath(import.meta.url));
const KOOT_TIEDOSTO = join(TAMA, 'offline-koot.json');

export const OFFLINE_LAHTEET = {
  rasteri: {
    url: 'https://media.matkakirja.app/julisteet/pallo/laatat/2026-09-22c-pohja-20260922c/{z}/{x}/{y}.jpg',
    skeema: 'xyz', projektio: 'EPSG:3857', koko: 256, minzoom: 0, maxzoom: 8, globaaliMax: 5,
  },
  maasto: {
    layer: 'https://media.matkakirja.app/julisteet/maasto/2026-09-23b/layer.json',
    url: 'https://media.matkakirja.app/julisteet/maasto/2026-09-23b/{z}/{x}/{y}.terrain?v=2026-09-23b',
    skeema: 'tms', projektio: 'EPSG:4326', globaaliMax: 6,
  },
};
const MERCATOR_MAX = 85.05112878;
// Sama rajaus kuin tools/vienti/tarkista-media.mjs: linkit, säännöttömät
// tiedostonimet ja ulkoiset kuva-, ääni- ja video-URLit (hahmotelmien
// viitekuvat, lähdelinkit) eivät ole pelin omaa mediaa.
const EI_MEDIAA = new Set(['linkki', 'tiedosto', 'kuva-url', 'aani-url', 'video-url']);

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
  const kaupungit = new Map(lue('kokoelmat/kaupungit.json').alkiot.map((k) => [k.id, k.maa]));
  const { viitteet } = lue(manifest.media.tiedosto);
  const omat = viitteet.filter((v) => v.url && !EI_MEDIAA.has(v.laji));
  const arvot = new Map(omat.map((v) => [v.arvo, v]));
  const maat = new Set(Object.keys(lue('moduulit/js/packs/maailmankartta.json').exportit.MAAILMANKARTTA.map.countryShapes));
  for (const m of kaupungit.values()) if (m) maat.add(m);
  const jako = new Map();
  const lisaa = (maa, arvo) => { if (!jako.has(maa)) jako.set(maa, new Set()); jako.get(maa).add(arvo); };
  for (const k of manifest.kokoelmat) {
    if (k.nimi === 'esilasketut') continue;
    for (const a of lue(k.tiedosto).alkiot) {
      const maa = (typeof a.maa === 'string' && maat.has(a.maa)) ? a.maa : (a.kaupunki ? kaupungit.get(a.kaupunki) : null);
      if (!maa) continue;
      const kay = (o) => {
        if (typeof o === 'string') { if (arvot.has(o)) lisaa(maa, o); } else if (o && typeof o === 'object') for (const v of Object.values(o)) kay(v);
      };
      kay(a);
    }
  }
  const esiintymanMaa = (e) => {
    const paate = e.moduuli.match(/-([a-z]{3})\.js$/);
    if (paate && maat.has(paate[1].toUpperCase())) return paate[1].toUpperCase();
    for (const osa of e.polku.split('/')) {
      if (maat.has(osa)) return osa;
      if (kaupungit.get(osa)) return kaupungit.get(osa);
    }
    return null;
  };
  for (const v of omat) for (const e of v.esiintymat) { const m = esiintymanMaa(e); if (m) lisaa(m, v.arvo); }
  const sidotut = new Set([...jako.values()].flatMap((s) => [...s]));
  return { jako, globaali: omat.filter((v) => !sidotut.has(v.arvo)).map((v) => v.arvo), arvot };
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
  const t = { rasteri: 0, maasto: 0, media: 0, yht: 0 };
  for (const x of lista) for (const k of Object.keys(t)) t[k] += x[k] ?? 0;
  return t;
}

export function kokoaOffline({ tiedostot, manifest, countryShapes, kartta = null, mannerNimet = {}, koot = lueKoot() }) {
  const { jako, globaali, arvot } = jaaMedia(tiedostot, manifest);
  const mediaTavut = (lista) => lista.reduce((a, arvo) => a + (koot.media[arvot.get(arvo).laji] ?? koot.media.muu ?? 0), 0);
  const url = (arvo) => arvot.get(arvo).url;
  const R = OFFLINE_LAHTEET.rasteri; const M = OFFLINE_LAHTEET.maasto;
  const saatavilla = koot.maasto.available ?? [];

  const globaaliRasteri = {}; let globaaliRasteriTavut = 0;
  for (let z = R.minzoom; z <= R.globaaliMax; z++) {
    globaaliRasteri[z] = [0, 0, 2 ** z - 1, 2 ** z - 1];
    globaaliRasteriTavut += 4 ** z * (koot.rasteri.keskitavut[z] ?? 0);
  }
  const globaaliMaasto = {}; let globaaliMaastoTavut = 0;
  for (let z = 0; z <= M.globaaliMax && z < saatavilla.length; z++) {
    globaaliMaasto[z] = saatavilla[z].map((a) => [a.startX, a.startY, a.endX, a.endY]);
    globaaliMaastoTavut += saatavilla[z].reduce((s, a) => s + (a.endX - a.startX + 1) * (a.endY - a.startY + 1), 0)
      * (koot.maasto.keskitavut[z] ?? 0);
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

  const maat = {};
  for (const [iso, maa] of Object.entries(countryShapes)) {
    if (!maa.renkaat?.length) continue;
    const renkaat = renkaatAsteina(maa);
    const b = bbox(renkaat);
    const rasteri = {}; const maasto = {}; const laattoja = { rasteri: 0, maasto: 0 };
    let rTavut = 0; let mTavut = 0;
    for (let z = R.globaaliMax + 1; z <= R.maxzoom; z++) {
      const t = rasteriLaatat(renkaat, b, z);
      rasteri[z] = t.vali; laattoja.rasteri += t.laattoja; rTavut += t.laattoja * (koot.rasteri.keskitavut[z] ?? 0);
    }
    for (let z = M.globaaliMax + 1; z < saatavilla.length; z++) {
      const t = maastoLaatat(renkaat, b, z, saatavilla[z]);
      if (!t) continue;
      maasto[z] = t.vali; laattoja.maasto += t.laattoja; mTavut += t.laattoja * (koot.maasto.keskitavut[z] ?? 0);
    }
    const media = [...(jako.get(iso) ?? [])].sort();
    const medTavut = mediaTavut(media);
    maat[iso] = {
      iso2: ISO2[iso] ?? null, nimi: maa.nimi, rasteri, maasto, laattoja,
      media: media.map(url),
      tavuja: { rasteri: Math.round(rTavut), maasto: Math.round(mTavut), media: Math.round(medTavut),
        yht: Math.round(rTavut + mTavut + medTavut) },
    };
  }
  const globaaliTavut = { rasteri: Math.round(globaaliRasteriTavut), maasto: Math.round(globaaliMaastoTavut),
    media: 0, yht: Math.round(globaaliRasteriTavut + globaaliMaastoTavut) };
  return {
    $skeema: 'matkakirja-vienti/1/offline',
    arvio: true,
    koot: { haettu: koot.haettu, otos: koot.otos },
    lahteet: OFFLINE_LAHTEET,
    globaali: {
      rasteri: globaaliRasteri, maasto: globaaliMaasto, media: [], tavuja: globaaliTavut,
    },
    valinnaiset,
    maat,
    ...(kartta ? { ryhmat: kokoaRyhmat(maat, kartta, mannerNimet, globaaliTavut) } : {}),
  };
}

/*
 * ryhmat: pelaajan valittavat lataukset. maailma = globaali osa (aina
 * ensin); <maanosa> = maanosan maat (laatat, maasto ja media summattuina;
 * maiden jakama media voi laskea kahdesti, joten arvio on yläraja);
 * kaikki = maailma + kaikki maat. maat-rivit jäävät Natiivisepän
 * sisäiseen käyttöön (lataaja käy ryhmän maat läpi).
 */
function kokoaRyhmat(maat, kartta, mannerNimet, globaaliTavut) {
  const maanosa = maidenMaanosat(kartta);
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
    if (!v.url || EI_MEDIAA.has(v.laji)) continue;
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
    maasto: { poltto: M.layer.split('/').at(-2), available: layer.available, keskitavut: maasto },
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
