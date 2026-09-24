#!/usr/bin/env node
/*
 * VIENNIN MEDIAOSOITTEIDEN VERKKOTARKISTUS (valinnainen).
 *
 *   node tools/vienti/tarkista-media.mjs [--vienti dist/vienti] [--otos 40 | --kaikki]
 *
 * Lukee vie-sisalto.mjs:n tuottaman media.json:n ja tekee HEAD-pyynnön
 * jokaisen lajin otokselle (oletus 40 tasavälein, deterministinen) tai
 * kaikille. Jos url ei vastaa 200, kokeillaan varat järjestyksessä —
 * samoin kuin peli tekee. Tulos: <vienti>/media-tarkistus.json.
 *
 * Tämä on erillään viennistä, koska verkko ei ole deterministinen: vienti
 * pysyy tavulleen toistettavana, ja tarkistus kertoo ämpärin tilan
 * ajohetkellä. Linkit, tiedostonimet ilman sääntöä ja ulkoiset kuva-URLit
 * (hahmotelmien viitekuvat) ohitetaan: ne eivät ole pelin omaa mediaa.
 *
 * Löydös 23.9.2026: `aani-oma`-viitteiden 404:t ovat rivien `oma`-kenttiä
 * (repon varapolku); saman rivin `ampari`-kenttä on oikea osoite — ks.
 * docs/raportit/sisallon-siirtoputki-20260923.md.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { JUURI } from './vie-sisalto.mjs';

const arg = (nimi) => { const i = process.argv.indexOf(nimi); return i > 0 ? process.argv[i + 1] : null; };
const vienti = resolve(arg('--vienti') ?? join(JUURI, 'dist/vienti'));
const kaikki = process.argv.includes('--kaikki');
const otos = Number(arg('--otos') ?? 40);
const OHITA = new Set(['linkki', 'tiedosto', 'kuva-url', 'aani-url', 'video-url']);

const { viitteet } = JSON.parse(readFileSync(join(vienti, 'media.json'), 'utf8'));
const lajeittain = new Map();
for (const v of viitteet) {
  if (OHITA.has(v.laji) || !v.url) continue;
  if (!lajeittain.has(v.laji)) lajeittain.set(v.laji, []);
  lajeittain.get(v.laji).push(v);
}

/*
 * Commons vastaa 429 nopeaan rinnakkaiseen sarjaan, ja 429 näkyi ennen
 * puuttuvana kuvana (luovutuksen velka 1, 23.9.2026). Siksi Commons-
 * pyynnöt kulkevat jonossa ≥ 1,1 s välein User-Agentin kanssa, ja 429
 * yritetään uudelleen kasvavalla odotuksella. Ämpäri ei kuristu, joten
 * sen pyynnöt pysyvät rinnakkaisina.
 */
const UA = { 'User-Agent': 'Matkakirja-tarkistus/1.0 (https://github.com/ravelius/Matkakirja)' };
const nuku = (ms) => new Promise((r) => { setTimeout(r, ms); });
let commonsJono = Promise.resolve();

async function vastaa(url) {
  const commons = /^https:\/\/commons\.wikimedia\.org\//.test(url);
  const hae = async () => {
    for (let y = 0; y < 4; y += 1) {
      try {
        const r = await fetch(url, { method: 'HEAD', headers: UA });
        if (r.status !== 429) return r.status;
      } catch {
        return 'virhe';
      }
      await nuku(2000 * 2 ** y);
    }
    return 429;
  };
  if (!commons) return hae();
  const vuoro = commonsJono.then(async () => { const s = await hae(); await nuku(1100); return s; });
  commonsJono = vuoro.catch(() => {});
  return vuoro;
}

async function rinnakkain(lista, n, f) {
  const ulos = new Array(lista.length);
  let i = 0;
  await Promise.all(Array.from({ length: n }, async () => {
    while (i < lista.length) { const j = i++; ulos[j] = await f(lista[j]); }
  }));
  return ulos;
}

const tulos = { tila: kaikki ? 'kaikki' : `otos ${otos}/laji`, lajit: {}, puuttuvat: [] };
for (const [laji, lista] of [...lajeittain].sort()) {
  const n = kaikki ? lista.length : Math.min(otos, lista.length);
  const valitut = kaikki ? lista : Array.from({ length: n }, (_, k) => lista[Math.floor((k * lista.length) / n)]);
  const tilat = await rinnakkain(valitut, 12, async (v) => {
    for (const url of [v.url, ...(v.varat ?? [])]) {
      if ((await vastaa(url)) === 200) return url === v.url ? 'ok' : 'vara';
    }
    return 'puuttuu';
  });
  const laske = (t) => tilat.filter((x) => x === t).length;
  tulos.lajit[laji] = { tarkistettu: n, ok: laske('ok'), varalla: laske('vara'), puuttuu: laske('puuttuu') };
  valitut.forEach((v, k) => {
    if (tilat[k] !== 'ok') tulos.puuttuvat.push({ laji, arvo: v.arvo, url: v.url, tila: tilat[k] });
  });
  console.log(`${laji.padEnd(18)} ${JSON.stringify(tulos.lajit[laji])}`);
}
writeFileSync(join(vienti, 'media-tarkistus.json'), JSON.stringify(tulos, null, 1) + '\n');
console.log(`→ ${join(vienti, 'media-tarkistus.json')}`);
