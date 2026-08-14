#!/usr/bin/env node
/*
 * Viisaan Pöllön julkaisun apuri (vain CI:tä varten).
 *
 * Tämä työkalu EI kuulu workeriin eikä peliin: worker.js ei tuo tätä,
 * joten wrangler ei niputa tätä julkaistavaan koodiin. Tarkoitus on
 * pitää `tools/pollo/wrangler.jsonc` sellaisena kuin omistaja sen
 * komentoriviltä näkee (kommentteineen, KV-rivi kommentoituna) ja
 * tehdä ajonaikainen, täytetty asetus vasta GitHubin ajurilla.
 *
 * Kaksi komentoa:
 *
 *   node tools/pollo/ci-asetus.mjs kv-tunnus <tiedosto|-> [--nimi POLLO_KV]
 *       Lukee `wrangler kv namespace list` -tulosteen ja tulostaa
 *       halutun säilön tunnuksen (tai ei mitään, jos säilöä ei ole).
 *
 *   node tools/pollo/ci-asetus.mjs asetus --lahde <jsonc> --ulos <json>
 *                                  [--kv <tunnus>] [--originit <arvo>]
 *       Riisuu kommentit, lisää kv_namespaces-sidoksen ja kirjoittaa
 *       POLLO_ORIGINIT-arvon. Tuloksena tavallinen JSON, jonka voi
 *       antaa wranglerille lipulla --config.
 *
 * Salaisuuksia tämä ei käsittele: API-avain menee suoraan
 * `wrangler secret put` -komennolle putkessa eikä koskaan tiedostoon.
 */

import { readFileSync, writeFileSync } from 'node:fs';

/** Sidoksen (binding) nimi, jota worker.js odottaa. */
const KV_SIDOS = 'POLLO_KV';

/**
 * JSONC → JSON.
 *
 * Ei regexiä: käydään merkki kerrallaan läpi ja pidetään kirjaa siitä,
 * ollaanko merkkijonon sisällä. Muuten kommentin näköinen pätkä
 * merkkijonon sisällä (esim. "https://…") katoaisi tekstistä.
 * Samalla poistetaan JSONC:n sallimat perässä roikkuvat pilkut.
 */
export function riisuKommentit(teksti) {
  let ulos = '';
  let i = 0;
  let merkkijonossa = false;
  while (i < teksti.length) {
    const merkki = teksti[i];
    const seuraava = teksti[i + 1];
    if (merkkijonossa) {
      ulos += merkki;
      if (merkki === '\\') {
        // Suojattu merkki kulkee sellaisenaan mukana.
        ulos += teksti[i + 1] ?? '';
        i += 2;
        continue;
      }
      if (merkki === '"') merkkijonossa = false;
      i += 1;
      continue;
    }
    if (merkki === '"') {
      merkkijonossa = true;
      ulos += merkki;
      i += 1;
      continue;
    }
    if (merkki === '/' && seuraava === '/') {
      while (i < teksti.length && teksti[i] !== '\n') i += 1;
      continue;
    }
    if (merkki === '/' && seuraava === '*') {
      i += 2;
      while (i < teksti.length && !(teksti[i] === '*' && teksti[i + 1] === '/')) i += 1;
      i += 2;
      continue;
    }
    ulos += merkki;
    i += 1;
  }
  return poistaRoikkuvatPilkut(ulos);
}

/**
 * Poistaa pilkun, jota seuraa sulkeva } tai ] (JSONC sallii, JSON ei).
 * Sama merkkijonojen huomiointi kuin yllä.
 */
function poistaRoikkuvatPilkut(teksti) {
  let ulos = '';
  let merkkijonossa = false;
  for (let i = 0; i < teksti.length; i += 1) {
    const merkki = teksti[i];
    if (merkkijonossa) {
      ulos += merkki;
      if (merkki === '\\') {
        ulos += teksti[i + 1] ?? '';
        i += 1;
        continue;
      }
      if (merkki === '"') merkkijonossa = false;
      continue;
    }
    if (merkki === '"') {
      merkkijonossa = true;
      ulos += merkki;
      continue;
    }
    if (merkki === ',') {
      // Katsotaan eteenpäin: pelkkää tyhjää ja sitten sulkeva merkki?
      let j = i + 1;
      while (j < teksti.length && /\s/.test(teksti[j])) j += 1;
      if (teksti[j] === '}' || teksti[j] === ']') continue;
    }
    ulos += merkki;
  }
  return ulos;
}

/** JSONC-tiedosto olioksi. */
export function lueJsonc(teksti) {
  return JSON.parse(riisuKommentit(teksti));
}

/**
 * Poimii KV-säilön tunnuksen `wrangler kv namespace list` -tulosteesta.
 *
 * Wrangler tulostaa JSON-taulukon, mutta saattaa lisätä eteen tai
 * perään omia rivejään (versiobanneri, varoitukset). Siksi etsitään
 * tulosteesta ensimmäinen taulukko eikä luoteta koko tekstiin.
 *
 * Säilön nimi on wranglerin luomana yleensä muotoa
 * `<workerin-nimi>-POLLO_KV`, joten täsmäys tehdään sisältymisellä.
 */
export function poimiKvTunnus(tuloste, nimi = KV_SIDOS) {
  const alku = tuloste.indexOf('[');
  const loppu = tuloste.lastIndexOf(']');
  if (alku < 0 || loppu < alku) return null;
  let lista;
  try {
    lista = JSON.parse(tuloste.slice(alku, loppu + 1));
  } catch {
    return null;
  }
  if (!Array.isArray(lista)) return null;
  const osumat = lista.filter((s) => s && typeof s.id === 'string'
    && String(s.title ?? '').includes(nimi));
  // Tarkka nimi voittaa, muuten ensimmäinen osuma.
  const tarkka = osumat.find((s) => s.title === nimi);
  return (tarkka ?? osumat[0])?.id ?? null;
}

/** R2-sidoksen nimi, jota worker.js odottaa (lukijaäänen pysyvä säilö). */
const R2_SIDOS = 'PUHE_R2';

/** Täydentää asetusolion: KV-sidos, R2-ämpäri ja sallitut originit. */
export function taydennaAsetus(asetus, { kv = null, originit = null, r2 = null } = {}) {
  const tulos = { ...asetus };
  if (kv) {
    tulos.kv_namespaces = [{ binding: KV_SIDOS, id: kv }];
  }
  if (r2) {
    tulos.r2_buckets = [{ binding: R2_SIDOS, bucket_name: r2 }];
  }
  if (originit !== null && originit !== undefined) {
    tulos.vars = { ...(tulos.vars ?? {}), POLLO_ORIGINIT: String(originit) };
  }
  return tulos;
}

/** Kevyt argumenttien luku: --avain arvo. */
function lueArgumentit(argv) {
  const arvot = {};
  for (let i = 0; i < argv.length; i += 1) {
    if (!argv[i].startsWith('--')) continue;
    arvot[argv[i].slice(2)] = argv[i + 1] ?? '';
    i += 1;
  }
  return arvot;
}

function lueSyote(polku) {
  return readFileSync(polku === '-' ? 0 : polku, 'utf8');
}

function main() {
  const [komento, ...loput] = process.argv.slice(2);
  const arg = lueArgumentit(loput);

  if (komento === 'kv-tunnus') {
    const polku = loput.find((o) => !o.startsWith('--')) ?? '-';
    const tunnus = poimiKvTunnus(lueSyote(polku), arg.nimi || KV_SIDOS);
    if (tunnus) process.stdout.write(`${tunnus}\n`);
    return;
  }

  if (komento === 'asetus') {
    if (!arg.lahde || !arg.ulos) {
      process.stderr.write('Käyttö: asetus --lahde <jsonc> --ulos <json> '
        + '[--kv <tunnus>] [--originit <arvo>]\n');
      process.exitCode = 2;
      return;
    }
    const asetus = lueJsonc(readFileSync(arg.lahde, 'utf8'));
    const taydennetty = taydennaAsetus(asetus, {
      kv: arg.kv || null,
      r2: arg.r2 || null,
      originit: arg.originit ?? null,
    });
    writeFileSync(arg.ulos, `${JSON.stringify(taydennetty, null, 2)}\n`, 'utf8');
    // Tuloste on tarkistusta varten: pelkkä yhteenveto, ei salaisuuksia.
    process.stdout.write(`Asetus kirjoitettu: ${arg.ulos}\n`);
    process.stdout.write(`  POLLO_ORIGINIT = ${taydennetty.vars?.POLLO_ORIGINIT ?? '(ei asetettu)'}\n`);
    process.stdout.write(`  kv_namespaces  = ${taydennetty.kv_namespaces ? 'on' : 'ei'}\n`);
    process.stdout.write(`  r2_buckets     = ${taydennetty.r2_buckets ? 'on' : 'ei'}\n`);
    return;
  }

  process.stderr.write('Tuntematon komento. Komennot: kv-tunnus, asetus\n');
  process.exitCode = 2;
}

// Ajetaan vain suoraan käynnistettäessä, jotta testit voivat tuoda
// funktiot ilman sivuvaikutuksia.
if (process.argv[1] && process.argv[1].endsWith('ci-asetus.mjs')) main();
