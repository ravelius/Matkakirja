#!/usr/bin/env node
// DELTAVIENTI: VAIN MUUTTUNEET LAATAT ÄMPÄRIIN (Karttaseppä 29.9.2026; asiakaspuoli
// js/deltasarja.js, raportti pyramidi-poltto/r2-siivous/R2-raportti-20260929.md).
//
// Poltto on tavulleen toistettava, joten muuttumattoman laatan tiedosto on sama.
// Perussarjasta (täysi sarja, joka on jo ämpärissä) lasketaan kerran tiivisteet;
// uudesta sarjasta viedään vain laatat, joiden tiiviste eroaa, ja luetteloon
// kirjoitetaan `delta: { perus, muuttuneet: { taso: base64 | null } }`.
// Ketjun syvyys on yksi: delta vertautuu aina perussarjaan, ei edelliseen deltaan.
//
//   node tools/vie-delta.mjs tiivisteet <ulos.json.gz> <juuri> [juuri …]
//   node tools/vie-delta.mjs vertaa --perus <tiivisteet.json.gz> --perus-nimi <kansio/versio>
//        --lavastus <tyhjä kansio> --ulos <delta.json> [--pallo | --luettelo <pyramidi.json>]
//        [--taso-z] [--kynnys 0.5] <juuri> [juuri …]
//
// Juuret ovat kansioita, joiden alla laatat ovat muodossa [z]<taso>/<sarake>/<rivi>.<webp|jpg>
// (pallo: pallo/ulos; pyramidi: pohja/z*, syva/syva-z*, pohja/ranta-*/ranta, pohja/viiva-*/viivat).
// --pallo: sarakkeita 2^taso; --luettelo: sarakkeita luettelon tasoilta. Lavastukseen tulevat
// kovalinkit muuttuneista laatoista samaan polkumuotoon (--taso-z: pyramidin "z<taso>"),
// ja se viedään `aws s3 sync lavastus s3://…/<uusi>/` (tyhjä kohde: yksi LIST).
// Taso, jossa muuttuneita on yli --kynnys-osuus, viedään kokonaan (kartta null).
import { createHash } from 'node:crypto';
import { gzipSync, gunzipSync } from 'node:zlib';
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, linkSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';

const LAATTA = /(?:^|\/)z?(\d+)\/(\d+)\/(\d+)\.(webp|jpg)$/;

/** Laatat juurien alta: avain "taso/sarake/rivi" → { polku, taso, sarake, rivi, paate }. */
export function keraaLaatat(juuret) {
  const laatat = new Map();
  const kaya = (kansio, suhteellinen) => {
    for (const nimi of readdirSync(kansio)) {
      const polku = join(kansio, nimi);
      const s = statSync(polku);
      const suht = suhteellinen ? `${suhteellinen}/${nimi}` : nimi;
      if (s.isDirectory()) { kaya(polku, suht); continue; }
      const m = LAATTA.exec(suht);
      if (!m) continue;
      const [taso, sarake, rivi] = [Number(m[1]), Number(m[2]), Number(m[3])];
      const avain = `${taso}/${sarake}/${rivi}`;
      if (laatat.has(avain)) throw new Error(`sama laatta kahdesti: ${avain} (${laatat.get(avain).polku}, ${polku})`);
      laatat.set(avain, { polku, taso, sarake, rivi, paate: m[4] });
    }
  };
  for (const j of juuret) kaya(j, '');
  return laatat;
}

export const tiiviste = (polku) => createHash('sha1').update(readFileSync(polku)).digest('hex').slice(0, 16);

export function tiivisteet(laatat) {
  const ulos = {};
  for (const [avain, l] of laatat) ulos[avain] = tiiviste(l.polku);
  return ulos;
}

/** Bittikartta (base64) annetuista indekseistä; sama koodaus kuin js/deltasarja.js. */
export function kartta(koko, indeksit) {
  const b = new Uint8Array(Math.ceil(koko / 8));
  for (const i of indeksit) b[i >> 3] |= 1 << (i & 7);
  return Buffer.from(b).toString('base64');
}

/**
 * Vertailu: muuttuneet laatat tasoittain. `sarakkeita(taso)` antaa ruudukon leveyden.
 * Palauttaa { delta, vietavat, tilasto }.
 */
export function vertaa(uudet, perusTiivisteet, perusNimi, sarakkeita, kynnys = 0.5) {
  const tasoittain = new Map();
  for (const [avain, l] of uudet) {
    if (!tasoittain.has(l.taso)) tasoittain.set(l.taso, []);
    tasoittain.get(l.taso).push([avain, l]);
  }
  const muuttuneet = {};
  const vietavat = [];
  const tilasto = {};
  for (const [taso, lista] of [...tasoittain].sort((a, b) => a[0] - b[0])) {
    const eri = lista.filter(([avain, l]) => perusTiivisteet[avain] !== tiiviste(l.polku));
    const osuus = eri.length / lista.length;
    tilasto[taso] = { laattoja: lista.length, muuttuneita: eri.length };
    if (osuus > kynnys) {
      muuttuneet[taso] = null;
      vietavat.push(...lista.map(([, l]) => l));
      tilasto[taso].koko = true;
    } else {
      // Kartta kattaa suurimman muuttuneen indeksin; puuttuvat tavut = muuttumaton (js/deltasarja.js).
      const s = sarakkeita(taso);
      const indeksit = eri.map(([, l]) => l.rivi * s + l.sarake);
      muuttuneet[taso] = kartta(indeksit.length ? Math.max(...indeksit) + 1 : 0, indeksit);
      vietavat.push(...eri.map(([, l]) => l));
    }
  }
  return { delta: { perus: perusNimi, muuttuneet }, vietavat, tilasto };
}

function lavasta(vietavat, lavastus, tasoZ) {
  for (const l of vietavat) {
    const kohde = join(lavastus, `${tasoZ ? 'z' : ''}${l.taso}`, String(l.sarake), `${l.rivi}.${l.paate}`);
    mkdirSync(dirname(kohde), { recursive: true });
    if (!existsSync(kohde)) linkSync(l.polku, kohde);
  }
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  const [komento, ...a] = process.argv.slice(2);
  const valinta = (n) => { const i = a.indexOf(`--${n}`); if (i < 0) return null; const v = a[i + 1]; a.splice(i, 2); return v; };
  const lippu = (n) => { const i = a.indexOf(`--${n}`); if (i < 0) return false; a.splice(i, 1); return true; };
  if (komento === 'tiivisteet') {
    const [ulos, ...juuret] = a;
    const t = tiivisteet(keraaLaatat(juuret));
    writeFileSync(ulos, gzipSync(JSON.stringify(t)));
    console.log(`${Object.keys(t).length} tiivistettä → ${ulos}`);
  } else if (komento === 'vertaa') {
    const perus = valinta('perus'); const perusNimi = valinta('perus-nimi'); const lavastus = valinta('lavastus');
    const ulos = valinta('ulos'); const luettelo = valinta('luettelo'); const kynnys = Number(valinta('kynnys') ?? 0.5);
    const pallo = lippu('pallo'); const tasoZ = lippu('taso-z');
    if (!perus || !perusNimi || !lavastus || !ulos || (!pallo && !luettelo) || !a.length) {
      console.error('Käyttö: vertaa --perus <t.json.gz> --perus-nimi <n> --lavastus <k> --ulos <d.json> (--pallo | --luettelo <p.json>) [--taso-z] <juuri>…');
      process.exit(1);
    }
    const sarakkeet = pallo ? (t) => 2 ** t : (() => {
      const L = JSON.parse(readFileSync(luettelo, 'utf8'));
      const m = new Map(L.tasot.map((t) => [t.z, t.sarakkeita]));
      return (t) => { const s = m.get(t); if (!s) throw new Error(`taso ${t} puuttuu luettelosta`); return s; };
    })();
    const perusT = JSON.parse(gunzipSync(readFileSync(perus)));
    const { delta, vietavat, tilasto } = vertaa(keraaLaatat(a), perusT, perusNimi, sarakkeet, kynnys);
    if (existsSync(lavastus) && readdirSync(lavastus).length) throw new Error(`lavastus ei ole tyhjä: ${lavastus}`);
    lavasta(vietavat, lavastus, tasoZ);
    writeFileSync(ulos, JSON.stringify(delta));
    let kaikki = 0;
    for (const [t, s] of Object.entries(tilasto)) {
      kaikki += s.laattoja;
      console.log(`  z${t}: ${s.muuttuneita}/${s.laattoja} muuttunut${s.koko ? ' → koko taso' : ''}`);
    }
    console.log(`vietäviä ${vietavat.length}/${kaikki} (${(100 * vietavat.length / kaikki).toFixed(1)} %) → ${lavastus}; delta → ${ulos}`);
  } else {
    console.error('Komento: tiivisteet | vertaa');
    process.exit(1);
  }
}
