#!/usr/bin/env node
/*
 * MAAKUNTARAJAT (Siirtoseppä 23.9.2026, Natiivisepän B17: maakuntien
 * värjäys pallolla). Sama muoto kuin maarajat: { id, iso3, nimi, bbox,
 * renkaat [[[lon, lat]]] }, id = "<ISO3>:<tunnus>" (sama avain kuin
 * js/karttatyokalu-maakunnat.js ja Natiivi-UI:n Maakunnat.Valittu).
 *
 *   node tools/vienti/maakuntarajat.mjs --paivita
 *
 * Lähde on webin oma maakunta-aineisto ämpärissä
 * (js/pallomaakunnat.js PALLOMAAKUNNAT_JUURI: <ISO>.bin + <ISO>.json,
 * Natural Earth 10m admin-1, public domain). Purku tehdään pelin
 * funktiolla puraMaa, harvennus Douglas–Peucker 0,02° ja pyöristys
 * 1e-3°. Renkaat täytetään parillisuussäännöllä. Tulos
 * maakuntarajat.json; vienti lukee vain sen.
 *
 * SKEEMA 1.25 (Natiivisepän pyyntö 24.9.2026, Fable: rajat vektoriviivoina):
 * harvennus tehdään KAARINA, ei renkaittain. Ämpärin aineisto on
 * topologisesti puhdas (naapurien yhteinen särmä on kummassakin renkaassa
 * samoin kärjin), joten särmät kootaan kaariksi solmusta solmuun (solmu =
 * kärki, jonka aste ≠ 2 tai jossa särmän omistajat vaihtuvat) ja jokainen
 * kaari harvennetaan kerran. Renkaat rakennetaan samoista kaarista, joten
 * täyttö ja viiva osuvat yhteen. kaaret = jokainen sisäraja kerran ja
 * ulkorajat (rannikko, valtionraja) kerran.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { gunzipSync, gzipSync } from 'node:zlib';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { harvenna } from './maarajat.mjs';

const TAMA = dirname(fileURLToPath(import.meta.url));
/*
 * SKEEMA 1.42 (Fable 25.9.2026, Karttasepän löydökset 105/107): kaikki webin
 * maakuntamaat (js/karttatyokalu-maakunnat.js MAAKUNTIEN_MAAT, joilla maakuntienMaa), nimet webin
 * maakunnanNimi-funktiolla. Tiedosto on gzipattu (8 Mt → 2,4 Mt), jotta
 * repon historia ei kasva joka aineistoversiolla raakana JSONina.
 */
export const MAAKUNTATIEDOSTO = join(TAMA, 'maakuntarajat.json.gz');
export const MAAKUNTARAJOJEN_TOLERANSSI = 0.02;
const pyorista = (v) => Math.round(v * 1000) / 1000;

export function lueMaakuntarajat() {
  return existsSync(MAAKUNTATIEDOSTO) ? JSON.parse(gunzipSync(readFileSync(MAAKUNTATIEDOSTO)).toString('utf8')) : { alueet: [], maat: [] };
}

const karkiAvain = (p) => `${p[0]},${p[1]}`;

/** Suljettu kaari (alku = loppu) halkaistaan kaukaisimmasta kärjestä, jotta DP ei romahda. */
function harvennaKaari(kaari, tol) {
  const suljettu = karkiAvain(kaari[0]) === karkiAvain(kaari.at(-1));
  if (!suljettu || kaari.length <= 4) return harvenna(kaari, tol);
  let k = 1; let max = -1;
  for (let i = 1; i < kaari.length - 1; i += 1) {
    const d = (kaari[i][0] - kaari[0][0]) ** 2 + (kaari[i][1] - kaari[0][1]) ** 2;
    if (d > max) { max = d; k = i; }
  }
  return [...harvenna(kaari.slice(0, k + 1), tol).slice(0, -1), ...harvenna(kaari.slice(k), tol)];
}

/**
 * Kaaret ja niistä rakennetut renkaat. alueet = [{ id, renkaat: [[[lon, lat]…]] }]
 * suljettuina ja harventamattomina. Palauttaa { renkaat: Map(id → renkaat), kaaret }.
 */
export function kaariTopologia(alueet, tol = MAAKUNTARAJOJEN_TOLERANSSI, pyor = pyorista) {
  const renkaat = alueet.flatMap((a) => a.renkaat.map((r) => {
    const puhdas = r.filter((p, i) => i === 0 || karkiAvain(p) !== karkiAvain(r[i - 1]));
    if (karkiAvain(puhdas[0]) !== karkiAvain(puhdas.at(-1))) puhdas.push(puhdas[0]);
    return { id: a.id, r: puhdas };
  })).filter(({ r }) => r.length >= 4);
  const sarma = (a, b) => (a < b ? `${a}|${b}` : `${b}|${a}`);
  const omistajat = new Map(); const naapurit = new Map(); const piste = new Map();
  for (const { id, r } of renkaat) {
    for (let i = 0; i + 1 < r.length; i += 1) {
      const [a, b] = [karkiAvain(r[i]), karkiAvain(r[i + 1])];
      piste.set(a, r[i]);
      const k = sarma(a, b);
      if (!omistajat.has(k)) omistajat.set(k, []);
      omistajat.get(k).push(id);
      for (const [x, y] of [[a, b], [b, a]]) {
        if (!naapurit.has(x)) naapurit.set(x, new Set());
        naapurit.get(x).add(y);
      }
    }
  }
  const tunnus = (k) => [...omistajat.get(k)].sort().join('&');
  const solmut = new Set();
  for (const [v, n] of naapurit) {
    if (n.size !== 2) { solmut.add(v); continue; }
    const [x, y] = [...n];
    if (tunnus(sarma(v, x)) !== tunnus(sarma(v, y))) solmut.add(v);
  }
  // Silmukat ilman solmua (saaret, enklaavit): pienin kärki solmuksi, sama kummallekin puolelle.
  for (const { r } of renkaat) {
    const avaimet = r.map(karkiAvain);
    if (!avaimet.some((k) => solmut.has(k))) solmut.add([...avaimet].sort()[0]);
  }
  const kaaret = []; const suunta = new Map(); const kaytetty = new Set();
  const kulje = (alku, seuraava) => {
    const polku = [alku, seuraava]; let edellinen = alku; let nyt = seuraava;
    while (!solmut.has(nyt)) {
      const jatko = [...naapurit.get(nyt)].find((x) => x !== edellinen);
      edellinen = nyt; nyt = jatko; polku.push(nyt);
    }
    const n = kaaret.length;
    for (let i = 0; i + 1 < polku.length; i += 1) {
      kaytetty.add(sarma(polku[i], polku[i + 1]));
      suunta.set(`${polku[i]}>${polku[i + 1]}`, { kaari: n, etu: true });
      suunta.set(`${polku[i + 1]}>${polku[i]}`, { kaari: n, etu: false });
    }
    kaaret.push({ polku, sarmia: polku.length - 1 });
  };
  for (const s of [...solmut].sort()) {
    for (const n of [...naapurit.get(s)].sort()) if (!kaytetty.has(sarma(s, n))) kulje(s, n);
  }
  const harvennetut = kaaret.map(({ polku }) => {
    const h = harvennaKaari(polku.map((k) => piste.get(k)), tol).map(([lon, lat]) => [pyor(lon), pyor(lat)]);
    return h.filter((p, i) => i === 0 || karkiAvain(p) !== karkiAvain(h[i - 1]));
  });
  const ulos = new Map();
  for (const { id, r } of renkaat) {
    const avaimet = r.slice(0, -1).map(karkiAvain);
    const alku = avaimet.findIndex((k) => solmut.has(k));
    const kierto = [...avaimet.slice(alku), ...avaimet.slice(0, alku)];
    const uusi = [];
    for (let i = 0; i < kierto.length;) {
      const { kaari, etu } = suunta.get(`${kierto[i]}>${kierto[(i + 1) % kierto.length]}`);
      const h = etu ? harvennetut[kaari] : [...harvennetut[kaari]].reverse();
      uusi.push(...h.slice(0, -1));
      i += kaaret[kaari].sarmia;
    }
    const puhdas = uusi.filter((p, i) => i === 0 || karkiAvain(p) !== karkiAvain(uusi[i - 1]));
    if (puhdas.length >= 3) puhdas.push([...puhdas[0]]);
    if (puhdas.length < 4) continue;
    if (!ulos.has(id)) ulos.set(id, []);
    ulos.get(id).push(puhdas);
  }
  // Pyöristys voi painaa kaksi lyhyttä kaarta samaksi janaksi: kaari, jonka kaikki janat on jo nähty, jää pois.
  const nahty = new Set();
  const ulosKaaret = harvennetut.filter((k) => {
    if (k.length < 2) return false;
    const janat = k.slice(1).map((p, i) => sarma(karkiAvain(k[i]), karkiAvain(p)));
    if (janat.every((j) => nahty.has(j))) return false;
    for (const j of janat) nahty.add(j);
    return true;
  });
  return { renkaat: ulos, kaaret: ulosKaaret };
}

async function paivita() {
  const { PALLOMAAKUNNAT_JUURI, PALLOMAAKUNNAT_VERSIO, puraMaa } = await import('../../js/pallomaakunnat.js');
  const { MAAKUNTIEN_MAAT, maakunnanNimi, maakuntienMaa } = await import('../../js/karttatyokalu-maakunnat.js');
  // Web näyttää maakunnat vain maille, joilla on nimiä (maakuntienMaa; GUF, PRI, NFK ja FLK ovat tyhjiä).
  const listalla = MAAKUNTIEN_MAAT.filter(({ iso }) => maakuntienMaa(iso));
  const raaka = [];
  const ilman = [];
  for (const { iso } of listalla) {
    const [binV, jsonV] = await Promise.all([fetch(`${PALLOMAAKUNNAT_JUURI}${iso}.bin`), fetch(`${PALLOMAAKUNNAT_JUURI}${iso}.json`)]);
    // Maa listalla ilman omaa aineistoa (esim. GUF on FRA:n sisällä): web ei piirrä sille maakuntia.
    if (binV.status === 404 || jsonV.status === 404) { ilman.push(iso); continue; }
    if (!binV.ok || !jsonV.ok) throw new Error(`${iso}: ${binV.status}/${jsonV.status}`);
    const [bin, json] = [await binV.arrayBuffer(), await jsonV.json()];
    const { paikat } = puraMaa(new Uint8Array(bin));
    for (const a of json.alueet) {
      const renkaat = a.renkaat.map(([alku, loppu]) => {
        const r = [];
        for (let i = alku; i < loppu; i += 1) r.push([paikat[i * 2], paikat[i * 2 + 1]]);
        return r;
      });
      // 1.43: webin väri (tools/tee-maakuntavektorit.mjs varita, 0…k−1, naapureilla eri).
      raaka.push({ id: `${iso}:${a.tunnus}`, iso3: iso, nimi: maakunnanNimi(iso, a.tunnus), vari: a.vari, renkaat });
    }
  }
  // Kaikki maat yhdessä: maiden väliset rajat yhdistyvät, kun kärjet ovat samat.
  const topo = kaariTopologia(raaka);
  const alueet = raaka.filter((a) => topo.renkaat.has(a.id)).map(({ id, iso3, nimi, vari }) => {
    const renkaat = topo.renkaat.get(id);
    let [w, s, e, n] = [Infinity, Infinity, -Infinity, -Infinity];
    for (const r of renkaat) for (const [lon, lat] of r) {
      w = Math.min(w, lon); e = Math.max(e, lon); s = Math.min(s, lat); n = Math.max(n, lat);
    }
    return { id, iso3, nimi, vari, bbox: [w, s, e, n], renkaat };
  });
  alueet.sort((a, b) => (a.id < b.id ? -1 : 1));
  const omat = new Set(alueet.map((a) => a.iso3));
  const maat = listalla.filter(({ iso }) => omat.has(iso)).map(({ iso, nimi }) => ({ iso3: iso, nimi }));
  writeFileSync(MAAKUNTATIEDOSTO, gzipSync(`${JSON.stringify({
    lahde: 'Natural Earth 10m admin_1_states_provinces (public domain), webin maakunta-aineisto ämpärissä',
    versio: PALLOMAAKUNNAT_VERSIO, toleranssi: MAAKUNTARAJOJEN_TOLERANSSI, maat, alueet, kaaret: topo.kaaret,
  })}\n`, { level: 9 }));
  return { alueita: alueet.length, puuttuu: raaka.length - alueet.length, kaaria: topo.kaaret.length, maita: maat.length, listalla: listalla.length, ilmanAineistoa: ilman };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (!process.argv.includes('--paivita')) { console.error('käyttö: node tools/vienti/maakuntarajat.mjs --paivita'); process.exit(1); }
  paivita().then((t) => { console.log(JSON.stringify(t)); process.exit(0); });
}
