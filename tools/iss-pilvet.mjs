#!/usr/bin/env node
/*
 * TÄMÄN PÄIVÄN PILVET ÄMPÄRIIN (Julkaisija 28.9.2026; Linssisepän ISS-realismi,
 * kohdat 2 ja 4a, docs/raportit/iss-realismi-suunnitelma-20260928.md haarassa
 * linssiseppa-tyo-20260923).
 *
 * PILVET (oletustila, .github/workflows/iss-pilvet.yml kerran päivässä):
 *   node tools/iss-pilvet.mjs --ulos <kansio> [--paiva YYYY-MM-DD] [--bmng-tiedosto <jpg>]
 *
 *   Hakee NASA GIBS WMS:stä (PD) eilisen UTC-päivän VIIRS-tosivärikuvan
 *   4096 × 2048 EPSG:4326 (sama kuin WMTS-taso 2, noin 10 km/px) ja vertaa sitä
 *   saman kuukauden pilvettömään Blue Marble NG:hen (ämpäristä data/bmng/<kk>-4096.jpg).
 *   MINIMIKOOSTE (Linssiseppä 28.9.2026, ensimmäisen ajon kuva): auringon kimallus
 *   näkyi trooppisilla merillä pilven kaltaisina pystyjuovina joka kaistan keskellä.
 *   NOAA-20 ja Suomi NPP kiertävät samaa rataa puolen kierroksen päässä toisistaan,
 *   joten niiden kaistat ovat lomittain ja kimallus osuu eri pituuspiireille: kun
 *   molemmat kuvat saadaan, pikseli otetaan tummemmasta (minimiKooste), jolloin
 *   kimallus putoaa pois mutta pilvet (kummassakin) jäävät. Syyskuun merijää, jota
 *   BMNG:n world-sarjassa ei ole, näkyy pilvenä; se jätetään, koska se on kyydissä
 *   valkoinen kuten oikeasti.
 *   Pilvi on kirkkaampi ja harmaampi kuin pilvetön pinta, joten lumi ja jää kumoutuvat:
 *
 *     alfa = saturate((L_päivä − L_bmng − 0,08) / 0,25) · saturate((0,35 − S_päivä) / 0,2)
 *
 *   L = Rec. 709 -luminanssi sRGB-arvoista 0…1 (0,2126 r + 0,7152 g + 0,0722 b),
 *   S = HSV-värikylläisyys (max − min) / max. Kaistojen väliset aukot (L < 0,02)
 *   täytetään edellisen päivän kuvasta; jos sielläkin on aukko, alfa = 0.
 *
 *   Alfan reunat pehmennetään (pehmennaAlfa, ≈ Gauss σ 1,15 px), jottei 10 km:n pikseli näy portaina.
 *
 *   Tulos: <kansio>/uusin.png (4096 × 2048, 8-bit harmaa = alfa · 255, lon −180…180
 *   vasemmalta, lat 90…−90 ylhäältä) ja <kansio>/uusin.json.
 *   Jos kuukauden BMNG puuttuu ämpäristä, ajo ohitetaan siististi: ei tiedostoja,
 *   poistumiskoodi 0 (työnkulku ei silloin vie mitään). Muu virhe → koodi 1, eikä
 *   mitään kirjoiteta, joten ämpäriin jää edellinen versio.
 *
 * BMNG (kertaluontoinen, .github/workflows/iss-bmng.yml käsin):
 *   node tools/iss-pilvet.mjs --bmng <kansio> [--kuukaudet 01,02,…]
 *
 *   Hakee NASA Visible Earth Blue Marble Next Generation 2004 -kuukausikuvat (PD,
 *   "world"-sarja ilman topografiaa ja batymetriaa, 5400 × 2700) ja skaalaa ne
 *   4096 × 2048 JPEGeiksi <kansio>/<kk>-4096.jpg.
 *
 * Kuvien purku ja skaalaus: sharp (työnkulussa npm install --no-save sharp, kuten
 * tee-napakalotit.yml). Puhtaat funktiot eivät tarvitse sharpia (tests/iss-haut.test.mjs).
 */
import { mkdirSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { harmaaPng, kirjoitaTurvallisesti } from './iss-revontulet.mjs';

export const LEVEYS = 4096;
export const KORKEUS = 2048;
export const LISENSSI = 'NASA GIBS / PD';
export const GIBS_WMS = 'https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi';
/** Ensisijainen kerros ja varat järjestyksessä (suunnitelma, kohta 2). */
export const GIBS_KERROKSET = [
  'VIIRS_NOAA20_CorrectedReflectance_TrueColor',
  'VIIRS_SNPP_CorrectedReflectance_TrueColor',
  'MODIS_Terra_CorrectedReflectance_TrueColor',
];
/** Minimikoosteen pari ensisijaiselle kerrokselle: sama rata, puolen kierroksen ero (kimallus eri kohdassa). */
export const GIBS_PARI = {
  VIIRS_NOAA20_CorrectedReflectance_TrueColor: 'VIIRS_SNPP_CorrectedReflectance_TrueColor',
};
/** Kerros hyväksytään, kun vähintään tämä osuus pikseleistä on dataa (ei mustaa aukkoa). */
export const KATTAVUUS_RAJA = 0.3;
export const AUKKO_L = 0.02;
export const AMPARI = 'https://media.matkakirja.app';
const KUUKAUDET = ['january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'];
const UA = { 'user-agent': 'Matkakirja ISS-linssi (media.matkakirja.app)' };

/* ---------- Päivät ja osoitteet ---------- */

const pvm = (d) => d.toISOString().slice(0, 10);

/** Eilinen UTC-päivä YYYY-MM-DD (ajo klo 06 UTC: eilinen on silloin valmis). */
export function eilinenUtc(nyt = new Date()) {
  return pvm(new Date(Date.UTC(nyt.getUTCFullYear(), nyt.getUTCMonth(), nyt.getUTCDate() - 1)));
}

/** Päivää aiempi YYYY-MM-DD. */
export function edellinenPaiva(paiva) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(paiva)) throw new Error(`päivä ei muotoa YYYY-MM-DD: ${paiva}`);
  const [y, m, d] = paiva.split('-').map(Number);
  return pvm(new Date(Date.UTC(y, m - 1, d - 1)));
}

/** GIBS WMS 1.3.0 GetMap koko maailmasta (EPSG:4326, akselijärjestys lat,lon → BBOX −90,−180,90,180). */
export function gibsUrl(kerros, paiva, leveys = LEVEYS, korkeus = KORKEUS) {
  const q = new URLSearchParams({
    SERVICE: 'WMS', REQUEST: 'GetMap', VERSION: '1.3.0', LAYERS: kerros, STYLES: '',
    CRS: 'EPSG:4326', BBOX: '-90,-180,90,180', WIDTH: String(leveys), HEIGHT: String(korkeus),
    FORMAT: 'image/jpeg', TIME: paiva,
  });
  return `${GIBS_WMS}?${q}`;
}

/** Ämpärin BMNG-kuukausikuva (kk = '01'…'12'). */
export const bmngAmpariPolku = (kk) => `data/bmng/${kk}-4096.jpg`;
/** Ämpärin BMNG-sarjan versio CDN-välimuistin ohitukseen (Karttasepän 21600 px -lähde, 28.9.2026). */
export const BMNG_VERSIO = '21600';

/** NASA Visible Earthin BMNG 2004 -kuukausikuva (world-sarja, 5400 × 2700, PD). */
export function bmngLahdeUrl(kk) {
  const n = Number(kk);
  if (!Number.isInteger(n) || n < 1 || n > 12) throw new Error(`kuukausi 01–12: ${kk}`);
  const k = String(n).padStart(2, '0');
  return 'https://assets.science.nasa.gov/content/dam/science/esd/eo/images/bmng/bmng-base/'
    + `${KUUKAUDET[n - 1]}/world.2004${k}.3x5400x2700.jpg`;
}

/* ---------- Pilvialfa ---------- */

const saturate = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
/** Luminanssi 0…1 sRGB-tavuista. */
export const luminanssi = (r, g, b) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
/** HSV-värikylläisyys 0…1. */
export function kyllaisyys(r, g, b) {
  const max = Math.max(r, g, b);
  return max === 0 ? 0 : (max - Math.min(r, g, b)) / max;
}

/** Yhden pikselin alfa 0…1 päivän ja BMNG:n sRGB-tavuista (kaava tiedoston alussa). */
export function pilviAlfa(r, g, b, rb, gb, bb) {
  return saturate((luminanssi(r, g, b) - luminanssi(rb, gb, bb) - 0.08) / 0.25)
    * saturate((0.35 - kyllaisyys(r, g, b)) / 0.2);
}

/**
 * Minimikooste kahdesta saman päivän RGB-raakakuvasta (3 kanavaa): pikseli siitä, jonka luminanssi on
 * pienempi, joten auringon kimallus putoaa pois (ks. tiedoston alku). Aukko (L < AUKKO_L) otetaan toisesta
 * kuvasta. Palauttaa { rgb, toisesta } (toisesta = b:stä otetut pikselit); a ja b pysyvät ennallaan.
 */
export function minimiKooste(a, b) {
  if (a.length !== b.length) throw new Error(`minimikooste: ${a.length} ≠ ${b.length} tavua`);
  const rgb = new Uint8Array(a);
  let toisesta = 0;
  for (let j = 0; j < a.length; j += 3) {
    const la = luminanssi(a[j], a[j + 1], a[j + 2]);
    const lb = luminanssi(b[j], b[j + 1], b[j + 2]);
    if (lb < AUKKO_L || (la >= AUKKO_L && la <= lb)) continue;
    rgb[j] = b[j]; rgb[j + 1] = b[j + 1]; rgb[j + 2] = b[j + 2];
    toisesta++;
  }
  return { rgb, toisesta };
}

/**
 * Koko kuvan alfa. paiva, edellinen (tai null) ja bmng ovat RGB-raakatavuja
 * (3 kanavaa, leveys × korkeus). Palauttaa Uint8Array(leveys × korkeus) ja
 * täytettyjen aukkojen määrän.
 */
export function laskePilvialfa({ paiva, edellinen = null, bmng, leveys, korkeus }) {
  const n = leveys * korkeus;
  for (const [nimi, kuva] of [['paiva', paiva], ['bmng', bmng], ['edellinen', edellinen]]) {
    if (kuva && kuva.length !== n * 3) throw new Error(`${nimi}: ${kuva.length} tavua, odotettiin ${n * 3}`);
  }
  const alfa = new Uint8Array(n);
  let taytetty = 0;
  for (let i = 0, j = 0; i < n; i++, j += 3) {
    let lahde = paiva;
    if (luminanssi(paiva[j], paiva[j + 1], paiva[j + 2]) < AUKKO_L) {
      if (!edellinen || luminanssi(edellinen[j], edellinen[j + 1], edellinen[j + 2]) < AUKKO_L) continue;
      lahde = edellinen;
      taytetty++;
    }
    alfa[i] = Math.round(255 * pilviAlfa(lahde[j], lahde[j + 1], lahde[j + 2], bmng[j], bmng[j + 1], bmng[j + 2]));
  }
  return { alfa, taytetty };
}

/**
 * Pehmeät reunat (Linssiseppä 28.9.2026, natiivin laitekuva cl7): alfa on lähes kaksiarvoinen, ja ISS:n korkeudelta
 * katsottuna noin 10 km:n pikselit näkyivät pilvien reunoilla portaina ja maalla pilkkuina (pinnan muutos vs. BMNG).
 * Ensin 3 × 3 -mediaani poistaa yksittäiset pilkut, sitten kaksi kertaa toistettu 3 × 3 -laatikkosumennus (≈ Gauss σ 1,15 px,
 * noin 11 km) pehmentää reunat; vaakasuunta kiertää pituuspiirin ±180° yli, pystysuunta leikkautuu napoihin. Palauttaa uuden
 * Uint8Arrayn.
 */
export function pehmennaAlfa(alfa, leveys, korkeus, kierroksia = 2) {
  if (alfa.length !== leveys * korkeus) throw new Error(`pehmennys: ${alfa.length} ≠ ${leveys} × ${korkeus}`);
  let a = new Float32Array(alfa.length);
  const ikkuna = new Uint8Array(9);
  for (let y = 0; y < korkeus; y++) {
    for (let x = 0; x < leveys; x++) {
      let n = 0;
      for (let dy = -1; dy <= 1; dy++) {
        const yy = Math.min(korkeus - 1, Math.max(0, y + dy)) * leveys;
        for (let dx = -1; dx <= 1; dx++) ikkuna[n++] = alfa[yy + ((x + dx + leveys) % leveys)];
      }
      ikkuna.sort();
      a[y * leveys + x] = ikkuna[4];
    }
  }
  const b = new Float32Array(a.length);
  for (let k = 0; k < kierroksia; k++) {
    for (let y = 0; y < korkeus; y++) {
      const r = y * leveys;
      for (let x = 0; x < leveys; x++) {
        const v = x === 0 ? leveys - 1 : x - 1, o = x === leveys - 1 ? 0 : x + 1;
        b[r + x] = (a[r + v] + a[r + x] + a[r + o]) / 3;
      }
    }
    for (let y = 0; y < korkeus; y++) {
      const ylos = (y === 0 ? 0 : y - 1) * leveys, r = y * leveys, alas = (y === korkeus - 1 ? y : y + 1) * leveys;
      for (let x = 0; x < leveys; x++) a[r + x] = (b[ylos + x] + b[r + x] + b[alas + x]) / 3;
    }
  }
  const ulos = new Uint8Array(a.length);
  for (let i = 0; i < a.length; i++) ulos[i] = Math.round(a[i]);
  return ulos;
}

/** Osuus pikseleistä, joissa on dataa (L ≥ 0,02). */
export function kattavuus(rgb) {
  let ok = 0;
  const n = rgb.length / 3;
  for (let j = 0; j < rgb.length; j += 3) if (luminanssi(rgb[j], rgb[j + 1], rgb[j + 2]) >= AUKKO_L) ok++;
  return n ? ok / n : 0;
}

/** Julkaistava JSON (rivinvaihto lopussa). */
export function pilvetJson({ paiva, kerros, kk, aukotPaivasta = null, haettu = new Date() }) {
  return JSON.stringify({
    paiva, lahde: `NASA GIBS ${kerros}`, lisenssi: LISENSSI, leveys: LEVEYS, korkeus: KORKEUS,
    vertailu: `NASA Blue Marble NG 2004-${kk} (PD)`, aukotPaivasta, haettu: haettu.toISOString(),
  }) + '\n';
}

/* ---------- Verkko ja kuvat (sharp) ---------- */

async function lataaSharp() {
  try {
    return (await import('sharp')).default;
  } catch {
    throw new Error('sharp puuttuu: npm install --no-save --no-fund --no-audit sharp');
  }
}

async function haeTavut(url) {
  const v = await fetch(url, { headers: UA });
  if (!v.ok) return { status: v.status, tavut: null };
  return { status: v.status, tavut: Buffer.from(await v.arrayBuffer()) };
}

async function rgbRaaka(sharp, tavut) {
  return sharp(tavut).removeAlpha().toColourspace('srgb')
    .resize(LEVEYS, KORKEUS, { fit: 'fill' }).raw().toBuffer();
}

async function haeGibs(sharp, kerros, paiva) {
  const { status, tavut } = await haeTavut(gibsUrl(kerros, paiva));
  if (!tavut) return { syy: `HTTP ${status}` };
  if (tavut[0] !== 0xff || tavut[1] !== 0xd8) return { syy: `ei JPEG (${tavut.subarray(0, 60).toString('latin1')})` };
  const rgb = await rgbRaaka(sharp, tavut);
  const k = kattavuus(rgb);
  return k >= KATTAVUUS_RAJA ? { rgb, kattavuus: k } : { syy: `kattavuus ${(k * 100).toFixed(0)} %` };
}

async function pilvet(argv) {
  const arvo = (nimi) => { const i = argv.indexOf(nimi); return i >= 0 ? argv[i + 1] : undefined; };
  const kansio = resolve(arvo('--ulos'));
  const paiva = arvo('--paiva') || eilinenUtc();
  edellinenPaiva(paiva); // muodon tarkistus
  const kk = paiva.slice(5, 7);

  let bmngTavut;
  if (arvo('--bmng-tiedosto')) {
    bmngTavut = await readFile(arvo('--bmng-tiedosto'));
  } else {
    // ?v= ohittaa CDN:n immutable-kopiot: Karttaseppä vaihtoi 28.9. BMNG:n 21600 px -lähteeseen.
    const url = `${AMPARI}/${bmngAmpariPolku(kk)}?v=${BMNG_VERSIO}`;
    const { status, tavut } = await haeTavut(url);
    if (status === 404) {
      console.log(`::notice::BMNG ${kk} puuttuu ämpäristä (${url}) — pilvilaskenta ohitetaan. Aja ensin ISS-BMNG-työnkulku.`);
      return;
    }
    if (!tavut) throw new Error(`${url}: HTTP ${status}`);
    bmngTavut = tavut;
  }

  const sharp = await lataaSharp();
  const bmng = await rgbRaaka(sharp, bmngTavut);

  let kerros; let paivaRgb;
  for (const k of GIBS_KERROKSET) {
    const t = await haeGibs(sharp, k, paiva);
    if (t.rgb) { kerros = k; paivaRgb = t.rgb; console.log(`GIBS ${k} ${paiva}: kattavuus ${(t.kattavuus * 100).toFixed(0)} %`); break; }
    console.log(`GIBS ${k} ${paiva}: ohitetaan (${t.syy})`);
  }
  if (!kerros) throw new Error(`GIBS: yksikään kerros ei antanut päivää ${paiva}`);
  let lahde = kerros;
  if (GIBS_PARI[kerros]) {
    const p = await haeGibs(sharp, GIBS_PARI[kerros], paiva);
    if (p.rgb) {
      const m = minimiKooste(paivaRgb, p.rgb);
      paivaRgb = m.rgb;
      lahde = `${kerros} + ${GIBS_PARI[kerros]} (minimikooste)`;
      console.log(`GIBS ${GIBS_PARI[kerros]} ${paiva}: minimikooste, ${m.toisesta} px parista`);
    } else console.log(`GIBS ${GIBS_PARI[kerros]} ${paiva}: ei minimikoostetta (${p.syy})`);
  }

  const eilen = edellinenPaiva(paiva);
  const e = await haeGibs(sharp, kerros, eilen);
  if (!e.rgb) console.log(`GIBS ${kerros} ${eilen}: ei aukkojen täyttöä (${e.syy})`);

  const laskettu = laskePilvialfa({
    paiva: paivaRgb, edellinen: e.rgb ?? null, bmng, leveys: LEVEYS, korkeus: KORKEUS,
  });
  const { taytetty } = laskettu;
  const alfa = pehmennaAlfa(laskettu.alfa, LEVEYS, KORKEUS);
  let summa = 0;
  for (const a of alfa) summa += a;
  mkdirSync(kansio, { recursive: true });
  kirjoitaTurvallisesti(join(kansio, 'uusin.png'), harmaaPng(alfa, LEVEYS, KORKEUS));
  const meta = pilvetJson({ paiva, kerros: lahde, kk, aukotPaivasta: e.rgb ? eilen : null });
  kirjoitaTurvallisesti(join(kansio, 'uusin.json'), meta);
  console.log(`pilvet → ${kansio}: keskialfa ${(summa / alfa.length / 2.55).toFixed(1)} %, `
    + `täytetty ${taytetty} px, ${meta.trim()}`);
}

async function bmngKuvat(argv) {
  const i = argv.indexOf('--bmng');
  const kansio = resolve(argv[i + 1]);
  const j = argv.indexOf('--kuukaudet');
  const kuukaudet = (j >= 0 && argv[j + 1] ? argv[j + 1].split(',') : KUUKAUDET.map((_, n) => String(n + 1)))
    .map((k) => String(Number(k)).padStart(2, '0'));
  const sharp = await lataaSharp();
  mkdirSync(kansio, { recursive: true });
  for (const kk of kuukaudet) {
    const url = bmngLahdeUrl(kk);
    const { status, tavut } = await haeTavut(url);
    if (!tavut) throw new Error(`${url}: HTTP ${status}`);
    const m = await sharp(tavut).metadata();
    if (m.width !== 2 * m.height) throw new Error(`${url}: ${m.width} × ${m.height}, ei 2:1`);
    const jpg = await sharp(tavut).removeAlpha().toColourspace('srgb')
      .resize(LEVEYS, KORKEUS, { fit: 'fill', kernel: 'lanczos3' }).jpeg({ quality: 90 }).toBuffer();
    kirjoitaTurvallisesti(join(kansio, `${kk}-4096.jpg`), jpg);
    console.log(`BMNG ${kk}: ${m.width} × ${m.height} → ${LEVEYS} × ${KORKEUS}, ${(jpg.length / 1e6).toFixed(1)} Mt`);
  }
}

async function main(argv) {
  if (argv.includes('--bmng') && argv[argv.indexOf('--bmng') + 1]) return bmngKuvat(argv);
  const i = argv.indexOf('--ulos');
  if (i < 0 || !argv[i + 1]) {
    throw new Error('käyttö: node tools/iss-pilvet.mjs --ulos <kansio> [--paiva YYYY-MM-DD] [--bmng-tiedosto <jpg>]'
      + ' | --bmng <kansio> [--kuukaudet 01,02]');
  }
  return pilvet(argv);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch((e) => { console.error(`iss-pilvet: ${e.message}`); process.exit(1); });
}
