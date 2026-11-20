#!/usr/bin/env node
/*
 * NOSTOKUVAN RAJAUS (K-3; KK:N PÄÄTÖS 20.11.2026 klo 09.18, aiempi: P-261120-5, P-261117-119; suunnitelma
 * scratchpad/keskustelukanava/suunnitelmat/20261120-nostojen-kuvat.md 2.1 säännöt 8–11 ja 3.1–3.2).
 *
 * Jokainen uusi nostokuva rajataan samalla työkalulla samaan kokoon:
 *   1. rajaa kuvasta suurimman 3:2-alueen annetun keskipisteen ympäriltä (keskipiste osuuksina 0–1, oletus 0,5 0,5;
 *      alue pysyy kuvan sisällä, joten reunaa kohti siirretty keskipiste pysähtyy reunaan),
 *   2. pienentää sen 1200 × 800:aan (<nimi>.jpg) ja tekee suurennokseen version, jonka pitkä sivu on 2048 px
 *      (<nimi>-2048.jpg; ei suurenneta: pienemmästä rajauksesta suurennos on rajauksen oma koko),
 *   3. kirjoittaa mitat ja lähderivin lisäyksen "rajattu" tiedostoon <nimi>.json (SK kopioi kentät dataan:
 *      leveys, korkeus, lahde; BY-SA-kuvan rajaus on muokkaus, kortti lisenssit-ja-lataukset 4),
 *   4. tulostaa esikatselun soikealla reunalla (<nimi>-esikatselu.png, alfa = soikio; n ja h: tools/sisalto/soikio.mjs).
 * Liian pieni lähde (rajaus alle 1200 px leveä, sääntö 11): 1200- ja 2048-versiota ei tehdä, esikatselu tehdään
 * rajauksen omassa koossa, ja paluukoodi on 3.
 * --osuus o (0,5–1; KK 20.11.2026 11.47, K-4 erä 2: SK:n sharp-esirajauksen tilalle): ennen kohtaa 1 lähteestä otetaan
 * keskipisteen ympäriltä alue o × leveys ja o × korkeus (kuvan sisällä), ja 3:2-rajaus on suurin sen sisällä. Kohde täyttää
 * soikion paremmin. Oletus 1 = ilman osuutta tavulleen sama tulos (json saa kentän rajaus.osuus vain, kun o < 1).
 *
 *   node tools/sisalto/nostokuva.mjs <kuva> --ulos <kansio> [--keski 0.5,0.4] [--osuus 0.8] [--nimi <nimi>] [--lahde "<lähderivi>"]
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { soikioPikseli } from './soikio.mjs';

// sharp ladataan vasta rajaa()-kutsussa: tarkistus (nostokuvien-tarkistus.mjs) tuo vain vakiot, ja CI:n testit ajetaan
// ilman npm installia.
const lataaSharp = () => import('sharp').then((m) => m.default);

/** Noston kuvien määrä: tasalaatutarkistus (nostokuvien-tarkistus.mjs) ja viennin reitti (b) (tools/vienti/nostokuvat.mjs). */
export const KUVIA = { min: 3, max: 4 };
export const LEVEYS = 1200;
export const KORKEUS = 800;
export const SUURENNOS = 2048;
export const SUHDE = LEVEYS / KORKEUS;

export const OSUUS_MIN = 0.5;

/**
 * Suurin 3:2-alue keskipisteen (osuudet 0–1) ympäriltä kuvan sisällä. osuus (0,5–1): alue mahtuu keskipisteen ympärille
 * otettuun osuus × leveys × osuus × korkeus -alueeseen (esirajaus; saman keskipisteen ympärillä, joten se pysyy sen sisällä
 * myös reunassa). osuus 1 = koko kuva.
 */
export function rajausLaatikko(leveys, korkeus, keskiX = 0.5, keskiY = 0.5, osuus = 1) {
  const o = Math.max(OSUUS_MIN, Math.min(1, Number.isFinite(osuus) ? osuus : 1));
  const lw = Math.round(leveys * o), lk = Math.round(korkeus * o);
  let w, h;
  if (lw / lk >= SUHDE) { h = lk; w = Math.min(lw, Math.round(lk * SUHDE)); }
  else { w = lw; h = Math.min(lk, Math.round(lw / SUHDE)); }
  const left = Math.round(Math.max(0, Math.min(leveys - w, keskiX * leveys - w / 2)));
  const top = Math.round(Math.max(0, Math.min(korkeus - h, keskiY * korkeus - h / 2)));
  return { left, top, width: w, height: h };
}

/** Lähderivi + "rajattu" (kerran). */
export function lahdeRajattu(lahde) {
  const s = String(lahde ?? '').trim();
  if (!s) return 'rajattu';
  return /\brajattu\b/i.test(s) ? s : `${s.replace(/[.\s]+$/, '')}, rajattu`;
}

/** Soikea alfa RGBA-puskuriin (leveys × korkeus × 4) paikallaan. */
export function soikioAlfaan(rgba, leveys, korkeus) {
  for (let y = 0; y < korkeus; y++) {
    for (let x = 0; x < leveys; x++) {
      const i = (y * leveys + x) * 4 + 3;
      rgba[i] = Math.round(rgba[i] * soikioPikseli(x, y, leveys, korkeus));
    }
  }
  return rgba;
}

/**
 * Rajaa kuvan ja kirjoittaa tiedostot kansioon. Palauttaa { ok, json, polut, viesti }; ok = false, kun lähde on liian pieni
 * (vain esikatselu tehdään).
 */
export async function rajaa(lahdeKuva, { ulos, nimi, keskiX = 0.5, keskiY = 0.5, osuus = 1, lahde = null } = {}) {
  if (!ulos) throw new Error('--ulos puuttuu');
  nimi ??= path.basename(lahdeKuva).replace(/\.[^.]+$/, '');
  const sharp = await lataaSharp();
  await fs.mkdir(ulos, { recursive: true });
  const pohja = sharp(lahdeKuva).rotate();   // EXIF-asento ensin
  const { data: tavut, info } = await pohja.toBuffer({ resolveWithObject: true });
  const laatikko = rajausLaatikko(info.width, info.height, keskiX, keskiY, osuus);
  const rajattu = () => sharp(tavut).extract(laatikko);
  const ok = laatikko.width >= LEVEYS;
  const polut = {};
  const json = {
    lahdekuva: path.basename(lahdeKuva),
    rajaus: { lahde: { leveys: info.width, korkeus: info.height }, x: laatikko.left, y: laatikko.top, leveys: laatikko.width, korkeus: laatikko.height,
      keski: [keskiX, keskiY] },
  };
  if (osuus < 1) json.rajaus.osuus = Math.max(OSUUS_MIN, osuus);
  let esiL = LEVEYS, esiK = KORKEUS;
  if (ok) {
    polut.kuva = path.join(ulos, `${nimi}.jpg`);
    await rajattu().resize(LEVEYS, KORKEUS).jpeg({ quality: 86, mozjpeg: true }).toFile(polut.kuva);
    const sw = Math.min(SUURENNOS, laatikko.width), sh = Math.round(sw / SUHDE);
    polut.suurennos = path.join(ulos, `${nimi}-2048.jpg`);
    await rajattu().resize(sw, sh).jpeg({ quality: 88, mozjpeg: true }).toFile(polut.suurennos);
    Object.assign(json, { tiedosto: path.basename(polut.kuva), leveys: LEVEYS, korkeus: KORKEUS,
      suurennos: { tiedosto: path.basename(polut.suurennos), leveys: sw, korkeus: sh } });
  } else {
    esiL = laatikko.width; esiK = laatikko.height;
  }
  if (lahde != null) json.lahde = lahdeRajattu(lahde);
  const { data: rgba, info: ei } = await rajattu().resize(esiL, esiK).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  soikioAlfaan(rgba, ei.width, ei.height);
  polut.esikatselu = path.join(ulos, `${nimi}-esikatselu.png`);
  await sharp(rgba, { raw: { width: ei.width, height: ei.height, channels: 4 } }).png().toFile(polut.esikatselu);
  json.esikatselu = path.basename(polut.esikatselu);
  polut.json = path.join(ulos, `${nimi}.json`);
  await fs.writeFile(polut.json, `${JSON.stringify(json, null, 2)}\n`);
  const viesti = ok
    ? `${nimi}: ${info.width} × ${info.height} → rajaus ${laatikko.width} × ${laatikko.height} (${laatikko.left}, ${laatikko.top}) → ${LEVEYS} × ${KORKEUS} ja ${json.suurennos.leveys} × ${json.suurennos.korkeus}`
    : `${nimi}: LIIAN PIENI: rajaus ${laatikko.width} × ${laatikko.height} < ${LEVEYS} px (sääntö 11: ei suurenneta); vain esikatselu`;
  return { ok, json, polut, viesti };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = process.argv.slice(2);
  const arvo = (k) => { const i = a.indexOf(k); return i >= 0 ? a[i + 1] : undefined; };
  const kuva = a.find((x, i) => !x.startsWith('--') && (i === 0 || !a[i - 1].startsWith('--')));
  if (!kuva || !arvo('--ulos')) {
    console.error('käyttö: node tools/sisalto/nostokuva.mjs <kuva> --ulos <kansio> [--keski 0.5,0.4] [--osuus 0.8] [--nimi <nimi>] [--lahde "<lähderivi>"]');
    process.exit(2);
  }
  const [keskiX, keskiY] = (arvo('--keski') ?? '0.5,0.5').split(',').map(Number);
  if (![keskiX, keskiY].every((x) => x >= 0 && x <= 1)) { console.error('--keski: kaksi osuutta 0–1, esim. 0.5,0.4'); process.exit(2); }
  const osuus = Number(arvo('--osuus') ?? 1);
  if (!(osuus >= OSUUS_MIN && osuus <= 1)) { console.error('--osuus: 0,5–1, esim. 0.8'); process.exit(2); }
  const t = await rajaa(kuva, { ulos: arvo('--ulos'), nimi: arvo('--nimi'), keskiX, keskiY, osuus, lahde: arvo('--lahde') ?? null });
  console.log(t.viesti);
  for (const [k, p] of Object.entries(t.polut)) console.log(`  ${k}: ${p}`);
  process.exit(t.ok ? 0 : 3);
}
