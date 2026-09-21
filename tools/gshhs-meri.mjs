/*
 * GSHHG (full) → meren renkaat ne_10m_ocean.geojson-muodossa.
 *
 *   node tools/gshhs-meri.mjs --gshhs=<gshhs_f.b> --ulos=<kansio> [--pienin=0.0015] [--askel=0.001]
 *
 * OMISTAJAN PÄÄTÖS (Fable 21.9.2026): tarkempi rantaviiva tehdään joka
 * tapauksessa, kunhan se on varmasti oikea ratkaisu, ja se menee SEKÄ
 * vektorisoluihin (kehä, tools/tee-pallovektorit.mjs) ETTÄ pohjan ja
 * rannan polttoon (tools/generoi-laattapyramidi.mjs) SAMASTA lähteestä
 * SAMALLA tarkkuudella. Molemmat lukevat meren renkaat
 * tools/fokuskartta/maailma.mjs `meriRenkaat`-funktiolla tiedostosta
 * <kansio>/ne_10m_ocean.geojson, joten tarkempi lähde vaihdetaan
 * KIRJOITTAMALLA SAMANNIMINEN TIEDOSTO OMAAN AINEISTOKANSIOONSA —
 * yhtään lukijaa ei tarvitse muuttaa, ja `lahde.json` kertoo mistä
 * renkaat ovat. Natural Earthin 1:10m rantaviivassa janat ovat 4–6
 * km (mitattu Girondella, docs/raportit/poltto-koe-20260920.md), GSHHG
 * full -aineistossa noin 100–300 m.
 *
 * LÄHDE: Wessel & Smith, A Global Self-consistent, Hierarchical,
 * High-resolution Geography Database, versio 2.3.7 (LGPL 3+),
 * gshhg-bin-2.3.7.zip. Binäärimuoto (README.TXT): 11 × int32 big-endian
 * otsake (id, n, flag, west, east, south, north, area, area_full,
 * container, ancestor), sitten n × (int32 lon, int32 lat) mikroasteina.
 * flag & 255 = taso: 1 maa, 2 järvi, 3 saari järvessä, 4 lampi saarella,
 * 5 Etelämantereen jäärintama, 6 pohjautumisviiva. Pituusasteet ovat
 * 0..360 (Greenwichin ylittävät negatiivisina), joten päivämäärärajan
 * ylittävät monikulmiot LEIKATAAN kahtia ±180:ssa kuten Natural Earth
 * tekee — piirtomoottorin parillisuussääntö (maailmapiirto.js) lukee
 * sädettä −180:sta, eikä rengas saa jatkua sen yli.
 *
 * MITÄ MUKAAN: taso 1 (maa) kokonaan, taso 6 (pohjautumisviiva)
 * Etelämantereen rannaksi kuten Natural Earthin ne_10m_ocean (jäähyllyt
 * ovat merta), ja tason 2 suurin
 * monikulmio (Kaspianmeri), joka on ne_10m_oceanissa merta eikä
 * järviaineistossa — pelin järvet tulevat yhä ne_10m_lakes.geojsonista.
 * Kehysrengas (±180, ±90) tekee parillisuudesta saman kuin Natural
 * Earthin merimonikulmiossa: meri = pariton määrä reunoja säteellä.
 *
 * KARSINTA: alle `pienin` asteen (oletus 0,0015° ≈ 150 m, 0,7 px z8:lla)
 * laajuiset saaret jäävät pois — ne olisivat laatalla alle pikselin
 * täpliä. `askel` on esiharvennus (peräkkäiset pisteet lähempänä kuin
 * askel jäävät pois; 0,001° = 0,5 px z8:lla), jotta 95 Mt:n binääri
 * mahtuu JSONiin, jonka 16 rinnakkaista polttoprosessia jäsentävät;
 * varsinainen harvennus (0,006° / --rannikon-harvennus) tehdään yhä
 * `meriRenkaat`issa molemmille lukijoille yhtä aikaa.
 */
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const arg = (n, d) => (process.argv.find((a) => a.startsWith(`--${n}=`))?.split('=')[1] ?? d);
const LAHDE = arg('gshhs', null);
const ULOS = arg('ulos', null);
const PIENIN = Number(arg('pienin', '0.0015'));
const ASKEL = Number(arg('askel', '0.001'));
/*
 * Etelämanner: taso 6 = pohjautumisviiva, jolloin jäähyllyt (Ross,
 * Ronne–Filchner) ovat merta KUTEN ne_10m_oceanissa; taso 5 (jäärintama)
 * tekisi niistä maata. Mitattu 0,1°:n parillisuusmaskilla NE:tä vasten:
 * tasolla 5 eroa 1,15 % soluista (kaikki jäähyllyillä), tasolla 6 ks.
 * docs/raportit/poltto-koe-20260920.md.
 */
const ETELAMANNER = 6;
if (!LAHDE || !ULOS) {
  console.error('anna --gshhs=<gshhs_f.b> --ulos=<kansio>');
  process.exit(2);
}

/** Lukee binäärin monikulmioiksi { id, taso, n, w, e, s, n, pisteet:Float64Array }. */
export function lueGshhs(buf) {
  const ulos = [];
  let p = 0;
  while (p < buf.length) {
    const id = buf.readInt32BE(p);
    const n = buf.readInt32BE(p + 4);
    const flag = buf.readInt32BE(p + 8);
    const laajuus = {
      w: buf.readInt32BE(p + 12) / 1e6,
      e: buf.readInt32BE(p + 16) / 1e6,
      s: buf.readInt32BE(p + 20) / 1e6,
      n: buf.readInt32BE(p + 24) / 1e6,
    };
    const pisteet = new Float64Array(n * 2);
    let q = p + 44;
    for (let i = 0; i < n; i += 1) {
      pisteet[i * 2] = buf.readInt32BE(q) / 1e6;
      pisteet[i * 2 + 1] = buf.readInt32BE(q + 4) / 1e6;
      q += 8;
    }
    ulos.push({ id, taso: flag & 255, n, laajuus, pisteet });
    p = q;
  }
  return ulos;
}

/**
 * Sutherland–Hodgman yhdelle puolitasolle: pitää pisteet, joilla
 * `sisalla(lon)` on tosi, ja lisää leikkauspisteet rajalle `raja`.
 */
function leikkaa(rengas, sisalla, raja) {
  const ulos = [];
  const n = rengas.length;
  for (let i = 0; i < n; i += 1) {
    const a = rengas[(i + n - 1) % n];
    const b = rengas[i];
    const aS = sisalla(a[0]);
    const bS = sisalla(b[0]);
    if (aS !== bS) {
      const t = (raja - a[0]) / (b[0] - a[0]);
      ulos.push([raja, a[1] + t * (b[1] - a[1])]);
    }
    if (bS) ulos.push(b);
  }
  return ulos;
}

/**
 * Rengas ±180-alueelle: enintään kolme rengasta (keski-, länsi- ja
 * itäosa). Lähteessä pituusasteet ovat 0..360 ja Greenwichin ylittävä
 * rengas HYPPÄÄ 359,99 → 0,01, joten rengas AUKAISTAAN ensin jatkuvaksi
 * (yli 180 asteen askel korjataan ±360:llä; Euraasia on sen jälkeen
 * −10..190) ja leikataan vasta sitten 180:ssa ja −180:ssa.
 */
export function normalisoi(rengas) {
  const jatkuva = [];
  let siirto = 0;
  let ed = null;
  // Etelämanner on lähteessä valmiiksi −180..180 ja sulkeutuu navan
  // kautta (180,−90) → (−180,−90): sitä ei saa "aukaista".
  const valmis = rengas.some(([lon]) => lon < 0);
  for (const [lon, lat] of rengas) {
    if (valmis) { jatkuva.push([lon, lat]); continue; }
    if (ed !== null) {
      if (lon - ed > 180) siirto -= 360;
      else if (ed - lon > 180) siirto += 360;
    }
    ed = lon;
    jatkuva.push([lon + siirto, lat]);
  }
  const osat = [];
  for (const [alku, loppu] of [[-540, -180], [-180, 180], [180, 540]]) {
    let osa = leikkaa(jatkuva, (lon) => lon >= alku, alku);
    if (osa.length > 2) osa = leikkaa(osa, (lon) => lon <= loppu, loppu);
    if (osa.length > 2) {
      const s = alku === -180 ? 0 : (alku < -180 ? 360 : -360);
      osat.push(osa.map(([lon, lat]) => [lon + s, lat]));
    }
  }
  return osat;
}

/** Esiharvennus: peräkkäiset pisteet lähempänä kuin askel jäävät pois. */
function harvenna(rengas, askel) {
  if (!(askel > 0)) return rengas;
  const ulos = [];
  let ed = null;
  for (const p of rengas) {
    if (ed && Math.abs(p[0] - ed[0]) < askel && Math.abs(p[1] - ed[1]) < askel) continue;
    ulos.push(p);
    ed = p;
  }
  return ulos;
}

function pyorista(x) { return Math.round(x * 1e6) / 1e6; }

const buf = readFileSync(LAHDE);
const sha = createHash('sha256').update(buf).digest('hex');
const monikulmiot = lueGshhs(buf);
const tasot = {};
for (const m of monikulmiot) tasot[m.taso] = (tasot[m.taso] ?? 0) + 1;

const renkaat = [];
const tilasto = { maa: 0, pienetPois: 0, etelamanner: 0, kaspia: 0, halkaistu: 0, pisteita: 0, lahdePisteita: 0 };
let kaspia = null;
for (const m of monikulmiot) {
  if (m.taso === 2) {
    // Kaspianmeri: tason 2 monikulmio, jonka laatikko sisältää sen
    // keskipisteen (51°E, 42°N); laajuudella valittaisiin jokijärvi.
    const { w, e, s, n } = m.laajuus;
    if (w <= 51 && e >= 51 && s <= 42 && n >= 42 && (!kaspia || m.n > kaspia.m.n)) kaspia = { m };
    continue;
  }
  if (m.taso !== 1 && m.taso !== ETELAMANNER) continue;
  const laajuus = Math.max(m.laajuus.e - m.laajuus.w, m.laajuus.n - m.laajuus.s);
  if (m.taso === 1 && laajuus < PIENIN) { tilasto.pienetPois += 1; continue; }
  if (m.taso === 1) tilasto.maa += 1; else tilasto.etelamanner += 1;
  const rengas = [];
  for (let i = 0; i < m.n; i += 1) rengas.push([m.pisteet[i * 2], m.pisteet[i * 2 + 1]]);
  // Etelämantereen viiva on lähteessä AVOIN (180,−77,9) → … → (−180,−77,9):
  // se suljetaan navan kautta, jotta manner on renkaan sisällä.
  if (m.taso === ETELAMANNER && Math.abs(rengas[0][0]) >= 179.99 && Math.abs(rengas[rengas.length - 1][0]) >= 179.99
    && Math.sign(rengas[0][0]) !== Math.sign(rengas[rengas.length - 1][0])) {
    rengas.push([rengas[rengas.length - 1][0], -90], [rengas[0][0], -90]);
    tilasto.suljettuNavan = (tilasto.suljettuNavan ?? 0) + 1;
  }
  tilasto.lahdePisteita += m.n;
  const osat = normalisoi(rengas);
  if (osat.length > 1) tilasto.halkaistu += 1;
  if (osat.length > 2) tilasto.kolmeen = (tilasto.kolmeen ?? 0) + 1;
  for (const osa of osat) {
    const harva = harvenna(osa, ASKEL);
    if (harva.length > 2) renkaat.push(harva);
  }
}
if (kaspia) {
  const rengas = [];
  for (let i = 0; i < kaspia.m.n; i += 1) rengas.push([kaspia.m.pisteet[i * 2], kaspia.m.pisteet[i * 2 + 1]]);
  for (const osa of normalisoi(rengas)) renkaat.push(harvenna(osa, ASKEL));
  tilasto.kaspia = { pisteita: kaspia.m.n, laajuus: kaspia.m.laajuus };
}
// Kehysrengas: meri on kaiken maan ulkopuolella.
renkaat.unshift([[-180, -90], [-180, 90], [180, 90], [180, -90]]);
for (const r of renkaat) tilasto.pisteita += r.length;

mkdirSync(ULOS, { recursive: true });
const features = renkaat.map((r) => ({
  type: 'Feature',
  properties: {},
  geometry: { type: 'Polygon', coordinates: [[...r.map(([lon, lat]) => [pyorista(lon), pyorista(lat)]), [pyorista(r[0][0]), pyorista(r[0][1])]]] },
}));
writeFileSync(join(ULOS, 'ne_10m_ocean.geojson'), JSON.stringify({ type: 'FeatureCollection', features }));
const lahde = {
  lahde: 'GSHHG 2.3.7 full (gshhs_f.b), Wessel & Smith, LGPL 3+',
  sha256: sha, tasot, pienin: PIENIN, askel: ASKEL, tilasto,
  huomautus: 'Tiedosto ne_10m_ocean.geojson on GSHHG-renkaat Natural Earthin merimonikulmion muodossa (tools/gshhs-meri.mjs); ne_10m_lakes.geojson on yhä Natural Earthin.',
};
writeFileSync(join(ULOS, 'lahde.json'), `${JSON.stringify(lahde, null, 2)}\n`);
console.log(JSON.stringify(lahde, null, 2));
