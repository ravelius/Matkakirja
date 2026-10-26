#!/usr/bin/env node
/*
 * SANA-AJAT ÄÄNILLE (LS1 7.10.2026: Pariisin yksityiskohtakuva lentää sivuun ankkurisanan kohdalla). Tallennetusta
 * ElevenLabs-kohdistuksesta (with-timestamps: tee-esittelyaanet.mjs master/<sha>.kohdistus.json ja
 * tee-aanet-kohdistuksella.mjs <id>.kohdistus.json) tehdään { versio, teksti, sanat: [[merkki_indeksi, alku_s, loppu_s], …] },
 * jossa merkki_indeksi viittaa NÄYTÖN tekstiin (ankkurit ovat näyttötekstistä) ja ajat puhuttuun tekstiin
 * (vuosiluvut sanoina, tools/pollo/puhesanat.js). Ei uutta generointia: vain jo tallennetut kohdistukset.
 *
 * Käyttö: node tools/opas/tee-aaniajat.mjs --ulos <kansio> [--r2] --esittely <esittely.json> […] --kohdistus <tiedosto|kansio> […]
 *   Kohdeäänet → <ulos>/opas/<sha>.ajat.json (--r2: myös R2 matkakirja-puhe opas/<sha>.ajat.json; worker GET …/<sha>.ajat.json).
 *   Avaukset (<kaupunki>-avaus.kohdistus.json) → <ulos>/opas/esittely-v1/aanet/<kaupunki>-avaus.ajat.json (vientipaketti).
 * Avaimet ympäristöstä: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID (vain --r2).
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';
import { vuosiluvutSanoiksi } from '../pollo/puhesanat.js';
import { aaniTunniste } from './tee-esittelyaanet.mjs';

/** Näyttötekstin sanat { sana, i } (i = merkki-indeksi tekstissä). */
export function naytonSanat(teksti) {
  const ulos = [];
  for (const m of String(teksti).matchAll(/\S+/g)) ulos.push({ sana: m[0], i: m.index });
  return ulos;
}

const vertaa = (a, b) => a.toLowerCase().replace(/[^\p{L}\d]/gu, '') === b.toLowerCase().replace(/[^\p{L}\d]/gu, '');

/**
 * Kohdistaa näytön sanat puhuttuihin: samat sanat suoraan, eroavat (vuosiluvut numeroina ↔ sanoina) seuraavaan yhteiseen
 * sanaan asti, jolloin näytön sana saa ryhmän ensimmäisen puhutun sanan alun ja viimeisen lopun.
 */
export function kohdistaNaytolle(teksti, puhutut) {
  const nayto = naytonSanat(teksti);
  const ulos = [];
  let j = 0;
  for (let i = 0; i < nayto.length && j < puhutut.length;) {
    if (vertaa(nayto[i].sana, puhutut[j].sana)) { ulos.push([nayto[i].i, puhutut[j].alku_s, puhutut[j].loppu_s]); i += 1; j += 1; continue; }
    // Seuraava yhteinen sana (ikkuna 8 + 8): väli kuuluu muunnettuihin sanoihin.
    let loyto = null;
    for (let a = i + 1; a <= Math.min(nayto.length, i + 8) && !loyto; a += 1) {
      for (let b = j + 1; b <= Math.min(puhutut.length, j + 8); b += 1) {
        if (a === nayto.length && b === puhutut.length) { loyto = [a, b]; break; }
        if (a < nayto.length && b < puhutut.length && vertaa(nayto[a].sana, puhutut[b].sana)) { loyto = [a, b]; break; }
      }
    }
    const [a, b] = loyto ?? [i + 1, j + 1];
    for (let x = i; x < a; x += 1) ulos.push([nayto[x].i, puhutut[j].alku_s, puhutut[b - 1].loppu_s]);
    i = a; j = b;
  }
  return ulos;
}

const tiedostot = (polku) => (statSync(polku).isDirectory()
  ? readdirSync(polku).filter((f) => f.endsWith('.kohdistus.json')).map((f) => join(polku, f)) : [polku]);

async function r2Kirjoita(avain, data) {
  const { CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID } = process.env;
  const v = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/r2/buckets/matkakirja-puhe/objects/${avain}`,
    { method: 'PUT', headers: { authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`, 'content-type': 'application/json' }, body: data });
  if (!v.ok) throw new Error(`R2 ${avain}: ${v.status}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const a = process.argv.slice(2);
  const arvot = (n) => a.flatMap((x, i) => (a[i - 1] === `--${n}` ? [x] : []));
  const ulos = arvot('ulos')[0], r2 = a.includes('--r2');
  // Näyttötekstit puhetekstin tiivisteellä (sama kuin äänen sha) ja avaukset kaupungin id:llä.
  const naytto = new Map(), avaukset = new Map();
  for (const f of arvot('esittely')) {
    const e = JSON.parse(readFileSync(f, 'utf8'));
    for (const k of e.kohteet) {
      for (const [t, p] of [[k.teksti, k.puhe_teksti], [k.lyhyt, k.puhe_lyhyt]]) if (t) naytto.set(aaniTunniste(vuosiluvutSanoiksi(p || t)), t);
    }
    if (e.avaus?.teksti) avaukset.set(e.id, e.avaus.teksti);
  }
  let kohteet = 0, avauksia = 0, ohi = 0;
  for (const f of arvot('kohdistus').flatMap(tiedostot)) {
    const k = JSON.parse(readFileSync(f, 'utf8'));
    const puhe = k.puhe, sha = k.sha ?? (/^[0-9a-f]{32}$/.test(basename(f, '.kohdistus.json')) ? basename(f, '.kohdistus.json') : aaniTunniste(puhe));
    const avausId = /^(.+)-avaus$/.exec(k.id ?? '')?.[1];
    const teksti = avausId ? (avaukset.get(avausId) ?? k.teksti) : (naytto.get(sha) ?? k.teksti);
    if (!teksti || !Array.isArray(k.sanat)) { ohi += 1; console.log(`ohi: ${f} (ei näyttötekstiä)`); continue; }
    if (vuosiluvutSanoiksi(teksti) !== puhe) console.log(`huom: ${basename(f)} puhe ≠ vuosiluvutSanoiksi(näyttö)`);
    const data = JSON.stringify({ versio: 1, teksti, sanat: kohdistaNaytolle(teksti, k.sanat) });
    if (avausId) {
      const p = join(ulos, 'opas/esittely-v1/aanet', `${avausId}-avaus.ajat.json`);
      mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, data); avauksia += 1;
    } else {
      const p = join(ulos, 'opas', `${sha}.ajat.json`);
      mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, data); kohteet += 1;
      if (r2) await r2Kirjoita(`opas/${sha}.ajat.json`, data);
    }
  }
  console.log(`kohdeääniä ${kohteet}${r2 ? ' (R2)' : ''}, avauksia ${avauksia}, ohitettu ${ohi}`);
}
