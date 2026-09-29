/*
 * VUODEN 1873 VALTIONRAJAT — Isoisän linssin rajasetti (Karttaseppä 21.9.2026).
 *
 * Raamattu, Karttalinssit "ISOISÄN LINSSI — VUOSI 1873": raja-aineisto
 * historical-basemaps (GPL-3.0), 1878 → 1873 käsin, tarkennus nykyrajoilla,
 * muutokset dokumentoidaan. Tämä työkalu on se dokumentti: jokainen
 * muutos on koodissa nimettynä.
 *
 *   node tools/tee-rajat-1873.mjs [--lahde ~/pyramidi-poltto/rajat-1873/world_1878.geojson]
 *
 * Tuottaa
 *   tools/fokuskartta/rajat-1873.json.gz  — viivatason rajasetti (sama muoto
 *                                           kuin rajat-nykyiset: { setti, kuvaus,
 *                                           lahde, harvennus, viivat })
 *   assets/data/rajat-1873.json           — selaimelle (linssi lataa suoraan):
 *                                           { lahde, lisenssi, viivat: [{ l: luokka,
 *                                           p: [[lon,lat],…] }] }, 3 desimaalia
 *
 * VAIHEET
 *  1. Rajat ovat polygonien YHTEISET särmät: sama jana kahdessa piirteessä on
 *     maaraja, yhdessä on rantaviiva tai ulkoreuna (jää pois). Nimettömät
 *     piirteet (saaret, Etelämanner, "ei kenenkään maa" Afrikassa) osallistuvat
 *     jakoon mutta eivät tuota omia nimiä.
 *  2. 1878 → 1873 (Berliinin kongressi 1878 peruttuna):
 *     - Bulgaria ei ole olemassa (ruhtinaskunta 1878) → Osmanien valtakuntaa.
 *     - Bosnia-Hertsegovina Osmanien (Itävalta-Unkarin miehitys 1878).
 *     - Romania, Serbia, Montenegro: Osmanien vasalleja/autonomisia — rajat
 *       jäävät mutta luokkaan 2 (ohuempi viiva). Niiden vuoden 1878
 *       aluevoitot (Pohjois-Dobrudža, Nišin alue, Podgorica) jäävät tässä
 *       erässä 1878-muotoon: BORDERPRECISION 3 (≈ 18 km) ei kanna näitä
 *       käsin piirtämättä; korjataan atlaslehden (Stieler 1875 Balkan)
 *       päältä, jos omistaja haluaa (ks. docs/raportit/isoisa-1873-era1.md).
 *     - Kypros ei ole aineistossa erillisenä → jo Osmanien; Egypti Osmanien
 *       vasalli (SUBJECTO) → luokka 2.
 *  3. NAULAUS NYKYRAJOIHIN: 1873-raja, joka kulkee alle NAULAUS_AST päässä
 *     Natural Earthin nykyrajasta (tools/fokuskartta/rajat-nykyiset.json.gz),
 *     korvataan sen tarkalla geometrialla: viiva näytteistetään NAYTE_AST
 *     välein ja jokainen näyte projisoidaan lähimmälle nykyrajajanalle.
 *     Muuttuneet rajat (Elsass-Lothringen, Italia–Itävalta, Balkan, Puola,
 *     Suomi) jäävät aineiston tarkkuuteen.
 *  4. Harvennus 0,006° (sama kuin nykyrajoilla) ja pyöristys.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { gzipSync, gunzipSync } from 'node:zlib';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const TAALLA = dirname(fileURLToPath(import.meta.url));
const JUURI = join(TAALLA, '..');
const arg = (nimi, oletus) => { const i = process.argv.indexOf(`--${nimi}`); return i > 0 ? process.argv[i + 1] : oletus; };
const LAHDE = arg('lahde', `${homedir()}/pyramidi-poltto/rajat-1873/world_1878.geojson`);

/** Naulauksen etäisyysraja asteina (≈ 20 km). */
export const NAULAUS_AST = 0.2;
/** Näyteväli naulauksessa asteina (≈ 2 km). */
export const NAYTE_AST = 0.02;
/** Harvennus asteina (sama kuin rajat-nykyiset). */
export const HARVENNUS = 0.006;

/** Osmanien valtakuntaan 1873 sulautettavat 1878-piirteet. */
export const OSMANEIHIN = new Set(['Bulgaria', 'Bosnia-Herzegovina']);
/** Vasallit ja autonomiset (raja luokassa 2). */
export const VASALLIT = new Set(['Romania', 'Serbia', 'Montenegro', 'Egypt']);

const avain = ([x, y]) => `${x.toFixed(4)},${y.toFixed(4)}`;
const sarma = (a, b) => (avain(a) < avain(b) ? `${avain(a)}|${avain(b)}` : `${avain(b)}|${avain(a)}`);

/** Piirteen kaikki renkaat. */
function renkaat(g) {
  if (g.type === 'Polygon') return g.coordinates;
  if (g.type === 'MultiPolygon') return g.coordinates.flat();
  return [];
}

/** Douglas–Peucker asteina. */
function harvenna(viiva, tol) {
  if (viiva.length <= 2) return viiva;
  const et = (p, a, b) => {
    const dx = b[0] - a[0], dy = b[1] - a[1]; const l2 = dx * dx + dy * dy;
    const t = l2 ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l2)) : 0;
    return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
  };
  const pida = new Uint8Array(viiva.length); pida[0] = 1; pida[viiva.length - 1] = 1;
  const pino = [[0, viiva.length - 1]];
  while (pino.length) {
    const [i, j] = pino.pop(); let m = -1, md = tol;
    for (let k = i + 1; k < j; k++) { const d = et(viiva[k], viiva[i], viiva[j]); if (d > md) { md = d; m = k; } }
    if (m > 0) { pida[m] = 1; pino.push([i, m], [m, j]); }
  }
  return viiva.filter((_, i) => pida[i]);
}

/** Janahakemisto nykyrajoista 0,25°:n ruuduissa. */
function janahakemisto(viivat, ruutu = 0.25) {
  const h = new Map();
  const lisaa = (k, j) => { let l = h.get(k); if (!l) { l = []; h.set(k, l); } l.push(j); };
  for (const v of viivat) for (let i = 1; i < v.length; i++) {
    const a = v[i - 1], b = v[i];
    const x0 = Math.floor(Math.min(a[0], b[0]) / ruutu), x1 = Math.floor(Math.max(a[0], b[0]) / ruutu);
    const y0 = Math.floor(Math.min(a[1], b[1]) / ruutu), y1 = Math.floor(Math.max(a[1], b[1]) / ruutu);
    for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) lisaa(`${x},${y}`, [a, b]);
  }
  return { h, ruutu };
}

/** Lähin piste nykyrajajanalla (asteina, pituusaste skaalattuna) ja etäisyys. */
function lahin(p, hak) {
  const kx = Math.cos(p[1] * Math.PI / 180);
  const cx = Math.floor(p[0] / hak.ruutu), cy = Math.floor(p[1] / hak.ruutu);
  let paras = null, pd = Infinity;
  for (let x = cx - 1; x <= cx + 1; x++) for (let y = cy - 1; y <= cy + 1; y++) {
    const l = hak.h.get(`${x},${y}`); if (!l) continue;
    for (const [a, b] of l) {
      const dx = (b[0] - a[0]) * kx, dy = b[1] - a[1]; const l2 = dx * dx + dy * dy;
      const t = l2 ? Math.max(0, Math.min(1, (((p[0] - a[0]) * kx) * dx + (p[1] - a[1]) * dy) / l2)) : 0;
      const qx = a[0] + t * (b[0] - a[0]), qy = a[1] + t * (b[1] - a[1]);
      const d = Math.hypot((p[0] - qx) * kx, p[1] - qy);
      if (d < pd) { pd = d; paras = [qx, qy]; }
    }
  }
  return { piste: paras, d: pd };
}

/** Näytteistä viiva tasavälein ja naulaa näytteet nykyrajaan. */
function naulaa(viiva, hak) {
  const ulos = []; let naulattu = 0, kaikki = 0;
  const tyonna = (p) => {
    kaikki += 1;
    const { piste, d } = lahin(p, hak);
    if (piste && d <= NAULAUS_AST) { naulattu += 1; ulos.push(piste); } else ulos.push(p);
  };
  tyonna(viiva[0]);
  for (let i = 1; i < viiva.length; i++) {
    const a = viiva[i - 1], b = viiva[i];
    const kx = Math.cos((a[1] + b[1]) / 2 * Math.PI / 180);
    const pit = Math.hypot((b[0] - a[0]) * kx, b[1] - a[1]);
    const n = Math.max(1, Math.ceil(pit / NAYTE_AST));
    for (let k = 1; k <= n; k++) tyonna([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]);
  }
  // kaksoispisteet pois
  const siisti = ulos.filter((p, i) => i === 0 || Math.hypot(p[0] - ulos[i - 1][0], p[1] - ulos[i - 1][1]) > 1e-6);
  return { viiva: siisti, naulattu, kaikki };
}

function main() {
  const data = JSON.parse(readFileSync(LAHDE, 'utf8'));
  // 1878 → 1873: piirteen "valtio" (omistaja)
  const valtio = (f) => { const n = f.properties.NAME ?? ''; return OSMANEIHIN.has(n) ? 'Ottoman Empire' : (n || `_nimeton_${f.properties.id ?? ''}`); };
  // Särmä → joukko valtioita
  const sarmat = new Map();
  data.features.forEach((f, fi) => {
    const v = valtio(f);
    for (const r of renkaat(f.geometry)) for (let i = 1; i < r.length; i++) {
      const k = sarma(r[i - 1], r[i]);
      let e = sarmat.get(k); if (!e) { e = { a: r[i - 1], b: r[i], valtiot: new Set(), piirteet: new Set() }; sarmat.set(k, e); }
      e.valtiot.add(v); e.piirteet.add(fi);
    }
  });
  // Maaraja = särmä kahdessa ERI valtiossa (Bulgaria–Osmanit sulaa pois, koska sama valtio)
  const rajasarmat = [...sarmat.values()].filter((e) => e.valtiot.size >= 2);
  const luokka = (e) => ([...e.valtiot].some((v) => VASALLIT.has(v)) ? 2 : 1);
  // Ketjuta särmät murtoviivoiksi luokittain (yhdistä samasta päästä)
  const ketjut = [];
  for (const lk of [1, 2]) {
    const omat = rajasarmat.filter((e) => luokka(e) === lk);
    const paat = new Map(); const kaytetty = new Set();
    omat.forEach((e, i) => { for (const p of [avain(e.a), avain(e.b)]) { let l = paat.get(p); if (!l) { l = []; paat.set(p, l); } l.push(i); } });
    for (let i = 0; i < omat.length; i++) {
      if (kaytetty.has(i)) continue;
      kaytetty.add(i);
      const ketju = [omat[i].a, omat[i].b];
      for (const suunta of ['loppu', 'alku']) {
        for (;;) {
          const p = suunta === 'loppu' ? ketju[ketju.length - 1] : ketju[0];
          const ehd = (paat.get(avain(p)) ?? []).filter((j) => !kaytetty.has(j));
          if (ehd.length !== 1) break; // haara tai pää: katkaise
          const j = ehd[0]; kaytetty.add(j);
          const e = omat[j]; const seur = avain(e.a) === avain(p) ? e.b : e.a;
          if (suunta === 'loppu') ketju.push(seur); else ketju.unshift(seur);
        }
      }
      ketjut.push({ l: lk, p: ketju });
    }
  }
  // Naulaus nykyrajoihin
  const nyk = JSON.parse(gunzipSync(readFileSync(join(TAALLA, 'fokuskartta/rajat-nykyiset.json.gz'))).toString('utf8'));
  const hak = janahakemisto(nyk.viivat);
  let naulattu = 0, kaikki = 0;
  const viivat = ketjut.map((k) => { const r = naulaa(k.p, hak); naulattu += r.naulattu; kaikki += r.kaikki; return { l: k.l, p: harvenna(r.viiva, HARVENNUS) }; });
  const pisteita = viivat.reduce((s, v) => s + v.p.length, 0);
  console.log(`rajasärmiä ${rajasarmat.length}, ketjuja ${viivat.length}, pisteitä ${pisteita}, naulattu ${naulattu}/${kaikki} näytettä (${(100 * naulattu / kaikki).toFixed(1)} %)`);
  const lahde = 'historical-basemaps (aourednik, github.com/aourednik/historical-basemaps) world_1878 → 1873 '
    + 'tools/tee-rajat-1873.mjs:llä; tarkennus Natural Earth 10m admin_0_boundary_lines_land (PD)';
  const lisenssi = 'GPL-3.0 (johdettu aineisto jaetaan samalla lisenssillä; ks. docs/raportit/isoisa-1873-era1.md)';
  writeFileSync(join(TAALLA, 'fokuskartta/rajat-1873.json.gz'), gzipSync(JSON.stringify({
    setti: '1873', kuvaus: 'Valtioiden maarajat vuonna 1873 (isoisän matkan vuosi)', lahde, lisenssi, harvennus: HARVENNUS,
    viivat: viivat.map((v) => v.p.map(([x, y]) => [+x.toFixed(4), +y.toFixed(4)])),
  })));
  const selain = { lahde, lisenssi, luokat: { 1: 'valtionraja', 2: 'vasalli tai autonominen alue' }, viivat: viivat.map((v) => ({ l: v.l, p: v.p.map(([x, y]) => [+x.toFixed(3), +y.toFixed(3)]) })) };
  const teksti = JSON.stringify(selain);
  writeFileSync(join(JUURI, 'assets/data/rajat-1873.json'), teksti);
  console.log(`assets/data/rajat-1873.json ${(teksti.length / 1024).toFixed(0)} kt, gz ${(gzipSync(teksti).length / 1024).toFixed(0)} kt`);
}
main();
